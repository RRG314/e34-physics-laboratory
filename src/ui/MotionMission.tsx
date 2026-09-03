import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Check, LockKeyhole, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motionLessons } from '../data/motionLessons'
import { diagnoseMotionAnswer, type DiagnosticEvent } from '../domain/assessmentDiagnostics'
import { useVehicleSimulation } from '../hooks/useVehicleSimulation'
import { vehicleSimulation } from '../simulation/vehicleSimulation'
import { useLabLearningStore } from '../store/labLearningStore'
import { useLearnerStore } from '../store/learnerStore'
import { MotionGraph } from './MotionGraph'

export function MotionMission() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const completeMotionStep = useLearnerStore((state) => state.completeMotionStep)
  const recordAttempt = useLearnerStore((state) => state.recordAttempt)
  const resetProgress = useLearnerStore((state) => state.resetProgress)
  const simulation = useVehicleSimulation()
  const recordDiagnostic = useLabLearningStore((state) => state.recordDiagnostic)
  const recordMathematicsEvidence = useLabLearningStore((state) => state.recordMathematicsEvidence)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const resetLearning = useLabLearningStore((state) => state.resetLearning)
  const [entry, setEntry] = useState('')
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [estimateAccepted, setEstimateAccepted] = useState(false)
  const [estimateFeedback, setEstimateFeedback] = useState('Choose a qualitative estimate before exact calculation.')
  const [calculationAccepted, setCalculationAccepted] = useState(false)
  const [graphChoice, setGraphChoice] = useState<string | null>(null)
  const [graphAccepted, setGraphAccepted] = useState(false)
  const [lastDiagnostic, setLastDiagnostic] = useState<DiagnosticEvent | null>(null)
  const mission = motionLessons[Math.min(missionIndex, motionLessons.length - 1)]
  const complete = missionIndex >= motionLessons.length

  useEffect(() => {
    setEntry(''); setFeedback('idle'); setEstimateAccepted(false)
    setEstimateFeedback('Choose a qualitative estimate before exact calculation.')
    setCalculationAccepted(false); setGraphChoice(null); setGraphAccepted(false); setLastDiagnostic(null)
  }, [missionIndex])

  const submitCalculation = (event: FormEvent) => {
    event.preventDefault()
    if (complete || calculationAccepted) return
    const value = Number(entry)
    if (!Number.isFinite(value) || Math.abs(value - mission.answer) > mission.tolerance) {
      setFeedback('wrong')
      const diagnostic = diagnoseMotionAnswer(missionIndex, mission.focusConcept, value)
      setLastDiagnostic(diagnostic); recordDiagnostic(diagnostic)
      if (diagnostic.mathConceptId) recordMathematicsEvidence(diagnostic.mathConceptId, 0.15, 0.15)
      recordAttempt(mission.focusConcept, {}, false)
      return
    }
    mission.calculationEvidence.forEach((evidence) => recordAttempt(evidence.conceptId, evidence.gains, true))
    recordMathematicsEvidence('math-solving-equations', 0.45, 0.65)
    setFeedback('correct'); setCalculationAccepted(true)
    vehicleSimulation.startExperiment(mission.experiment.velocity, mission.experiment.acceleration, mission.experiment.duration, mission.experiment.initialPosition)
  }

  const chooseEstimate = (value: string) => {
    if (estimateAccepted) return
    if (value !== mission.estimate.answer) {
      setEstimateFeedback('That estimate conflicts with the direction or scale of the stated quantities. Re-check before calculating.')
      return
    }
    mission.estimateEvidence?.forEach((evidence) => recordAttempt(evidence.conceptId, evidence.gains, true))
    setEstimateAccepted(true); setEstimateFeedback(mission.estimate.rationale)
    addNotebookEntry({ kind: 'prediction', title: `${mission.title} — estimate`, body: `${value}. ${mission.estimate.rationale}` })
  }

  const chooseGraph = (value: string) => {
    if (!calculationAccepted || graphAccepted) return
    setGraphChoice(value)
    if (value !== mission.graphCheck.answer) {
      const diagnostic: DiagnosticEvent = {
        id: `${Date.now()}-${mission.id}-graph`, conceptId: mission.focusConcept, category: 'graph interpretation error', response: value,
        remediation: 'Use the axes first, then connect the direction and changing slope to the physical motion.', createdAt: new Date().toISOString(),
      }
      setLastDiagnostic(diagnostic); recordDiagnostic(diagnostic); recordAttempt(mission.focusConcept, {}, false)
      return
    }
    mission.graphEvidence.forEach((evidence) => recordAttempt(evidence.conceptId, evidence.gains, true))
    addNotebookEntry({ kind: 'conclusion', title: `${mission.title} — graph evidence`, body: mission.graphCheck.rationale })
    setGraphAccepted(true); setLastDiagnostic(null)
  }

  const advance = () => {
    setEntry(''); setFeedback('idle'); setEstimateAccepted(false)
    setEstimateFeedback('Choose a qualitative estimate before exact calculation.')
    setCalculationAccepted(false); setGraphChoice(null); setGraphAccepted(false); setLastDiagnostic(null)
    completeMotionStep(missionIndex)
  }

  if (complete) return (
    <aside className="mission-panel mission-complete" data-testid="mission-complete">
      <div className="unlock-mark"><Check size={22} /></div><p className="eyebrow">Motion gate / evidence complete</p><h2>The E34 can move.</h2>
      <p>You made four estimates, entered four calculations, and interpreted four position–time graphs. The controlled-stop drive is now available; completing it opens wheel inspection.</p>
      <div className="unlock-list"><span><Check size={15} /> Guided drive unlocked</span><span><Check size={15} /> Motion evidence recorded</span><span><LockKeyhole size={15} /> Wheel sequence follows the drive challenge</span></div>
      <Link className="button button-primary" to="/drive">Continue to controlled drive <ArrowRight size={15} /></Link>
      <button className="button button-quiet" onClick={() => { resetProgress(); resetLearning(); vehicleSimulation.reset() }}><RotateCcw size={15} /> Reset all learning progress</button>
    </aside>
  )

  return (
    <aside className="mission-panel" data-testid={`mission-${missionIndex + 1}`}>
      <div className="mission-progress" aria-label={`Investigation ${missionIndex + 1} of ${motionLessons.length}`}>{motionLessons.map((_, index) => <i key={index} className={index <= missionIndex ? 'active' : ''} />)}</div>
      <p className="eyebrow">{mission.eyebrow}</p><h2>{mission.title}</h2><p className="mission-prompt">{mission.prompt}</p>
      <div className="equation-card"><span>Model A</span><strong>{mission.equation}</strong></div>
      <div className={`estimate-gate ${estimateAccepted ? 'accepted' : ''}`}>
        <span>Physical estimate</span><p>{mission.estimate.prompt}</p><div>{mission.estimate.options.map((option) => <button key={option} type="button" className={estimateAccepted && option === mission.estimate.answer ? 'active' : ''} onClick={() => chooseEstimate(option)}>{option}</button>)}</div><small>{estimateFeedback}</small>
      </div>
      <form className="calculation-entry" onSubmit={submitCalculation}>
        <label htmlFor={`motion-answer-${missionIndex}`}>Your calculated result</label>
        <div><input id={`motion-answer-${missionIndex}`} inputMode="decimal" value={entry} onChange={(event) => setEntry(event.target.value)} disabled={!estimateAccepted || calculationAccepted} autoComplete="off" /><span>{mission.unit}</span><button type="submit" disabled={!estimateAccepted || calculationAccepted}>Check calculation</button></div>
      </form>
      <div className={`mission-feedback ${feedback}`} aria-live="polite">
        {feedback === 'idle' && <><LockKeyhole size={15} /> Estimate first, then enter a numerical result.</>}
        {feedback === 'wrong' && <><strong>{lastDiagnostic?.category ?? 'Check the model'}:</strong> {lastDiagnostic?.remediation ?? 'Re-check each known value.'}</>}
        {feedback === 'correct' && <><Check size={15} /> {mission.explanation}</>}
      </div>
      <div className="instrument-row"><div><span>t</span><strong>{simulation.elapsed.toFixed(1)} s</strong></div><div><span>x</span><strong>{simulation.position.toFixed(1)} m</strong></div><div><span>v</span><strong>{simulation.velocity.toFixed(1)} m/s</strong></div></div>
      <MotionGraph simulation={simulation} />
      {calculationAccepted && <div className={`graph-check ${graphAccepted ? 'accepted' : ''}`}>
        <span>Read the representation</span><p>{mission.graphCheck.prompt}</p>
        <div>{mission.graphCheck.options.map((option) => <button key={option} type="button" className={graphChoice === option ? (graphAccepted ? 'correct' : 'selected') : ''} onClick={() => chooseGraph(option)}>{option}</button>)}</div>
        <small>{graphAccepted ? mission.graphCheck.rationale : lastDiagnostic?.category === 'graph interpretation error' ? lastDiagnostic.remediation : 'Use the plotted shape and labeled axes, not the equation alone.'}</small>
        {graphAccepted && <button className="button graph-continue" type="button" onClick={advance}>Complete investigation <Check size={14} /></button>}
      </div>}
    </aside>
  )
}
