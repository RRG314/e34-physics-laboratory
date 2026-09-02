import { ChevronLeft, Gauge, Pause, Play, SkipForward } from 'lucide-react'
import { useVehicleSimulation } from '../hooks/useVehicleSimulation'
import { vehicleSimulation } from '../simulation/vehicleSimulation'
import { useLabLearningStore } from '../store/labLearningStore'
import { ModelInspector } from './ModelInspector'

function explainMoment(velocity: number, acceleration: number, modelLevel: string) {
  if (Math.abs(velocity) < 0.05 && Math.abs(acceleration) < 0.05) return 'The vehicle is approximately at rest in the world frame. Position can still be nonzero even when velocity is zero.'
  if (acceleration > 0.05) return `Velocity is increasing in +X because acceleration is positive. The ${modelLevel} model currently predicts v̇ = ${acceleration.toFixed(2)} m/s².`
  if (acceleration < -0.05) return `Acceleration points opposite +X, so the vehicle is losing forward speed. Kinetic energy is decreasing while braking or road load removes energy.`
  return 'Velocity is nearly constant: the position graph changes linearly while the velocity graph remains approximately horizontal.'
}

export function LaboratoryTools() {
  const simulation = useVehicleSimulation()
  const overlay = useLabLearningStore((state) => state.overlay)
  const setOverlay = useLabLearningStore((state) => state.setOverlay)
  const historyMax = Math.max(0, simulation.history.length - 1)
  return (
    <div className="laboratory-tools">
      <div className="time-controls" aria-label="Simulation time controls">
        <button aria-label={simulation.running ? 'Pause simulation' : 'Resume simulation'} onClick={() => vehicleSimulation.togglePause()}>{simulation.running ? <Pause size={14} /> : <Play size={14} />}</button>
        {([0.25, 1, 2] as const).map((scale) => <button key={scale} className={simulation.timeScale === scale ? 'active' : ''} onClick={() => vehicleSimulation.setTimeScale(scale)}>{scale}×</button>)}
        <button aria-label="Step one frame" onClick={() => vehicleSimulation.stepFrame()}><SkipForward size={14} /></button>
      </div>
      <div className="representation-controls"><Gauge size={13} /><span>Representation</span>{(['none', 'vectors', 'energy'] as const).map((item) => <button key={item} className={overlay === item ? 'active' : ''} onClick={() => setOverlay(item)}>{item}</button>)}</div>
      {historyMax > 0 && <label className="replay-control"><span><ChevronLeft size={12} /> Replay / scrub</span><input aria-label="Replay timeline" type="range" min="0" max={historyMax} defaultValue={historyMax} onChange={(event) => vehicleSimulation.scrubTo(Number(event.target.value))} /></label>}
      <details className="explain-moment"><summary>Explain this moment</summary><p>{explainMoment(simulation.velocity, simulation.acceleration, simulation.modelLevel)}</p><small>World frame · +X forward · t = {simulation.elapsed.toFixed(2)} s</small></details>
      <ModelInspector />
    </div>
  )
}
