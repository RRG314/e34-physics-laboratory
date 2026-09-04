import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, CheckCircle2, LockKeyhole, Shield, Sigma } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dynamicsLessons } from '../../data/dynamicsLessons'
import { highSchoolProgress, isFoundationPathComplete } from '../../domain/highSchoolPath'
import { idealClimbHeight, kineticEnergy, netForce, rampClimb, rectangularImpactPulse } from '../../domain/trackPhysics'
import { useLabLearningStore } from '../../store/labLearningStore'
import { useLearnerStore } from '../../store/learnerStore'
import { TelemetryPlot } from '../TelemetryPlot'

const samples = Array.from({ length: 41 }, (_, index) => index / 40)
type FeedbackState = 'idle' | 'correct' | 'wrong'

export function TrackLabPage() {
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const motionMissionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const dynamicsMissionIndex = useLearnerStore((state) => state.dynamicsMissionIndex)
  const completeDynamicsStep = useLearnerStore((state) => state.completeDynamicsStep)
  const recordAttempt = useLearnerStore((state) => state.recordAttempt)
  const recordMathematicsEvidence = useLabLearningStore((state) => state.recordMathematicsEvidence)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const pathInput = { mathematicsMastery, motionMissionIndex, driveChallengeComplete, wheelMissionIndex, dynamicsMissionIndex }
  const foundationComplete = isFoundationPathComplete(pathInput)
  const overallProgress = highSchoolProgress(pathInput)
  const [reviewIndex, setReviewIndex] = useState<number | null>(null)
  const lessonIndex = reviewIndex ?? Math.min(dynamicsMissionIndex, dynamicsLessons.length - 1)
  const lesson = dynamicsLessons[lessonIndex]
  const isReview = reviewIndex !== null && reviewIndex < dynamicsMissionIndex

  const [mass, setMass] = useState(1600)
  const [acceleration, setAcceleration] = useState(2.5)
  const [angle, setAngle] = useState(20)
  const [speed, setSpeed] = useState(10)
  const [stopTime, setStopTime] = useState(.4)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [calculation, setCalculation] = useState('')
  const [calculationState, setCalculationState] = useState<FeedbackState>('idle')
  const [graphChoice, setGraphChoice] = useState<string | null>(null)

  useEffect(() => {
    setPrediction(null)
    setCalculation('')
    setCalculationState('idle')
    setGraphChoice(null)
    document.querySelector('.track-page')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [lessonIndex])

  const model = useMemo(() => {
    if (lesson.id === 'net-force') {
      const force = netForce(mass, acceleration)
      return {
        expected: force, tolerance: Math.max(2, force * .005), headline: `${(force / 1000).toFixed(2)} kN`, label: 'net external force',
        note: `A ${mass} kg teaching mass accelerating at ${acceleration.toFixed(1)} m/s² requires ${force.toFixed(0)} N net force in Model A.`, title: 'Force and motion evidence',
        series: [
          { label: 'velocity', unit: 'm/s', color: '#32705a', values: samples.map((u) => acceleration * 4 * u) },
          { label: 'net force', unit: 'kN', color: '#a92833', values: samples.map(() => force / 1000) },
        ],
      }
    }
    if (lesson.id === 'ramp-forces') {
      const ramp = rampClimb(speed, angle)
      return {
        expected: ramp.accelerationMagnitude, tolerance: .03, headline: `${ramp.accelerationMagnitude.toFixed(2)} m/s²`, label: 'down-ramp acceleration',
        note: `The ideal model coasts ${ramp.distance.toFixed(1)} m uphill before velocity reaches zero after ${ramp.stopTime.toFixed(2)} s.`, title: 'Ramp state history',
        series: [
          { label: 'position', unit: 'm', color: '#a92833', values: samples.map((u) => { const t = u * ramp.stopTime; return speed * t - .5 * ramp.accelerationMagnitude * t ** 2 }) },
          { label: 'velocity', unit: 'm/s', color: '#32705a', values: samples.map((u) => speed * (1 - u)) },
          { label: 'acceleration', unit: 'm/s²', color: '#b78b4d', values: samples.map(() => -ramp.accelerationMagnitude) },
        ],
      }
    }
    if (lesson.id === 'energy-climb') {
      const energyKj = kineticEnergy(mass, speed) / 1000
      const height = idealClimbHeight(speed)
      return {
        expected: energyKj, tolerance: Math.max(.05, energyKj * .005), headline: `${energyKj.toFixed(1)} kJ`, label: 'initial kinetic energy',
        note: `With no losses, that energy corresponds to a maximum height of ${height.toFixed(2)} m. Mass cancels from the height equation, not from kinetic energy.`, title: 'Ideal mechanical-energy budget',
        series: [
          { label: 'kinetic', unit: 'kJ', color: '#a92833', values: samples.map((u) => energyKj * (1 - u)) },
          { label: 'gravitational', unit: 'kJ', color: '#32705a', values: samples.map((u) => energyKj * u) },
          { label: 'total', unit: 'kJ', color: '#b78b4d', values: samples.map(() => energyKj) },
        ],
      }
    }
    const impact = rectangularImpactPulse(mass, speed, stopTime)
    return {
      expected: impact.averageForce / 1000, tolerance: Math.max(.05, impact.averageForce / 1000 * .005), headline: `${(impact.averageForce / 1000).toFixed(1)} kN`, label: 'average force magnitude',
      note: `The momentum change is ${(impact.impulse / 1000).toFixed(1)} kN·s. The rectangular pulse is a teaching model, not a vehicle crash prediction.`, title: 'Idealized stopping pulse',
      series: [
        { label: 'velocity', unit: 'm/s', color: '#32705a', values: samples.map((u) => speed * (1 - u)) },
        { label: 'force', unit: 'kN', color: '#a92833', values: samples.map(() => impact.averageForce / 1000) },
        { label: 'impulse', unit: 'kN·s', color: '#b78b4d', values: samples.map((u) => impact.impulse * u / 1000) },
      ],
    }
  }, [lesson.id, mass, acceleration, angle, speed, stopTime])

  const predictionCorrect = prediction === lesson.predictionAnswer
  const graphCorrect = graphChoice === lesson.graphAnswer
  const ready = predictionCorrect && calculationState === 'correct' && graphCorrect
  const resetCalculation = () => { setCalculation(''); setCalculationState('idle') }
  const checkCalculation = () => {
    const parsed = Number(calculation.replace(',', '').trim())
    setCalculationState(Number.isFinite(parsed) && Math.abs(parsed - model.expected) <= model.tolerance ? 'correct' : 'wrong')
  }
  const finishLesson = () => {
    if (!ready) return
    if (isReview) { setReviewIndex(null); return }
    for (const conceptId of lesson.mathConceptIds) recordMathematicsEvidence(conceptId, .7, .7)
    for (const conceptId of lesson.physicsConceptIds) recordAttempt(conceptId, { exposure: .2, conceptualUnderstanding: .15, calculationSkill: .15, graphInterpretation: .15, predictionSkill: .15 }, true)
    addNotebookEntry({ kind: 'conclusion', title: `Path 02 · ${lesson.shortTitle}`, body: `${lesson.notebookConclusion} Inputs: ${model.note}` })
    completeDynamicsStep(lessonIndex)
    if (lessonIndex === dynamicsLessons.length - 1) document.querySelector('.track-page')?.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (!foundationComplete) return (
    <div className="locked-page page-fill" data-testid="locked-dynamics-path"><div className="locked-card"><LockKeyhole size={28} /><p className="eyebrow">High-school path 02 locked</p><h1>Finish the foundation route first.</h1><p>Forces and energy depend on motion graphs, signed acceleration, controlled-stop evidence, and wheel-scale reasoning. Complete all four foundation stages before beginning this path.</p><Link className="button button-primary" to="/garage">Return to your current assignment</Link></div></div>
  )

  return (
    <div className="content-page track-page">
      <header className="content-header dynamics-header">
        <div><p className="eyebrow">High-school mechanics · Path 02 · Stage {lesson.number} of 4</p><h1>{dynamicsMissionIndex >= 4 && !isReview ? 'Mechanics path complete.' : lesson.title}</h1><p>{lesson.objective} Every chapter requires a prediction, a constructed calculation, and graph evidence before it records progress.</p></div>
        <div className="path-score"><span>High-school route</span><strong>{overallProgress.completed}/{overallProgress.total}</strong><i><b style={{ width: `${overallProgress.percent}%` }} /></i></div>
      </header>

      <div className="dynamics-stepper" aria-label="Path 02 lesson sequence">
        {dynamicsLessons.map((item, index) => {
          const complete = index < dynamicsMissionIndex
          const current = index === dynamicsMissionIndex && dynamicsMissionIndex < 4
          const accessible = complete || current || dynamicsMissionIndex >= 4
          return <button key={item.id} disabled={!accessible} className={index === lessonIndex ? 'active' : complete ? 'complete' : ''} onClick={() => setReviewIndex(index < dynamicsMissionIndex || dynamicsMissionIndex >= 4 ? index : null)}><span>{complete ? <Check size={13} /> : String(index + 1).padStart(2, '0')}</span><strong>{item.shortTitle}</strong><small>{complete ? 'Evidence recorded' : current ? 'Current assignment' : 'Locked'}</small></button>
        })}
      </div>

      {dynamicsMissionIndex >= 4 && !isReview && <section className="path-complete-banner" data-testid="dynamics-path-complete"><CheckCircle2 size={22} /><div><strong>Path 02 evidence recorded</strong><p>You connected motion to force, resolved a ramp, closed an energy budget, and defended a stopping-pulse design. Your notebook contains the conclusion from each investigation.</p></div><Link to="/garage">See full progression <ArrowRight size={14} /></Link></section>}

      <section className="dynamics-brief"><div><p className="eyebrow">Vehicle question</p><h2>{lesson.vehicleQuestion}</h2></div><dl><div><dt>Mathematics</dt><dd>{lesson.mathematics}</dd></div><div><dt>Model</dt><dd>525i · idealized Model A</dd></div><div><dt>Success</dt><dd>Prediction + calculation + graph interpretation</dd></div></dl></section>
      <div className="safety-banner"><Shield size={22} /><div><strong>Simulation only</strong><span>Ramp and impact scenarios are mathematical models. Never reproduce uncontrolled ramps, impacts, or drops with a real vehicle.</span></div></div>

      <section className="track-workbench">
        <div className="track-controls">
          <p className="eyebrow">01 · Declare the test</p>
          {(lesson.id === 'net-force' || lesson.id === 'energy-climb' || lesson.id === 'impact-design') && <label>Teaching mass <output>{mass} kg</output><input aria-label="Teaching mass" type="range" min="1000" max="2200" step="50" value={mass} onChange={(event) => { setMass(Number(event.target.value)); resetCalculation() }} /></label>}
          {lesson.id === 'net-force' && <label>Measured acceleration <output>{acceleration.toFixed(1)} m/s²</output><input aria-label="Measured acceleration" type="range" min="0.5" max="4" step="0.5" value={acceleration} onChange={(event) => { setAcceleration(Number(event.target.value)); resetCalculation() }} /></label>}
          {lesson.id === 'ramp-forces' && <label>Ramp angle <output>{angle}°</output><input aria-label="Ramp angle" type="range" min="5" max="30" value={angle} onChange={(event) => { setAngle(Number(event.target.value)); resetCalculation() }} /></label>}
          {(lesson.id === 'ramp-forces' || lesson.id === 'energy-climb' || lesson.id === 'impact-design') && <label>Initial speed <output>{speed} m/s</output><input aria-label="Initial speed" type="range" min="5" max="20" value={speed} onChange={(event) => { setSpeed(Number(event.target.value)); resetCalculation() }} /></label>}
          {lesson.id === 'impact-design' && <label>Stopping time <output>{stopTime.toFixed(2)} s</output><input aria-label="Stopping time" type="range" min="0.1" max="0.8" step="0.05" value={stopTime} onChange={(event) => { setStopTime(Number(event.target.value)); resetCalculation() }} /></label>}
          <div className="prediction-block"><span>Predict before telemetry</span><p>{lesson.predictionPrompt}</p><div>{lesson.predictionChoices.map((choice) => <button key={choice.id} className={prediction === choice.id ? (predictionCorrect ? 'correct' : 'wrong') : ''} onClick={() => setPrediction(choice.id)}>{choice.label}</button>)}</div>{prediction && <small className={predictionCorrect ? 'correct' : 'wrong'}>{predictionCorrect ? lesson.predictionFeedback : 'That prediction does not follow the equation yet. Compare which quantities are fixed and which change.'}</small>}</div>
          <details open><summary>Model assumptions</summary><ul>{lesson.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul></details>
        </div>
        <div className="track-graphs">{predictionCorrect ? <><TelemetryPlot title={model.title} series={model.series} /><div className="result-block"><span>{model.label}</span><strong>{model.headline}</strong><code>{lesson.equation}</code><p>{model.note}</p></div></> : <div className="telemetry-lock"><Sigma size={28} /><strong>Telemetry is covered.</strong><p>Commit a correct qualitative prediction first. This keeps the graph as evidence rather than an answer key.</p></div>}</div>
      </section>

      <section className="evidence-workbench">
        <article className="math-studio"><p className="eyebrow">02 · Build the mathematics</p><h3>Worked example, then your values</h3><code>{lesson.equation}</code><ol>{lesson.workedExample.map((line) => <li key={line}>{line}</li>)}</ol><p>The example uses different values. Carry units through your own calculation and enter only the requested final number below.</p></article>
        <article className="evidence-card"><p className="eyebrow">03 · Construct a result</p><h3>{lesson.calculationPrompt}</h3><label><span>Your result</span><div><input aria-label="Dynamics calculated result" inputMode="decimal" value={calculation} onChange={(event) => { setCalculation(event.target.value); setCalculationState('idle') }} /><b>{lesson.calculationUnit}</b></div></label><button onClick={checkCalculation}>Check calculation</button>{calculationState !== 'idle' && <p className={`evidence-feedback ${calculationState}`}>{calculationState === 'correct' ? 'Correct. The value and requested unit agree with the declared model.' : `Not yet. Rebuild ${lesson.equation}, keep the units visible, and check whether the requested answer is in ${lesson.calculationUnit}.`}</p>}</article>
        <article className="evidence-card"><p className="eyebrow">04 · Read the representation</p><h3>{lesson.graphPrompt}</h3><div className="graph-choices">{lesson.graphChoices.map((choice) => <button key={choice.id} disabled={!predictionCorrect} className={graphChoice === choice.id ? (graphCorrect ? 'correct' : 'wrong') : ''} onClick={() => setGraphChoice(choice.id)}>{choice.label}</button>)}</div>{graphChoice && <p className={`evidence-feedback ${graphCorrect ? 'correct' : 'wrong'}`}>{graphCorrect ? lesson.graphFeedback : 'That feature does not support the claim. Match the graph’s slope, area, or level to the equation.'}</p>}</article>
        <article className="evidence-submit"><p className="eyebrow">05 · Record evidence</p><h3>{ready ? 'All three evidence checks agree.' : 'Finish the evidence chain.'}</h3><ul><li className={predictionCorrect ? 'done' : ''}>{predictionCorrect ? <Check size={14} /> : null}Prediction</li><li className={calculationState === 'correct' ? 'done' : ''}>{calculationState === 'correct' ? <Check size={14} /> : null}Calculation</li><li className={graphCorrect ? 'done' : ''}>{graphCorrect ? <Check size={14} /> : null}Graph interpretation</li></ul><button className="button button-primary" disabled={!ready} onClick={finishLesson}>{isReview ? 'Return to current assignment' : lessonIndex === dynamicsLessons.length - 1 ? 'Complete Path 02' : 'Record and continue'} <ArrowRight size={14} /></button><small>A conclusion and the declared inputs will be saved in Notes.</small></article>
      </section>
    </div>
  )
}
