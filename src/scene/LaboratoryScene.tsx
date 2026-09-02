import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Grid, Line, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { E34Model } from './E34Model'
import { useVehicleSimulation } from '../hooks/useVehicleSimulation'
import { vehicleSimulation } from '../simulation/vehicleSimulation'
import { useLabLearningStore } from '../store/labLearningStore'

function SimulationFrame({ sceneMode }: { sceneMode: 'static' | 'experiment' | 'drive' }) {
  const simulation = useVehicleSimulation()
  useFrame((_, delta) => vehicleSimulation.step(Math.min(delta, 0.05)))
  return <E34Model wheelAngle={simulation.wheelAngle} sceneMode={sceneMode} simulationPosition={simulation.position} />
}

function Track({ sceneMode, position }: { sceneMode: 'static' | 'experiment' | 'drive'; position: number }) {
  const offset = sceneMode === 'drive' ? -(position % 4) : 0
  return (
    <group position={[offset, 0.006, 0]}>
      {Array.from({ length: 18 }, (_, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[(index - 8) * 4, 0, 0]}>
          <planeGeometry args={[1.5, 0.035]} />
          <meshBasicMaterial color="#b18d51" />
        </mesh>
      ))}
    </group>
  )
}

function SceneContents({ sceneMode }: { sceneMode: 'static' | 'experiment' | 'drive' }) {
  const simulation = useVehicleSimulation()
  const overlay = useLabLearningStore((state) => state.overlay)
  const carOffset = sceneMode === 'experiment' ? Math.max(-3.4, Math.min(3.4, simulation.position * 0.105 - 1.9)) : 0
  const velocityLength = Math.max(-2.5, Math.min(2.5, simulation.velocity * 0.16))
  const accelerationLength = Math.max(-1.8, Math.min(1.8, simulation.acceleration * 0.34))
  return (
    <>
      <color attach="background" args={['#d7d8d1']} />
      <fog attach="fog" args={['#d7d8d1', 11, 28]} />
      <ambientLight intensity={1.25} color="#e8eee8" />
      <directionalLight position={[3.5, 7, 5]} intensity={3.2} color="#fff6e5" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={6} shadow-camera-bottom={-6} />
      <directionalLight position={[-4, 3, -5]} intensity={1.4} color="#c5d8df" />
      <Suspense fallback={null}>
        <SimulationFrame sceneMode={sceneMode} />
      </Suspense>
      <Grid position={[0, 0, 0]} args={[40, 40]} cellSize={0.5} cellThickness={0.35} cellColor="#9da19c" sectionSize={2} sectionThickness={0.8} sectionColor="#747a75" fadeDistance={22} fadeStrength={1.2} infiniteGrid />
      <Track sceneMode={sceneMode} position={simulation.position} />
      {overlay === 'vectors' && <group position={[carOffset, 0, 0]}>
        <Line points={[[0, 1.95, 0], [velocityLength, 1.95, 0]]} color="#2d6d8d" lineWidth={5} />
        <Line points={[[0, 2.13, 0], [accelerationLength, 2.13, 0]]} color="#a62834" lineWidth={5} />
        <mesh position={[velocityLength, 1.95, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.08, 0.2, 14]} /><meshBasicMaterial color="#2d6d8d" /></mesh>
        <mesh position={[accelerationLength, 2.13, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.08, 0.2, 14]} /><meshBasicMaterial color="#a62834" /></mesh>
      </group>}
      {overlay === 'energy' && <mesh position={[carOffset, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.2, 1.38, 64]} /><meshBasicMaterial color="#c59a48" transparent opacity={Math.min(0.75, 0.15 + Math.abs(simulation.velocity) / 25)} /></mesh>}
      <ContactShadows position={[0, 0.012, 0]} opacity={0.35} scale={11} blur={2.4} far={4} />
      <OrbitControls makeDefault target={[0, 0.78, 0]} minDistance={4.6} maxDistance={10} minPolarAngle={0.55} maxPolarAngle={1.48} enablePan={false} />
    </>
  )
}

export function LaboratoryScene({ sceneMode = 'static', className = '' }: { sceneMode?: 'static' | 'experiment' | 'drive'; className?: string }) {
  return (
    <div className={`scene-shell ${className}`} data-testid="laboratory-scene">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [5.8, 3.25, 5.6], fov: 37, near: 0.1, far: 100 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <SceneContents sceneMode={sceneMode} />
      </Canvas>
      <div className="scene-label"><span>LAB 01</span><strong>COMPLETE VEHICLE</strong></div>
      <div className="axis-key"><span className="axis-x">+X</span> forward <i /> <span>drag to orbit</span></div>
    </div>
  )
}
