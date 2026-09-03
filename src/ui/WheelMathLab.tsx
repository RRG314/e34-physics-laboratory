import { useMemo, useState, type FormEvent } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { deriveTireGeometry, distanceAfterRevolutions, teachingTire, wheelRpm, withinTolerance } from '../domain/tireMath'
import { useLabLearningStore } from '../store/labLearningStore'
import { useLearnerStore } from '../store/learnerStore'

const geometry = deriveTireGeometry(teachingTire)
const loadedRadiusM = 0.312

const tasks = [
  {
    title: 'Decode the sidewall',
    prompt: 'The 65 in 205/65 R15 is 65% of the 205 mm section width. Calculate one sidewall height.',
    expression: 'h = 205 mm × 65/100',
    unit: 'mm',
    answer: geometry.sidewallHeightMm,
    tolerance: 0.05,
    hint: 'Turn 65% into 0.65, then multiply by 205 mm.',
  },
  {
    title: 'Build the unloaded diameter',
    prompt: 'Convert the 15-inch rim to millimetres, then add two sidewalls. What is the full unloaded diameter?',
    expression: 'd = (15 in × 25.4 mm/in) + 2h',
    unit: 'mm',
    answer: geometry.unloadedDiameterMm,
    tolerance: 0.1,
    hint: 'The rim is 381 mm. Add the upper and lower 133.25 mm sidewalls.',
  },
  {
    title: 'Predict one revolution',
    prompt: 'Use the unloaded diameter in metres. How far would an ideal rigid wheel roll in one revolution?',
    expression: 'C = πd',
    unit: 'm',
    answer: geometry.circumferenceM,
    tolerance: 0.006,
    hint: '647.5 mm = 0.6475 m. Multiply by π and keep at least three significant figures.',
  },
  {
    title: 'Connect road speed to wheel speed',
    prompt: 'At 100 km/h, how many revolutions per minute does the ideal wheel make?',
    expression: 'rpm = (100 km/h ÷ 3.6 ÷ C) × 60',
    unit: 'rpm',
    answer: wheelRpm(100, geometry.circumferenceM),
    tolerance: 2,
    hint: 'First convert 100 km/h to 27.78 m/s. Divide by metres per revolution, then multiply by 60.',
  },
] as const

function TireSectionDiagram() {
  return (
    <svg className="tire-section" viewBox="0 0 320 260" role="img" aria-label="Cross-section diagram of a 205/65 R15 tire">
      <path d="M85 32 C45 67 43 191 85 228 L235 228 C277 191 275 67 235 32 Z" className="tire-rubber" />
      <circle cx="160" cy="130" r="72" className="tire-rim" />
      <line x1="85" y1="18" x2="235" y2="18" className="measure-line" />
      <line x1="85" y1="12" x2="85" y2="25" className="measure-line" />
      <line x1="235" y1="12" x2="235" y2="25" className="measure-line" />
      <text x="160" y="11" textAnchor="middle">205 mm section width</text>
      <line x1="247" y1="56" x2="247" y2="130" className="measure-line" />
      <line x1="240" y1="56" x2="254" y2="56" className="measure-line" />
      <line x1="240" y1="130" x2="254" y2="130" className="measure-line" />
      <text x="263" y="91">65%</text>
      <text x="263" y="104">sidewall</text>
      <text x="160" y="126" textAnchor="middle">15 in</text>
      <text x="160" y="140" textAnchor="middle">rim</text>
    </svg>
  )
}

