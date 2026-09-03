import fs from 'node:fs'
import path from 'node:path'

const [, , sourcePath, targetPath, outputPath = targetPath] = process.argv
if (!sourcePath || !targetPath) {
  throw new Error('Usage: node scripts/repair-e34-materials.mjs <original-sketchfab.glb> <adapted-body.glb> [output.glb]')
}

function readGlb(filePath) {
  const file = fs.readFileSync(filePath)
  if (file.toString('utf8', 0, 4) !== 'glTF' || file.readUInt32LE(4) !== 2) throw new Error(`${filePath} is not a GLB 2.0 file.`)
  const jsonLength = file.readUInt32LE(12)
  const json = JSON.parse(file.subarray(20, 20 + jsonLength).toString('utf8').trimEnd())
  const binHeader = 20 + jsonLength
  const binLength = file.readUInt32LE(binHeader)
  const bin = file.subarray(binHeader + 8, binHeader + 8 + binLength)
  return { json, bin }
}

function imageBytes(glb, imageIndex) {
  const image = glb.json.images?.[imageIndex]
  const view = image && glb.json.bufferViews?.[image.bufferView]
  if (!image || !view || view.buffer !== 0) throw new Error(`Embedded image ${imageIndex} is unavailable.`)
  const start = view.byteOffset ?? 0
  return glb.bin.subarray(start, start + view.byteLength)
}

function pad(buffer, byte = 0) {
  const remainder = buffer.length % 4
  return remainder ? Buffer.concat([buffer, Buffer.alloc(4 - remainder, byte)]) : buffer
}

const componentTypes = {
  5121: Uint8Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array,
}
const componentCounts = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }

function accessorValues(glb, accessorIndex) {
  const accessor = glb.json.accessors[accessorIndex]
  const view = glb.json.bufferViews[accessor.bufferView]
  const ArrayType = componentTypes[accessor.componentType]
  const packedStride = ArrayType && componentCounts[accessor.type]
    ? ArrayType.BYTES_PER_ELEMENT * componentCounts[accessor.type]
    : undefined
  if (!ArrayType || !componentCounts[accessor.type] || (view.byteStride && view.byteStride !== packedStride)) {
    throw new Error(`Accessor ${accessorIndex} uses an unsupported component type, shape, or stride.`)
  }
  const byteOffset = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0)
  return new ArrayType(
    glb.bin.buffer,
    glb.bin.byteOffset + byteOffset,
    accessor.count * componentCounts[accessor.type],
  )
}

function writeGlb(filePath, json, bin) {
  const jsonBytes = pad(Buffer.from(JSON.stringify(json)), 0x20)
  const binBytes = pad(bin)
  const file = Buffer.alloc(12 + 8 + jsonBytes.length + 8 + binBytes.length)
  file.write('glTF', 0)
  file.writeUInt32LE(2, 4)
  file.writeUInt32LE(file.length, 8)
  file.writeUInt32LE(jsonBytes.length, 12)
  file.writeUInt32LE(0x4e4f534a, 16)
  jsonBytes.copy(file, 20)
  const binHeader = 20 + jsonBytes.length
  file.writeUInt32LE(binBytes.length, binHeader)
  file.writeUInt32LE(0x004e4942, binHeader + 4)
  binBytes.copy(file, binHeader + 8)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, file)
}

