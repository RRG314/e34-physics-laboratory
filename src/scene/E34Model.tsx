import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { canAccessTarget, canUseInstrument } from '../domain/progressionEngine'
import { useLearnerStore } from '../store/learnerStore'

interface E34ModelProps {
  wheelAngle: number
  sceneMode: 'static' | 'experiment' | 'drive'
  simulationPosition: number
}

const assetRoot = `${import.meta.env.BASE_URL}models/e34-525i`
const bodyModelUrl = `${assetRoot}/e34-body.glb`
const wheelModelUrl = `${assetRoot}/e34-wheel.glb`

// The source mesh wheel radius is 0.350493 m. Scaling from the documented tire
// assumption keeps the visual wheel radius aligned with the simulation model.
const modelScale = 0.32325 / 0.350493
const sourceWheelCenters = [
  { id: 'wheel-fl', x: -1.623293, z: -0.883437 },
  { id: 'wheel-fr', x: -1.623293, z: 0.883437 },
  { id: 'wheel-rl', x: 1.623293, z: -0.883437 },
  { id: 'wheel-rr', x: 1.623293, z: 0.883437 },
] as const
const sourceWheelCenterY = 0.350493

function prepareClone(source: THREE.Object3D) {
  const clone = source.clone(true)
  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.castShadow = true
    child.receiveShadow = true
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if ('map' in material && material.map instanceof THREE.Texture) {
        material.map.anisotropy = 8
      }
    }
  })
  return clone
}

function LicensedWheel({
  id,
  x,
  z,
  angle,
  exploded,
  unlocked,
}: {
  id: string
  x: number
  z: number
  angle: number
  exploded: boolean
  unlocked: boolean
}) {
  const { scene } = useGLTF(wheelModelUrl)
  const wheel = useMemo(() => prepareClone(scene), [scene])
  const selected = useLearnerStore((state) => state.selectedComponentId === id)
  const selectComponent = useLearnerStore((state) => state.selectComponent)
  const outward = Math.sign(z)
  const explodeOffset = exploded && unlocked ? outward * 0.58 : 0
  const mirrorForOppositeSide = outward > 0

  return (
    <group
      position={[x, sourceWheelCenterY, z + explodeOffset]}
      onClick={(event) => {
        event.stopPropagation()
        if (unlocked) selectComponent(id)
      }}
      onPointerOver={(event) => {
        if (!unlocked) return
        event.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <group rotation={[0, mirrorForOppositeSide ? Math.PI : 0, 0]}>
        <group rotation={[0, 0, mirrorForOppositeSide ? -angle : angle]}>
          <primitive object={wheel} />
        </group>
      </group>
      {selected && (
        <mesh position={[0, 0, outward * 0.14]}>
          <torusGeometry args={[0.41, 0.025, 14, 64]} />
          <meshBasicMaterial color="#d6a750" toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

export function E34Model({ wheelAngle, sceneMode, simulationPosition }: E34ModelProps) {
  const { scene } = useGLTF(bodyModelUrl)
  const body = useMemo(() => prepareClone(scene), [scene])
  const mastery = useLearnerStore((state) => state.mastery)
  const exploded = useLearnerStore((state) => state.exploded)
  const selectedComponentId = useLearnerStore((state) => state.selectedComponentId)
  const selectComponent = useLearnerStore((state) => state.selectComponent)
  const wheelsUnlocked = canAccessTarget('basic-wheel-inspection', mastery)
  const deepWheelAccess = canUseInstrument('wheel-telemetry', mastery)
  const experimentOffset = sceneMode === 'experiment'
    ? Math.max(-3.4, Math.min(3.4, simulationPosition * 0.105 - 1.9))
    : 0

  return (
    <group position={[experimentOffset, 0, 0]} scale={modelScale} dispose={null}>
      <group rotation={[0, Math.PI, 0]}>
        <group
          onClick={(event) => {
            event.stopPropagation()
            selectComponent('vehicle-shell')
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'default' }}
        >
          <primitive object={body} />
        </group>

        {selectedComponentId === 'vehicle-shell' && (
          <mesh position={[0.12, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.58, 2.67, 96]} />
            <meshBasicMaterial color="#d6a750" transparent opacity={0.72} toneMapped={false} />
          </mesh>
        )}

        {sourceWheelCenters.map((wheel) => (
          <LicensedWheel
            key={wheel.id}
            id={wheel.id}
            x={wheel.x}
            z={wheel.z}
            angle={wheelAngle}
            exploded={exploded && deepWheelAccess}
            unlocked={wheelsUnlocked}
          />
        ))}
      </group>
    </group>
  )
}

useGLTF.preload(bodyModelUrl)
useGLTF.preload(wheelModelUrl)
