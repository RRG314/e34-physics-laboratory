import { useMemo, useState } from 'react'
import { Activity, Mountain, Shield, Triangle } from 'lucide-react'
import { TelemetryPlot } from '../TelemetryPlot'
import { idealDrop, rampClimb, rectangularImpactPulse } from '../../domain/trackPhysics'

type LabId = 'ramp' | 'impact' | 'drop'

const samples = Array.from({ length: 41 }, (_, index) => index / 40)
const g = 9.81

export function TrackLabPage() {
  const [lab, setLab] = useState<LabId>('ramp')
  const [angle, setAngle] = useState(12)
  const [speed, setSpeed] = useState(14)
  const [stopTime, setStopTime] = useState(.18)
  const [height, setHeight] = useState(12)
  const [mass, setMass] = useState(1600)

  const result = useMemo(() => {
    if (lab === 'ramp') {
      const ramp = rampClimb(speed, angle)
      const acceleration = ramp.accelerationMagnitude
      const duration = ramp.stopTime
      const time = samples.map((u) => u * duration)
      return { headline: `${acceleration.toFixed(2)} m/s²`, label: 'down-ramp acceleration', equation: 'a = g sin θ', note: `Starting at ${speed.toFixed(0)} m/s, the idealized car reaches rest after ${duration.toFixed(2)} s while climbing.`, series: [
        { label: 'position', unit: 'm', color: '#a92833', values: time.map((t) => speed * t - .5 * acceleration * t * t) },
        { label: 'velocity', unit: 'm/s', color: '#32705a', values: time.map((t) => speed - acceleration * t) },
        { label: 'acceleration', unit: 'm/s²', color: '#b78b4d', values: time.map(() => -acceleration) },
      ] }
    }
    if (lab === 'impact') {
      const deltaV = speed
      const impact = rectangularImpactPulse(mass, deltaV, stopTime)
      const impulse = impact.impulse
      const averageForce = impact.averageForce
      const time = samples.map((u) => u * stopTime)
      return { headline: `${(averageForce / 1000).toFixed(0)} kN`, label: 'average restraint force', equation: 'J = Δp = F̄ Δt', note: `The momentum change is ${(impulse / 1000).toFixed(1)} kN·s. Increasing stop time lowers average force in this rectangular-pulse model.`, series: [
        { label: 'velocity', unit: 'm/s', color: '#32705a', values: time.map((t) => speed * (1 - t / stopTime)) },
        { label: 'force', unit: 'kN', color: '#a92833', values: time.map(() => averageForce / 1000) },
        { label: 'impulse', unit: 'kN·s', color: '#b78b4d', values: time.map((t) => averageForce * t / 1000) },
      ] }
    }
    const drop = idealDrop(height)
    const fallTime = drop.fallTime
    const impactSpeed = drop.impactSpeed
    const time = samples.map((u) => u * fallTime)
    return { headline: `${impactSpeed.toFixed(1)} m/s`, label: 'ideal impact speed', equation: 'mgh = ½mv²', note: `Mass cancels in the ideal no-drag model. Fall time is ${fallTime.toFixed(2)} s; real cliffs and vehicles are never experiments.`, series: [
      { label: 'height', unit: 'm', color: '#32705a', values: time.map((t) => Math.max(0, height - .5 * g * t * t)) },
      { label: 'speed', unit: 'm/s', color: '#a92833', values: time.map((t) => g * t) },
      { label: 'KE/m', unit: 'J/kg', color: '#b78b4d', values: time.map((t) => .5 * (g * t) ** 2) },
    ] }
  }, [lab, angle, speed, stopTime, height, mass])

  return (
    <div className="content-page track-page">
      <header className="content-header"><p className="eyebrow">Virtual proving ground</p><h1>Prediction first. Telemetry second.</h1><p>Ramps, impacts, and drops are controlled mathematical sandboxes. Each lab exposes its assumptions and links motion, force, and energy representations.</p></header>
      <div className="safety-banner"><Shield size={22} /><div><strong>Simulation only</strong><span>Never reproduce impact, cliff, or uncontrolled-ramp scenarios with a real vehicle. These models intentionally omit many real hazards and are not engineering safety advice.</span></div></div>
      <div className="lab-tabs" role="tablist">{([{ id: 'ramp', label: 'Ramp', icon: Triangle }, { id: 'impact', label: 'Impact pulse', icon: Activity }, { id: 'drop', label: 'Drop / cliff', icon: Mountain }] as const).map((item) => <button role="tab" aria-selected={lab === item.id} className={lab === item.id ? 'active' : ''} onClick={() => setLab(item.id)} key={item.id}><item.icon size={17} />{item.label}</button>)}</div>
      <section className="track-workbench">
        <div className="track-controls">
          <p className="eyebrow">Declare inputs</p>
          {lab === 'ramp' && <label>Ramp angle <output>{angle}°</output><input aria-label="Ramp angle" type="range" min="2" max="35" value={angle} onChange={(event) => setAngle(Number(event.target.value))} /></label>}
          {(lab === 'ramp' || lab === 'impact') && <label>Initial speed <output>{speed} m/s</output><input aria-label="Initial speed" type="range" min="3" max="28" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /></label>}
          {lab === 'impact' && <label>Declared model mass <output>{mass} kg</output><input aria-label="Declared model mass" type="range" min="1000" max="2200" step="25" value={mass} onChange={(event) => setMass(Number(event.target.value))} /></label>}
          {lab === 'impact' && <label>Stopping time <output>{stopTime.toFixed(2)} s</output><input aria-label="Stopping time" type="range" min="0.05" max="0.6" step="0.01" value={stopTime} onChange={(event) => setStopTime(Number(event.target.value))} /></label>}
          {lab === 'drop' && <label>Drop height <output>{height} m</output><input aria-label="Drop height" type="range" min="1" max="40" value={height} onChange={(event) => setHeight(Number(event.target.value))} /></label>}
          <div className="result-block"><span>{result.label}</span><strong>{result.headline}</strong><code>{result.equation}</code><p>{result.note}</p></div>
          <details open><summary>Model assumptions</summary><ul>{lab === 'ramp' && <><li>Point-mass vehicle</li><li>No drag, rolling resistance, or wheel inertia</li><li>Constant ramp angle</li></>}{lab === 'impact' && <><li>1D inelastic stop</li><li>Constant average-force pulse</li><li>{mass} kg is a learner-selected model input, not a measured 525i specification</li></>}{lab === 'drop' && <><li>Uniform g = 9.81 m/s²</li><li>No aerodynamic drag or rotation</li><li>Ground impact is not modeled</li></>}</ul></details>
        </div>
        <div className="track-graphs"><TelemetryPlot title={lab === 'ramp' ? 'Ramp state history' : lab === 'impact' ? 'Impact pulse history' : 'Drop energy history'} series={result.series} /><div className="graph-reading"><span>READ THE GRAPH</span><p>{lab === 'ramp' ? 'The velocity line reaches zero where position reaches its maximum; constant negative acceleration sets its slope.' : lab === 'impact' ? 'The final impulse is the area under the force–time curve. Stretch the pulse and watch force fall while area stays fixed.' : 'Gravitational potential per kilogram falls as kinetic energy per kilogram rises by the same amount.'}</p></div></div>
      </section>
    </div>
  )
}