const source = readGlb(sourcePath)
const target = readGlb(targetPath)
const roofMesh = target.json.meshes.find((mesh) => mesh.name === 'e34-body-17-Mesh')
const roofPrimitive = roofMesh?.primitives?.[0]
let roofCorrection
if (roofPrimitive) {
  const roofMaterialIndex = target.json.materials.findIndex((material) => ['roof-paint-correction', 'body-paint-correction'].includes(material.name))
  const sourcePrimitives = roofMesh.primitives.filter((primitive) => primitive === roofPrimitive || primitive.material === roofMaterialIndex)
  const indices = sourcePrimitives.flatMap((primitive) => Array.from(accessorValues(target, primitive.indices)))
  const positions = accessorValues(target, roofPrimitive.attributes.POSITION)
  const correctedTriangles = []
  for (let offset = 0; offset < indices.length; offset += 3) {
    const triangle = [indices[offset], indices[offset + 1], indices[offset + 2]]
    const average = (values, stride, component) => triangle.reduce((sum, index) => sum + values[index * stride + component], 0) / 3
    const x = average(positions, 3, 0)
    const y = average(positions, 3, 1)
    const z = average(positions, 3, 2)
    const centerRoof = y > 1.56 && x > 0.65 && x < 1.25 && Math.abs(z) < 0.32
    const misplacedRearLampArea = x > 1.6 && x < 2.4 && y > 1 && y < 1.4 && Math.abs(z) > 0.72
    if (centerRoof || misplacedRearLampArea) {
      correctedTriangles.push(offset / 3)
    }
  }
  if (correctedTriangles.length !== 81) {
    throw new Error(`Expected the 81-triangle roof and rear-pillar correction area; found ${correctedTriangles.length}.`)
  }
  roofCorrection = {
    indexAccessor: roofPrimitive.indices,
    componentType: target.json.accessors[roofPrimitive.indices].componentType,
    kept: Array.from(indices).filter((_, index) => !correctedTriangles.includes(Math.floor(index / 3))),
    patch: correctedTriangles.flatMap((triangle) => Array.from(indices.slice(triangle * 3, triangle * 3 + 3))),
  }
  roofMesh.primitives = [roofPrimitive]
}
if (target.json.skins?.length || target.json.animations?.length) {
  throw new Error('The adapted body unexpectedly contains skins or animations; accessor pruning needs to be extended before rebuilding it.')
}
const usedAccessorIndices = new Set()
for (const mesh of target.json.meshes ?? []) {
  for (const primitive of mesh.primitives ?? []) {
    if (Number.isInteger(primitive.indices)) usedAccessorIndices.add(primitive.indices)
    for (const accessorIndex of Object.values(primitive.attributes ?? {})) usedAccessorIndices.add(accessorIndex)
    for (const targetAttributes of primitive.targets ?? []) {
      for (const accessorIndex of Object.values(targetAttributes)) usedAccessorIndices.add(accessorIndex)
    }
  }
}
const retainedAccessorIndices = [...usedAccessorIndices].sort((a, b) => a - b)
const accessorRemap = new Map(retainedAccessorIndices.map((oldIndex, newIndex) => [oldIndex, newIndex]))
target.json.accessors = retainedAccessorIndices.map((index) => target.json.accessors[index])
for (const mesh of target.json.meshes ?? []) {
  for (const primitive of mesh.primitives ?? []) {
    if (Number.isInteger(primitive.indices)) primitive.indices = accessorRemap.get(primitive.indices)
    for (const [semantic, accessorIndex] of Object.entries(primitive.attributes ?? {})) {
      primitive.attributes[semantic] = accessorRemap.get(accessorIndex)
    }
    for (const targetAttributes of primitive.targets ?? []) {
      for (const [semantic, accessorIndex] of Object.entries(targetAttributes)) {
        targetAttributes[semantic] = accessorRemap.get(accessorIndex)
      }
    }
  }
}
if (roofCorrection) roofCorrection.indexAccessor = accessorRemap.get(roofCorrection.indexAccessor)
const geometryViewIndices = [...new Set((target.json.accessors ?? []).map((accessor) => accessor.bufferView).filter((index) => Number.isInteger(index)))].sort((a, b) => a - b)
const viewRemap = new Map()
let bin = Buffer.alloc(0)
const geometryViews = geometryViewIndices.map((oldIndex, newIndex) => {
  bin = pad(bin)
  const view = target.json.bufferViews[oldIndex]
  const start = view.byteOffset ?? 0
  const bytes = target.bin.subarray(start, start + view.byteLength)
  const compacted = { ...view, byteOffset: bin.length }
  viewRemap.set(oldIndex, newIndex)
  bin = Buffer.concat([bin, bytes])
  return compacted
})
for (const accessor of target.json.accessors ?? []) accessor.bufferView = viewRemap.get(accessor.bufferView)
target.json.bufferViews = geometryViews
const replacements = [
  { targetImage: 0, sourceImage: 2, name: 'source-body-interior' },
  { targetImage: 1, sourceImage: 3, name: 'source-body-white' },
]