function DistanceGraph({ revolutions, onChange }: { revolutions: number; onChange: (value: number) => void }) {
  const width = 580
  const height = 250
  const pad = 42
  const maxRevolutions = 20
  const maxDistance = 42
  const point = (rev: number, radius: number) => ({
    x: pad + rev / maxRevolutions * (width - pad * 2),
    y: height - pad - distanceAfterRevolutions(rev, radius) / maxDistance * (height - pad * 2),
  })
  const path = (radius: number) => Array.from({ length: 41 }, (_, index) => {
    const p = point(index / 2, radius)
    return `${index ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  }).join(' ')
  const nominal = point(revolutions, geometry.unloadedRadiusM)
  const loaded = point(revolutions, loadedRadiusM)
  const nominalDistance = distanceAfterRevolutions(revolutions, geometry.unloadedRadiusM)
  const loadedDistance = distanceAfterRevolutions(revolutions, loadedRadiusM)

  return (
    <figure className="wheel-distance-graph">
      <figcaption><div><strong>Distance versus wheel revolutions</strong><span>Move the cursor to interrogate both models.</span></div><div className="graph-legend"><i className="nominal" /> unloaded geometry <i className="loaded" /> loaded-radius model</div></figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`At ${revolutions} revolutions, unloaded geometry predicts ${nominalDistance.toFixed(2)} metres and loaded radius predicts ${loadedDistance.toFixed(2)} metres`}>
        {[0, 5, 10, 15, 20].map((tick) => { const p = point(tick, 0); return <g key={`x-${tick}`}><line x1={p.x} y1={pad} x2={p.x} y2={height - pad} className="wheel-grid" /><text x={p.x} y={height - 18} textAnchor="middle">{tick}</text></g> })}
        {[0, 10, 20, 30, 40].map((tick) => { const y = height - pad - tick / maxDistance * (height - pad * 2); return <g key={`y-${tick}`}><line x1={pad} y1={y} x2={width - pad} y2={y} className="wheel-grid" /><text x={pad - 10} y={y + 3} textAnchor="end">{tick}</text></g> })}
        <path d={path(geometry.unloadedRadiusM)} className="wheel-line nominal" />
        <path d={path(loadedRadiusM)} className="wheel-line loaded" />
        <line x1={nominal.x} y1={pad} x2={nominal.x} y2={height - pad} className="wheel-cursor" />
        <circle cx={nominal.x} cy={nominal.y} r="5" className="wheel-point nominal" />
        <circle cx={loaded.x} cy={loaded.y} r="5" className="wheel-point loaded" />
        <text x={width / 2} y={height - 2} textAnchor="middle">wheel revolutions, N</text>
        <text x="13" y={height / 2} textAnchor="middle" transform={`rotate(-90 13 ${height / 2})`}>distance, m</text>
      </svg>
      <label><span>Graph cursor</span><input type="range" min="0" max="20" step="0.5" value={revolutions} onChange={(event) => onChange(Number(event.target.value))} /><output>{revolutions.toFixed(1)} rev</output></label>
      <div className="graph-readout"><span>Unloaded<strong>{nominalDistance.toFixed(2)} m</strong></span><span>Loaded model<strong>{loadedDistance.toFixed(2)} m</strong></span><span>Residual<strong>{(nominalDistance - loadedDistance).toFixed(2)} m</strong></span></div>
    </figure>
  )
}

export function WheelMathLab() {
  const recordMathematicsEvidence = useLabLearningStore((state) => state.recordMathematicsEvidence)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const recordAttempt = useLearnerStore((state) => state.recordAttempt)
  const [step, setStep] = useState(0)
  const [entry, setEntry] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('Use the tire marking and diagram. Enter a number; the unit is already shown.')
  const [revolutions, setRevolutions] = useState(10)
  const [modelChoice, setModelChoice] = useState<string | null>(null)
  const [complete, setComplete] = useState(false)
  const task = tasks[Math.min(step, tasks.length - 1)]
  const progress = useMemo(() => complete ? 100 : step / 5 * 100, [complete, step])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const value = Number(entry)
    if (!withinTolerance(value, task.answer, task.tolerance)) {
      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)
      setMessage(Number.isFinite(value)
        ? `That result is not within the measurement tolerance. ${nextAttempts >= 2 ? task.hint : 'Check the operation and the unit conversion.'}`
        : 'Enter a numerical value without the unit symbol.')
      return
    }

    const evidence = [
      ['math-ratios', 0.72, 0.7],
      ['math-unit-conversion', 0.7, 0.72],
      ['math-geometry', 0.74, 0.72],
      ['math-ratios', 0.78, 0.76],
    ] as const
    const [conceptId, conceptual, procedural] = evidence[step]
    recordMathematicsEvidence(conceptId, conceptual, procedural)
    setStep((current) => current + 1)
    setEntry('')
    setAttempts(0)
    setMessage(step === tasks.length - 1
      ? 'Calculation accepted. Now decide why the two graph models disagree.'
      : `Accepted: ${value.toFixed(step < 2 ? 2 : 3)} ${task.unit}. The next result must build from this one.`)
  }

  const chooseModel = (choice: string) => {
    setModelChoice(choice)
    if (choice !== 'loaded') {
      setMessage('Changing π or wheel revolutions would change the mathematics, not the physical model. Look for an assumption that changes under vehicle load.')
      return
    }
    if (!complete) {
      recordMathematicsEvidence('math-graph-interpretation', 0.72, 0.66)
      recordAttempt('wheel-circumference', { exposure: 0.65, conceptualUnderstanding: 0.4, calculationSkill: 0.5, graphInterpretation: 0.3, modelingSkill: 0.3 }, true)
      addNotebookEntry({ kind: 'conclusion', title: '205/65 R15 wheel model', body: `Unloaded geometry predicts ${geometry.circumferenceM.toFixed(3)} m per revolution. A 0.312 m loaded-radius model predicts ${(2 * Math.PI * loadedRadiusM).toFixed(3)} m. Tire deformation explains why nominal geometry and road measurement can differ.` })
    }
    setComplete(true)
    setMessage('Model distinction accepted. Your notebook now contains the prediction, alternative model, and physical explanation.')
  }

  const reset = () => {
    setStep(0)
    setEntry('')
    setAttempts(0)
    setMessage('Use the tire marking and diagram. Enter a number; the unit is already shown.')
    setModelChoice(null)
    setComplete(false)
    setRevolutions(10)
  }

  return (
    <section className="wheel-math-lab" id="wheel-math-lab">
      <header>
        <div><p className="eyebrow">Playable chapter 01 · measurement and proportional reasoning</p><h2>Read a tire. Build a wheel model. Test its limit.</h2><p>This is the first complete mathematics investigation: each result depends on the previous measurement, and evidence is recorded only after you produce a defensible answer.</p></div>
        <div className="lesson-progress"><span>{complete ? 'Investigation complete' : `Evidence ${step} / 5`}</span><i><b style={{ width: `${progress}%` }} /></i></div>
      </header>
      <div className="wheel-lab-grid">
        <aside className="wheel-specimen">
          <span>Teaching specimen · nominal marking</span>
          <strong>205 / 65 R15</strong>
          <TireSectionDiagram />
          <small>Configuration warning: this tire size is a current teaching assumption for the example car, not yet a verified claim about every 1995 525i.</small>
        </aside>
        <div className="wheel-work">
          {step < tasks.length ? <>
            <p className="eyebrow">Calculation {step + 1} / {tasks.length}</p>
            <h3>{task.title}</h3>
            <p>{task.prompt}</p>
            {step === 0 && <div className="worked-example"><span>Worked example · different tire</span><p>For 195/60 R15: <b>60% = 0.60</b>, so the sidewall is <b>195 mm × 0.60 = 117 mm</b>. Now transfer that reasoning to the 205/65 R15.</p></div>}
            <code>{task.expression}</code>
            <form onSubmit={submit}>
              <label htmlFor="wheel-math-answer">Your result</label>
              <div><input id="wheel-math-answer" inputMode="decimal" value={entry} onChange={(event) => setEntry(event.target.value)} autoComplete="off" /><span>{task.unit}</span><button type="submit">Check reasoning</button></div>
            </form>
          </> : <>
            <p className="eyebrow">Model check · graph interpretation</p>
            <h3>Why is the loaded line lower?</h3>
            <p>The nominal geometry and loaded-radius model use the same number of revolutions. Choose the physical reason for the growing residual.</p>
            <div className="model-choice">
              <button className={modelChoice === 'pi' ? 'selected' : ''} onClick={() => chooseModel('pi')}>π becomes smaller under load</button>
              <button className={modelChoice === 'loaded' ? 'selected correct' : ''} onClick={() => chooseModel('loaded')}>The tire deflects, reducing effective rolling radius</button>
              <button className={modelChoice === 'revolutions' ? 'selected' : ''} onClick={() => chooseModel('revolutions')}>The graph secretly adds revolutions</button>
            </div>
            {complete && <button className="button button-quiet wheel-reset" onClick={reset}><RotateCcw size={14} /> Run with fresh work</button>}
          </>}
          <div className={`wheel-feedback ${complete ? 'complete' : attempts ? 'needs-work' : ''}`}>{complete && <Check size={15} />}{message}</div>
          <details><summary>What is being assessed?</summary><p>Ratio meaning, inch-to-millimetre conversion, circle geometry, multi-step unit reasoning, graph reading, and the distinction between nominal geometry and a loaded physical model.</p></details>
        </div>
      </div>
      <DistanceGraph revolutions={revolutions} onChange={setRevolutions} />
    </section>
  )
}
