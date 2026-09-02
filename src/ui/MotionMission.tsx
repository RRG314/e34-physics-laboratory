import { useEffect, useState } from 'react'
import { Check, LockKeyhole, RotateCcw } from 'lucide-react'
import { useLearnerStore } from '../store/learnerStore'
import { vehicleSimulation } from '../simulation/vehicleSimulation'
import { useVehicleSimulation } from '../hooks/useVehicleSimulation'
import { MotionGraph } from './MotionGraph'
import { diagnoseMotionAnswer, type DiagnosticEvent } from '../domain/assessmentDiagnostics'
import { useLabLearningStore } from '../store/labLearningStore'

const missions = [
  {
    eyebrow: 'Investigation 01 / describe the car',
    title: 'Measure a change in position',
    prompt: 'The E34 begins at x = +8 m and finishes at x = −4 m. What is its displacement?',
    equation: 'Δx = x_f − x_i',
    options: [-12, -4, 12],
    answer: -12,
    unit: 'm',
    focusConcept: 'displacement',
    experiment: { velocity: -2, acceleration: 0, duration: 6 },
    explanation: '−4 m − (+8 m) = −12 m. The sign records the change toward negative X.',
    estimate: { prompt: 'Before calculating: should the displacement be positive, zero, or negative?', options: ['Positive', 'Zero', 'Negative'], answer: 'Negative', rationale: 'The final coordinate lies 12 m in the −X direction from the initial coordinate.' },
  },
  {
    eyebrow: 'Investigation 02 / speed',
    title: 'Predict a constant-speed run',
    prompt: 'The E34 travels at 6 m/s for 6 s. Starting at x = 0, where should it finish?',
    equation: 'x = x₀ + vt',
    options: [12, 36, 72],
    answer: 36,
    unit: 'm',
    focusConcept: 'speed',
    experiment: { velocity: 6, acceleration: 0, duration: 6 },
    explanation: '36 m = 6 m/s × 6 s. The graph is a straight line because velocity is constant.',
    estimate: { prompt: 'Order-of-magnitude check: is the result units, tens, or hundreds of metres?', options: ['Units', 'Tens', 'Hundreds'], answer: 'Tens', rationale: 'A few metres per second sustained for a few seconds should produce a few tens of metres.' },
  },
  {
    eyebrow: 'Investigation 03 / velocity',
    title: 'Keep the direction in the number',
    prompt: 'The car moves at −4 m/s for 3 s. What is its displacement?',
    equation: 'Δx = vΔt',
    options: [-12, 6, 12],
    answer: -12,
    unit: 'm',
    focusConcept: 'velocity',
    experiment: { velocity: -4, acceleration: 0, duration: 3 },
    explanation: 'The magnitude is 12 m; the negative sign records motion opposite the +X direction.',
    estimate: { prompt: 'Before calculating: what sign should the displacement have?', options: ['Positive', 'Zero', 'Negative'], answer: 'Negative', rationale: 'Negative velocity over positive elapsed time produces negative displacement.' },
  },
  {
    eyebrow: 'Investigation 04 / acceleration',
    title: 'Predict the final velocity',
    prompt: 'Initial velocity is 2 m/s. Constant acceleration is 2 m/s² for 5 s. What is the final velocity?',
    equation: 'v = v₀ + at',
    options: [7, 10, 12],
    answer: 12,
    unit: 'm/s',
    focusConcept: 'acceleration',
    experiment: { velocity: 2, acceleration: 2, duration: 5 },
    explanation: 'The velocity changes by 10 m/s, so the final velocity is 12 m/s.',
    estimate: { prompt: 'With positive acceleration, should final velocity increase, decrease, or stay constant?', options: ['Increase', 'Decrease', 'Stay constant'], answer: 'Increase', rationale: 'Positive acceleration increases velocity in the selected +X direction.' },
  },
]