for (const replacement of replacements) {
  bin = pad(bin)
  const bytes = imageBytes(source, replacement.sourceImage)
  const bufferView = target.json.bufferViews.length
  target.json.bufferViews.push({ buffer: 0, byteOffset: bin.length, byteLength: bytes.length, name: replacement.name })
  target.json.images[replacement.targetImage].bufferView = bufferView
  target.json.images[replacement.targetImage].name = replacement.name
  bin = Buffer.concat([bin, bytes])
}
if (roofCorrection) {
  const ArrayType = componentTypes[roofCorrection.componentType]
  const addIndexData = (values, name) => {
    bin = pad(bin)
    const array = new ArrayType(values)
    const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength)
    const bufferView = target.json.bufferViews.length
    target.json.bufferViews.push({ buffer: 0, byteOffset: bin.length, byteLength: bytes.length, target: 34963, name })
    bin = Buffer.concat([bin, bytes])
    return bufferView
  }
  const keptView = addIndexData(roofCorrection.kept, 'body-main-indices-with-roof-correction')
  const patchView = addIndexData(roofCorrection.patch, 'roof-paint-correction-indices')
  const mainAccessor = target.json.accessors[roofCorrection.indexAccessor]
  mainAccessor.bufferView = keptView
  mainAccessor.byteOffset = 0
  mainAccessor.count = roofCorrection.kept.length
  mainAccessor.min = [Math.min(...roofCorrection.kept)]
  mainAccessor.max = [Math.max(...roofCorrection.kept)]
  const patchAccessor = target.json.accessors.length
  target.json.accessors.push({
    ...mainAccessor,
    bufferView: patchView,
    count: roofCorrection.patch.length,
    min: [Math.min(...roofCorrection.patch)],
    max: [Math.max(...roofCorrection.patch)],
    name: 'roof-paint-correction-indices',
  })
  let roofMaterial = target.json.materials.findIndex((material) => ['roof-paint-correction', 'body-paint-correction'].includes(material.name))
  const roofMaterialDefinition = {
    name: 'body-paint-correction',
    pbrMetallicRoughness: {
      baseColorFactor: [0.82, 0.82, 0.79, 1],
      metallicFactor: 0.05,
      roughnessFactor: 0.72,
    },
  }
  if (roofMaterial === -1) {
    roofMaterial = target.json.materials.length
    target.json.materials.push(roofMaterialDefinition)
  } else {
    target.json.materials[roofMaterial] = roofMaterialDefinition
  }
  roofMesh.primitives.push({ ...roofPrimitive, indices: patchAccessor, material: roofMaterial })
}
target.json.buffers[0].byteLength = bin.length
target.json.materials[0].name = 'body-interior'
target.json.materials[1].name = 'body-white'
const assetExtras = { ...(target.json.asset.extras ?? {}) }
delete assetExtras.roofTriangleCorrection
target.json.asset.extras = {
  ...assetExtras,
  materialRepair: 'Applied the source body_2 interior and white exterior atlases, then isolated the roof section affected by the source UV defect.',
  ...(roofCorrection ? { bodyPaintCorrection: 'Separated the center-roof and rear-pillar faces affected by source UV defects and assigned matching solid white paint.' } : {}),
}

writeGlb(outputPath, target.json, bin)
process.stdout.write(`Rebuilt ${outputPath} with the assembled-car interior, white exterior, and corrected roof/rear lighting.\n`)
