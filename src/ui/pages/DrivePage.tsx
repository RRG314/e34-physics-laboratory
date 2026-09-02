import { useEffect } from 'react'
import { LockKeyhole, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { useLearnerStore } from '../../store/learnerStore'
import { useVehicleSimulation } from '../../hooks/useVehicleSimulation'
import { vehicleSimulation } from '../../simulation/vehicleSimulation'
import { canAccessTarget } from '../../domain/progressionEngine'
import { LockedExplanation } from '../LockedExplanation'

export function DrivePage() {
  const mastery = useLearnerStore((state) => state.mastery)
  const unlocked = canAccessTarget('controlled-drive', mastery)
  const simulation = useVehicleSimulation()

  useEffect(() => {
    if (!unlocked) return
    vehicleSimulation.startDrive()
    const keys = new Set<string>()
    const update = () => vehicleSimulation.setDriveInput(keys.has('ArrowUp') || keys.has('KeyW') ? 1 : 0, keys.has('ArrowDown') || keys.has('KeyS') ? 1 : 0)
    const down = (event: KeyboardEvent) => { keys.add(event.code); update() }
    const up = (event: KeyboardEvent) => { keys.delete(event.code); update() }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      vehicleSimulation.setDriveInput(0, 0)
    }
  }, [unlocked])

  if (!unlocked) {
    return (
      <div className="locked-page page-fill">
        <div className="locked-card">
          <LockKeyhole size={28} />
          <p className="eyebrow">Capability locked</p>
          <h1>Describe motion before controlling it.</h1>
          <p>Complete the four predict-run-measure investigations. Driving is the reward for demonstrating displacement, speed, signed velocity, graph reading, and acceleration.</p>
          <LockedExplanation targetId="controlled-drive" mastery={mastery} />
          <Link className="button button-primary" to="/laboratory">Open motion laboratory</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="drive-page page-fill">
      <LaboratoryScene sceneMode="drive" />
      <div className="drive-hud">
        <p className="eyebrow">Guided drive / Model A</p>
        <div className="speed-readout"><strong>{(simulation.velocity * 3.6).toFixed(1)}</strong><span>km/h</span></div>
        <div className="drive-values"><span>x <strong>{simulation.position.toFixed(1)} m</strong></span><span>a <strong>{simulation.acceleration.toFixed(1)} m/s²</strong></span><span>ω <strong>{simulation.wheelAngularVelocity.toFixed(1)} rad/s</strong></span></div>
        <div className="control-keys"><kbd>W</kbd><span>accelerate</span><kbd>S</kbd><span>brake</span></div>
        <div className="pedal-controls">
          <button onPointerDown={() => vehicleSimulation.setDriveInput(1, 0)} onPointerUp={() => vehicleSimulation.setDriveInput(0, 0)} onPointerLeave={() => vehicleSimulation.setDriveInput(0, 0)}>Throttle</button>
          <button onPointerDown={() => vehicleSimulation.setDriveInput(0, 1)} onPointerUp={() => vehicleSimulation.setDriveInput(0, 0)} onPointerLeave={() => vehicleSimulation.setDriveInput(0, 0)}>Brake</button>
          <button aria-label="Reset drive" onClick={() => vehicleSimulation.startDrive()}><RotateCcw size={15} /></button>
        </div>
        <p className="model-note">Educational idealization: level road, no drag, no rolling resistance, no tire slip.</p>
        <details className="why-path"><summary>Why did the car accelerate?</summary><ol><li><strong>Net force was positive.</strong><span>Available after Newton's laws.</span></li><li><strong>Tires acted on the road.</strong><span>Available after friction.</span></li><li><strong>Drive torque reached the wheels.</strong><span>Available after torque and rotation.</span></li></ol></details>
      </div>
    </div>
  )
}
