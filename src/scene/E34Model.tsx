import { RoundedBox, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { targetVehicle } from '../data/vehicle'
import { useLearnerStore } from '../store/learnerStore'
import { canAccessTarget, canUseInstrument } from '../domain/progressionEngine'

interface E34ModelProps {
  wheelAngle: number
  sceneMode: 'static' | 'experiment' | 'drive'
  simulationPosition: number
}

const wheelbase = targetVehicle.dimensions.wheelbase.value
const wheelRadius = targetVehicle.runningGear.unloadedWheelRadius.value

function Wheel({ id, x, z, angle, exploded, unlocked }: { id: string; x: number; z: number; angle: number; exploded: boolean; unlocked: boolean }) {
  const selected = useLearnerStore((state) => state.selectedComponentId === id)
  const selectComponent = useLearnerStore((state) => state.selectComponent)
  const outward = Math.sign(z)
  const explodeOffset = exploded && unlocked ? outward * 0.55 : 0

  return (
    <group
      position={[x, wheelRadius, z + explodeOffset]}
      rotation={[0, 0, angle]}
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
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[wheelRadius, wheelRadius, 0.22, 40]} />
        <meshStandardMaterial color={selected ? '#d8b26e' : '#131513'} roughness={0.72} metalness={0.08} emissive={selected ? '#5a3b12' : '#000000'} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.205, 0.205, 0.235, 32]} />
        <meshStandardMaterial color="#c2c3be" roughness={0.24} metalness={0.86} />
      </mesh>
      {Array.from({ length: 10 }, (_, index) => {
        const spokeAngle = (index / 10) * Math.PI * 2
        return (
          <mesh key={index} position={[Math.cos(spokeAngle) * 0.105, Math.sin(spokeAngle) * 0.105, outward * 0.123]} rotation={[0, 0, spokeAngle]}>
            <boxGeometry args={[0.16, 0.025, 0.018]} />
            <meshStandardMaterial color="#797d79" metalness={0.8} roughness={0.28} />
          </mesh>
        )
      })}
      <mesh position={[0, 0, outward * 0.135]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 0.018, 24]} />
        <meshStandardMaterial color="#243f57" metalness={0.72} roughness={0.24} />
      </mesh>
      {selected && <pointLight color="#e8bb6b" intensity={3} distance={1.3} />}
    </group>
  )
}

function Headlamp({ z }: { z: number }) {
  return (
    <group position={[2.374, 0.83, z]} rotation={[0, 0, -Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.115, 0.115, 0.045, 32]} />
        <meshPhysicalMaterial color="#f2ebd5" emissive="#d8cfaf" emissiveIntensity={0.5} roughness={0.12} metalness={0.1} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.027, 0]}>
        <torusGeometry args={[0.112, 0.012, 12, 32]} />
        <meshStandardMaterial color="#3c403e" metalness={0.72} roughness={0.25} />
      </mesh>
    </group>
  )
}

