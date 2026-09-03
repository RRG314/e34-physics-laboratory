import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, LockKeyhole, RotateCcw, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { useLearnerStore } from '../../store/learnerStore'
import { useVehicleSimulation } from '../../hooks/useVehicleSimulation'
import { vehicleSimulation } from '../../simulation/vehicleSimulation'
import { canAccessTarget } from '../../domain/progressionEngine'
import { LockedExplanation } from '../LockedExplanation'
import { useLabLearningStore } from '../../store/labLearningStore'

export function DrivePage() {
  const mastery = useLearnerStore((state) => state.mastery)
  const unlocked = canAccessTarget('controlled-drive', mastery)
  const simulation = useVehicleSimulation()
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const completeDriveChallenge = useLearnerStore((state) => state.completeDriveChallenge)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const [reachedTarget, setReachedTarget] = useState(false)
  const [peakSpeed, setPeakSpeed] = useState(0)
  const [challengeMessage, setChallengeMessage] = useState('Accelerate to at least 8.0 m/s, then brake to rest between 16 m and 32 m.')

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

  useEffect(() => {
    if (!unlocked || driveChallengeComplete) return
    if (simulation.velocity > peakSpeed) setPeakSpeed(simulation.velocity)
    if (simulation.velocity >= 8 && !reachedTarget) {
      setReachedTarget(true)
      setChallengeMessage('Target speed reached. Brake to rest inside the 16–32 m stopping window.')
      return
    }
    if (!reachedTarget || simulation.elapsed < 1 || simulation.velocity > 0.2) return
    if (simulation.position >= 16 && simulation.position <= 32) {
      completeDriveChallenge()
      setChallengeMessage('Application complete: you reached the target speed and controlled the stop inside the measured window.')
      addNotebookEntry({ kind: 'conclusion', title: 'Controlled motion challenge', body: `Reached a peak speed of ${Math.max(peakSpeed, simulation.velocity).toFixed(2)} m/s and stopped at x = ${simulation.position.toFixed(2)} m. The control input changed acceleration, velocity, and stopping position together.` })
    } else if (simulation.position < 16) {
      setChallengeMessage('The stop was early. Accelerate again and finish between 16 m and 32 m.')
    } else {
      setChallengeMessage('The car passed 32 m. Reset the run and begin braking sooner.')
    }
  }, [addNotebookEntry, completeDriveChallenge, driveChallengeComplete, peakSpeed, reachedTarget, simulation.elapsed, simulation.position, simulation.velocity, unlocked])

  const resetChallenge = () => {
    setReachedTarget(false)
    setPeakSpeed(0)
    setChallengeMessage('Accelerate to at least 8.0 m/s, then brake to rest between 16 m and 32 m.')
    vehicleSimulation.startDrive()
  }

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
          <button aria-label="Reset drive" onClick={resetChallenge}><RotateCcw size={15} /></button>
        </div>
        <section className={`drive-challenge ${driveChallengeComplete ? 'complete' : reachedTarget ? 'braking' : ''}`} data-testid="drive-challenge">
          <div>{driveChallengeComplete ? <CheckCircle2 size={17} /> : <Target size={17} />}<span>{driveChallengeComplete ? 'Foundation stage complete' : reachedTarget ? 'Phase 2 · controlled stop' : 'Phase 1 · reach target speed'}</span></div>
          <p>{challengeMessage}</p>
          <dl><div><dt>Peak</dt><dd>{peakSpeed.toFixed(1)} m/s</dd></div><div><dt>Position</dt><dd>{simulation.position.toFixed(1)} m</dd></div><div><dt>Stop zone</dt><dd>16–32 m</dd></div></dl>
          {driveChallengeComplete && <div className="drive-complete-actions"><Link to="/explore">Continue to wheel telemetry <ArrowRight size={13} /></Link><button type="button" onClick={resetChallenge}>Run again</button></div>}
        </section>
        <p className="model-note">The active model level and its assumptions are visible in the Lesson model inspector. This challenge measures control of the current model, not real-road stopping performance.</p>
        <details className="why-path"><summary>Why did the car accelerate?</summary><ol><li><strong>Net force was positive.</strong><span>Available after Newton's laws.</span></li><li><strong>Tires acted on the road.</strong><span>Available after friction.</span></li><li><strong>Drive torque reached the wheels.</strong><span>Available after torque and rotation.</span></li></ol></details>
      </div>
    </div>
  )
}