export function MotionMission() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const completeMotionStep = useLearnerStore((state) => state.completeMotionStep)
  const recordAttempt = useLearnerStore((state) => state.recordAttempt)
  const resetProgress = useLearnerStore((state) => state.resetProgress)
  const simulation = useVehicleSimulation()
  const recordDiagnostic = useLabLearningStore((state) => state.recordDiagnostic)
  const recordMathematicsEvidence = useLabLearningStore((state) => state.recordMathematicsEvidence)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [estimateAccepted, setEstimateAccepted] = useState(false)
  const [estimateFeedback, setEstimateFeedback] = useState('Choose a qualitative estimate before exact calculation.')
  const [lastDiagnostic, setLastDiagnostic] = useState<DiagnosticEvent | null>(null)
  const mission = missions[Math.min(missionIndex, missions.length - 1)]
  const complete = missionIndex >= missions.length

  useEffect(() => {
    setSelected(null)
    setFeedback('idle')
    setEstimateAccepted(false)
    setEstimateFeedback('Choose a qualitative estimate before exact calculation.')
    setLastDiagnostic(null)
  }, [missionIndex])

  const choose = (value: number) => {
    if (complete) return
    setSelected(value)
    if (value !== mission.answer) {
      setFeedback('wrong')
      const diagnostic = diagnoseMotionAnswer(missionIndex, mission.focusConcept, value)
      setLastDiagnostic(diagnostic)
      recordDiagnostic(diagnostic)
      if (diagnostic.mathConceptId) recordMathematicsEvidence(diagnostic.mathConceptId, 0.35, 0.15)
      recordAttempt(mission.focusConcept, {}, false)
      return
    }
    setFeedback('correct')
    vehicleSimulation.startExperiment(mission.experiment.velocity, mission.experiment.acceleration, mission.experiment.duration)
    window.setTimeout(() => completeMotionStep(missionIndex), 700)
  }

  const chooseEstimate = (value: string) => {
    if (value !== mission.estimate.answer) {
      setEstimateFeedback('That estimate conflicts with the direction or scale of the stated quantities. Re-check before calculating.')
      return
    }
    setEstimateAccepted(true)
    setEstimateFeedback(mission.estimate.rationale)
    addNotebookEntry({ kind: 'prediction', title: `${mission.title} — estimate`, body: `${value}. ${mission.estimate.rationale}` })
  }

  if (complete) {
    return (
      <aside className="mission-panel mission-complete" data-testid="mission-complete">
        <div className="unlock-mark"><Check size={22} /></div>
        <p className="eyebrow">Motion gate / passed</p>
        <h2>The E34 can move.</h2>
          <p>You measured displacement, predicted constant speed and signed velocity, then interpreted constant acceleration. Guided drive and basic wheel inspection are now available.</p>
        <div className="unlock-list">
          <span><Check size={15} /> Drive laboratory</span>
          <span><Check size={15} /> Wheel selection</span>
          <span><Check size={15} /> Rotation sequence</span>
        </div>
        <button className="button button-quiet" onClick={() => { resetProgress(); vehicleSimulation.reset() }}><RotateCcw size={15} /> Reset learner state</button>
      </aside>
    )
  }

  return (
    <aside className="mission-panel" data-testid={`mission-${missionIndex + 1}`}>
      <div className="mission-progress" aria-label={`Investigation ${missionIndex + 1} of ${missions.length}`}>
        {missions.map((_, index) => <i key={index} className={index <= missionIndex ? 'active' : ''} />)}
      </div>
      <p className="eyebrow">{mission.eyebrow}</p>
      <h2>{mission.title}</h2>
      <p className="mission-prompt">{mission.prompt}</p>
      <div className="equation-card"><span>Model A</span><strong>{mission.equation}</strong></div>
      <div className={`estimate-gate ${estimateAccepted ? 'accepted' : ''}`}>
        <span>Physical estimate</span><p>{mission.estimate.prompt}</p><div>{mission.estimate.options.map((option) => <button key={option} className={estimateAccepted && option === mission.estimate.answer ? 'active' : ''} onClick={() => chooseEstimate(option)}>{option}</button>)}</div><small>{estimateFeedback}</small>
      </div>
      <div className="answer-grid">
        {mission.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${selected === option ? feedback : ''}`}
            onClick={() => choose(option)}
            disabled={!estimateAccepted}
            aria-label={`${option} ${mission.unit}`}
          >
            <strong>{option}</strong><span>{mission.unit}</span>
          </button>
        ))}
      </div>
      <div className={`mission-feedback ${feedback}`} aria-live="polite">
        {feedback === 'idle' && <><LockKeyhole size={15} /> Prediction required before the run.</>}
        {feedback === 'wrong' && <><strong>{lastDiagnostic?.category ?? 'Check the model'}:</strong> {lastDiagnostic?.remediation ?? 'Re-check each known value.'}</>}
        {feedback === 'correct' && <><Check size={15} /> {mission.explanation}</>}
      </div>
      <div className="instrument-row">
        <div><span>t</span><strong>{simulation.elapsed.toFixed(1)} s</strong></div>
        <div><span>x</span><strong>{simulation.position.toFixed(1)} m</strong></div>
        <div><span>v</span><strong>{simulation.velocity.toFixed(1)} m/s</strong></div>
      </div>
      <MotionGraph simulation={simulation} />
    </aside>
  )
}