export function E34Model({ wheelAngle, sceneMode, simulationPosition }: E34ModelProps) {
  const mastery = useLearnerStore((state) => state.mastery)
  const exploded = useLearnerStore((state) => state.exploded)
  const selectComponent = useLearnerStore((state) => state.selectComponent)
  const wheelsUnlocked = canAccessTarget('basic-wheel-inspection', mastery)
  const deepWheelAccess = canUseInstrument('wheel-telemetry', mastery)
  const sideProfile = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.08, 0)
    shape.lineTo(1.04, 0)
    shape.lineTo(0.66, 0.68)
    shape.lineTo(-0.58, 0.72)
    shape.closePath()
    return shape
  }, [])
  const experimentOffset = sceneMode === 'experiment' ? Math.max(-3.4, Math.min(3.4, simulationPosition * 0.105 - 1.9)) : 0

  return (
    <group position={[experimentOffset, 0, 0]} onClick={() => selectComponent('vehicle-shell')}>
      <RoundedBox args={[4.62, 0.48, 1.7]} radius={0.12} smoothness={5} position={[0, 0.62, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#6e1018" roughness={0.25} metalness={0.62} clearcoat={0.82} clearcoatRoughness={0.16} />
      </RoundedBox>
      <RoundedBox args={[1.53, 0.16, 1.65]} radius={0.06} smoothness={4} position={[1.42, 0.94, 0]} castShadow>
        <meshPhysicalMaterial color="#75121b" roughness={0.23} metalness={0.6} clearcoat={0.85} />
      </RoundedBox>
      <RoundedBox args={[1.06, 0.18, 1.64]} radius={0.05} smoothness={4} position={[-1.75, 0.91, 0]} castShadow>
        <meshPhysicalMaterial color="#731019" roughness={0.26} metalness={0.6} clearcoat={0.8} />
      </RoundedBox>
      <mesh position={[-0.08, 0.99, -0.74]} castShadow>
        <extrudeGeometry args={[sideProfile, { depth: 1.48, steps: 1, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 3 }]} />
        <meshPhysicalMaterial color="#25343a" roughness={0.12} metalness={0.16} transmission={0.18} transparent opacity={0.9} clearcoat={1} />
      </mesh>
      <RoundedBox args={[1.36, 0.09, 1.5]} radius={0.06} smoothness={3} position={[-0.14, 1.71, 0]} castShadow>
        <meshPhysicalMaterial color="#711019" roughness={0.24} metalness={0.62} clearcoat={0.8} />
      </RoundedBox>

      {[-1, 1].flatMap((side) => [
        <mesh key={`a-${side}`} position={[0.82, 1.32, side * 0.755]} rotation={[0, 0, -0.48]}>
          <boxGeometry args={[0.075, 0.67, 0.05]} />
          <meshStandardMaterial color="#181c1d" roughness={0.28} metalness={0.55} />
        </mesh>,
        <mesh key={`b-${side}`} position={[-0.18, 1.34, side * 0.755]}>
          <boxGeometry args={[0.085, 0.63, 0.05]} />
          <meshStandardMaterial color="#171b1c" roughness={0.28} metalness={0.55} />
        </mesh>,
        <mesh key={`c-${side}`} position={[-0.88, 1.33, side * 0.755]} rotation={[0, 0, 0.43]}>
          <boxGeometry args={[0.075, 0.62, 0.05]} />
          <meshStandardMaterial color="#181c1d" roughness={0.28} metalness={0.55} />
        </mesh>,
        <mesh key={`trim-${side}`} position={[0, 0.63, side * 0.866]}>
          <boxGeometry args={[4.34, 0.09, 0.055]} />
          <meshStandardMaterial color="#222421" roughness={0.58} metalness={0.2} />
        </mesh>,
      ])}

      <Line points={[[-0.08, 0.86, 0.871], [-0.08, 0.37, 0.871]]} color="#2b1717" lineWidth={1} />
      <Line points={[[0.97, 0.88, 0.871], [0.97, 0.39, 0.871]]} color="#2b1717" lineWidth={1} />
      <Line points={[[0.97, 0.88, -0.871], [0.97, 0.39, -0.871]]} color="#2b1717" lineWidth={1} />
      <Line points={[[ -0.08, 0.86, -0.871], [-0.08, 0.37, -0.871]]} color="#2b1717" lineWidth={1} />

      <mesh position={[2.31, 0.48, 0]}>
        <boxGeometry args={[0.18, 0.17, 1.74]} />
        <meshStandardMaterial color="#20231f" roughness={0.56} metalness={0.2} />
      </mesh>
      <mesh position={[-2.31, 0.5, 0]}>
        <boxGeometry args={[0.18, 0.17, 1.72]} />
        <meshStandardMaterial color="#20231f" roughness={0.56} metalness={0.2} />
      </mesh>
      {[-0.16, 0.16].map((z) => (
        <RoundedBox key={z} args={[0.055, 0.3, 0.25]} radius={0.04} smoothness={3} position={[2.405, 0.72, z]}>
          <meshStandardMaterial color="#111613" metalness={0.6} roughness={0.25} />
        </RoundedBox>
      ))}
      {[-0.42, -0.68, 0.42, 0.68].map((z) => <Headlamp key={z} z={z} />)}
      {[-0.54, 0.54].map((z) => (
        <RoundedBox key={z} args={[0.06, 0.29, 0.52]} radius={0.04} smoothness={3} position={[-2.405, 0.77, z]}>
          <meshPhysicalMaterial color="#a52318" emissive="#4e0803" emissiveIntensity={0.3} clearcoat={1} roughness={0.22} />
        </RoundedBox>
      ))}
      <mesh position={[-2.42, 0.7, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.55, 0.15]} />
        <meshStandardMaterial color="#151816" />
      </mesh>

      <Wheel id="wheel-fl" x={wheelbase / 2} z={0.89} angle={wheelAngle} exploded={exploded && deepWheelAccess} unlocked={wheelsUnlocked} />
      <Wheel id="wheel-fr" x={wheelbase / 2} z={-0.89} angle={wheelAngle} exploded={exploded && deepWheelAccess} unlocked={wheelsUnlocked} />
      <Wheel id="wheel-rl" x={-wheelbase / 2} z={0.89} angle={wheelAngle} exploded={exploded && deepWheelAccess} unlocked={wheelsUnlocked} />
      <Wheel id="wheel-rr" x={-wheelbase / 2} z={-0.89} angle={wheelAngle} exploded={exploded && deepWheelAccess} unlocked={wheelsUnlocked} />
    </group>
  )
}
