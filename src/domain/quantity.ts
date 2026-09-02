export type DimensionKey = 'M' | 'L' | 'T' | 'I' | 'Theta'
export type Dimension = Readonly<Record<DimensionKey, number>>

export interface PhysicsQuantity {
  value: number
  unit: string
  dimension: Dimension
  uncertainty?: number
  sourceId?: string
  timestamp?: number
  referenceFrame?: 'world' | 'vehicle' | 'wheel' | 'component'
  coordinateSystem?: string
}

const d = (M = 0, L = 0, T = 0, I = 0, Theta = 0): Dimension => ({ M, L, T, I, Theta })

export const dimensions = {
  dimensionless: d(), length: d(0, 1), time: d(0, 0, 1), mass: d(1),
  velocity: d(0, 1, -1), acceleration: d(0, 1, -2), force: d(1, 1, -2),
  energy: d(1, 2, -2), power: d(1, 2, -3), pressure: d(1, -1, -2),
  angularVelocity: d(0, 0, -1), electricCurrent: d(0, 0, 0, 1), temperature: d(0, 0, 0, 0, 1),
} satisfies Record<string, Dimension>

export const units: Record<string, { scale: number; dimension: Dimension }> = {
  '1': { scale: 1, dimension: dimensions.dimensionless },
  m: { scale: 1, dimension: dimensions.length }, km: { scale: 1000, dimension: dimensions.length },
  s: { scale: 1, dimension: dimensions.time }, h: { scale: 3600, dimension: dimensions.time },
  kg: { scale: 1, dimension: dimensions.mass },
  'm/s': { scale: 1, dimension: dimensions.velocity }, 'km/h': { scale: 1 / 3.6, dimension: dimensions.velocity },
  'm/s²': { scale: 1, dimension: dimensions.acceleration },
  N: { scale: 1, dimension: dimensions.force }, J: { scale: 1, dimension: dimensions.energy },
  W: { scale: 1, dimension: dimensions.power }, Pa: { scale: 1, dimension: dimensions.pressure },
  'rad/s': { scale: 1, dimension: dimensions.angularVelocity }, rpm: { scale: Math.PI / 30, dimension: dimensions.angularVelocity },
}

export function sameDimension(a: Dimension, b: Dimension) {
  return (Object.keys(a) as DimensionKey[]).every((key) => a[key] === b[key])
}

export function quantity(value: number, unit: string, extra: Omit<PhysicsQuantity, 'value' | 'unit' | 'dimension'> = {}): PhysicsQuantity {
  const definition = units[unit]
  if (!definition) throw new Error(`Unknown unit: ${unit}`)
  return { value, unit, dimension: definition.dimension, ...extra }
}

export function convert(input: PhysicsQuantity, targetUnit: string): PhysicsQuantity {
  const from = units[input.unit]
  const to = units[targetUnit]
  if (!from || !to || !sameDimension(from.dimension, to.dimension)) throw new Error(`Cannot convert ${input.unit} to ${targetUnit}`)
  const scale = from.scale / to.scale
  return { ...input, value: input.value * scale, uncertainty: input.uncertainty === undefined ? undefined : input.uncertainty * scale, unit: targetUnit, dimension: to.dimension }
}

export function formatDimension(input: Dimension) {
  return (Object.entries(input) as [DimensionKey, number][]).filter(([, power]) => power !== 0).map(([key, power]) => `${key}${power === 1 ? '' : `^${power}`}`).join(' ') || '1'
}

export function validateDimensions(left: Dimension, right: Dimension) {
  return { valid: sameDimension(left, right), left: formatDimension(left), right: formatDimension(right) }
}
