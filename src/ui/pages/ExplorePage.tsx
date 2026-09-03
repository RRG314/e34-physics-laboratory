import { useState } from 'react'
import { LockKeyhole, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { componentById, components } from '../../data/components'
import { targetVehicle } from '../../data/vehicle'
import { wheelAngularSpeed, radiansPerSecondToRpm, wheelCircumference } from '../../physics/kinematics'
import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { useLearnerStore } from '../../store/learnerStore'
import { StatusBadge } from '../StatusBadge'
import { canAccessTarget, canUseInstrument } from '../../domain/progressionEngine'
import { LockedExplanation } from '../LockedExplanation'
import { WheelCheckpoint } from '../WheelCheckpoint'

export function ExplorePage() {
  const mastery = useLearnerStore((state) => state.mastery)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const unlocked = canAccessTarget('basic-wheel-inspection', mastery)
  const telemetryUnlocked = canUseInstrument('wheel-telemetry', mastery)
  const selectedId = useLearnerStore((state) => state.selectedComponentId)
  const selectComponent = useLearnerStore((state) => state.selectComponent)
  const exploded = useLearnerStore((state) => state.exploded)
  const setExploded = useLearnerStore((state) => state.setExploded)
  const [radius, setRadius] = useState(targetVehicle.runningGear.unloadedWheelRadius.value)
  const [speed, setSpeed] = useState(10)
  const selected = selectedId ? componentById[selectedId] : null
  const isWheel = selected?.id.startsWith('wheel-')
  const omega = wheelAngularSpeed(speed, radius)

  if (!unlocked) {
    return (
      <div className="locked-page page-fill">
        <div className="locked-card">
          <LockKeyhole size={28} />
          <p className="eyebrow">Subsystem locked</p>
          <h1>The car is still one object.</h1>
          <p>Complete the wheel mathematics, motion investigations, and controlled-stop drive to reveal the four wheels as selectable physical systems.</p>
          <LockedExplanation targetId="basic-wheel-inspection" mastery={mastery} />
          <Link className="button button-primary" to="/garage">See the required path</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="split-page explore-page page-fill">
      <LaboratoryScene />
      <aside className="explore-panel">
        <div className="panel-header">
          <div><p className="eyebrow">System explorer</p><h2>{selected?.name ?? 'Select a wheel'}</h2></div>
          <button disabled={!telemetryUnlocked} className={`icon-button ${exploded ? 'active' : ''}`} onClick={() => setExploded(!exploded)} aria-label="Toggle exploded wheels" title={telemetryUnlocked ? 'Toggle first-stage exploded view' : 'Requires wheel rotation mastery'}><Maximize2 size={17} /></button>
        </div>
        <div className="component-list">
          {components.filter((component) => component.id.startsWith('wheel-')).map((component) => (
            <button key={component.id} className={selectedId === component.id ? 'active' : ''} onClick={() => selectComponent(component.id)}><span>{component.id.slice(-2).toUpperCase()}</span>{component.name.replace(' driven', '')}</button>
          ))}
        </div>
        {!isWheel ? (
          <div className="empty-inspector"><div className="wheel-glyph" /><p>Click a wheel on the model or choose one above. The geometry is now available because complete-car motion is mastered.</p></div>
        ) : (
          <div className="wheel-lab" data-testid="wheel-lab">
            <div className="data-heading"><span>Nominal geometry</span><StatusBadge status={targetVehicle.runningGear.unloadedWheelRadius.status} /></div>
            <label>Experimental radius <output>{radius.toFixed(3)} m</output><input aria-label="Wheel radius" type="range" min="0.25" max="0.42" step="0.001" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label>
            <WheelCheckpoint />
            {wheelMissionIndex >= 1 && <label>Road speed <output>{speed.toFixed(1)} m/s</output><input aria-label="Road speed" type="range" min="1" max="30" step="0.5" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /></label>}
            {wheelMissionIndex >= 1 && <div className="equation-card"><span>No-slip relation</span><strong>v = rω</strong></div>}
            {telemetryUnlocked ? <div className="wheel-results" data-testid="wheel-telemetry">
              <div><span>Circumference</span><strong>{wheelCircumference(radius).toFixed(3)} m</strong></div>
              <div><span>Angular speed</span><strong>{omega.toFixed(2)} rad/s</strong></div>
              <div><span>Wheel speed</span><strong>{radiansPerSecondToRpm(omega).toFixed(0)} rpm</strong></div>
              <div><span>Rev / 100 m</span><strong>{(100 / wheelCircumference(radius)).toFixed(1)}</strong></div>
            </div> : <LockedExplanation targetId="wheel-telemetry" mastery={mastery} />}
            <p className="model-note">Level A model. Loaded radius, deformation and longitudinal slip are intentionally omitted.</p>
            {telemetryUnlocked && <LockedExplanation targetId="traction-experiments" mastery={mastery} />}
          </div>
        )}
      </aside>
    </div>
  )
}
