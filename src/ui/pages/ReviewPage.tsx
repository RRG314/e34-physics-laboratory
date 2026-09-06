import { useMemo, useState } from 'react'
import { ArrowRight, Check, Clock3, LockKeyhole, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLabLearningStore } from '../../store/labLearningStore'
import { useLearnerStore } from '../../store/learnerStore'

const questions = [
  { id: 'wheel-motion', domain: 'Wheel + motion', prompt: 'At the same road speed, tire deflection reduces effective circumference. What happens to wheel rpm?', choices: ['It decreases', 'It stays the same', 'It increases'], answer: 'It increases', feedback: 'A smaller distance per revolution requires more revolutions each minute at the same road speed.' },
  { id: 'force-ramp', domain: 'Force + ramp', prompt: 'A car coasts uphill on a steeper ideal ramp. Which pair is correct?', choices: ['Smaller downhill acceleration; longer stop', 'Larger downhill acceleration; shorter stop', 'Same acceleration; same stop'], answer: 'Larger downhill acceleration; shorter stop', feedback: 'Increasing θ increases g sin θ, so velocity falls faster and the uphill stopping distance is shorter.' },
  { id: 'energy', domain: 'Energy', prompt: 'Speed doubles while mass stays fixed. How does kinetic energy change?', choices: ['It doubles', 'It becomes four times larger', 'It stays the same'], answer: 'It becomes four times larger', feedback: 'Kinetic energy contains v², so a factor of two in speed becomes a factor of four in energy.' },
  { id: 'impulse', domain: 'Impulse', prompt: 'The same momentum change occurs over twice the stopping time. What happens to average force?', choices: ['It doubles', 'It is halved', 'It stays the same'], answer: 'It is halved', feedback: 'For fixed impulse, average force and stopping time are inversely proportional.' },
]

export function ReviewPage() {
  const dynamicsMissionIndex = useLearnerStore((state) => state.dynamicsMissionIndex)
  const dueAt = useLearnerStore((state) => state.mechanicsReviewDueAt)
  const previouslyComplete = useLearnerStore((state) => state.mechanicsReviewComplete)
  const completeReview = useLearnerStore((state) => state.completeMechanicsReview)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [reasoning, setReasoning] = useState('')
  const [complete, setComplete] = useState(previouslyComplete)
  const due = Boolean(dueAt && new Date(dueAt).getTime() <= Date.now())
  const correctCount = questions.filter((question) => submitted[question.id] && answers[question.id] === question.answer).length
  const explanationReady = reasoning.trim().split(/\s+/).filter(Boolean).length >= 15
  const ready = correctCount === questions.length && explanationReady
  const dueLabel = useMemo(() => dueAt ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(dueAt)) : '', [dueAt])

  if (dynamicsMissionIndex < 4) return <div className="locked-page page-fill"><div className="locked-card"><LockKeyhole size={28}/><p className="eyebrow">Retention check locked</p><h1>Complete both mechanics paths first.</h1><p>The review deliberately mixes earlier chapters, so it opens only after all eight have been completed.</p><Link className="button button-primary" to="/garage">Return to your path</Link></div></div>
  if (!due) return <div className="locked-page page-fill"><div className="locked-card"><Clock3 size={28}/><p className="eyebrow">Delayed retrieval scheduled</p><h1>Let the first practice settle.</h1><p>Your mixed review opens on {dueLabel}. The delay checks whether you can retrieve relationships after time has passed, rather than immediately copying a recent example.</p><Link className="button button-primary" to="/garage">Review the route map</Link></div></div>

  const record = () => {
    if (!ready || complete) return
    completeReview()
    addNotebookEntry({ kind: 'conclusion', title: 'Delayed mechanics review', body: `Retrieved wheel, motion, ramp, energy, and impulse relationships after the scheduled delay. Learner synthesis: ${reasoning.trim()}` })
    setComplete(true)
    document.querySelector('.review-page')?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const retry = () => { setAnswers({}); setSubmitted({}); setReasoning(''); setComplete(false) }

  return <div className="content-page review-page">
    <header className="content-header"><div><p className="eyebrow">Retention laboratory · mixed retrieval</p><h1>{complete ? 'You completed the delayed review.' : 'Retrieve the model, not the last screen.'}</h1><p>Four changed-context questions mix the full mechanics route. Submit each answer before feedback appears, then explain one connection across chapters.</p></div></header>
    {complete && <section className="path-complete-banner"><Check size={22}/><div><strong>Retention evidence recorded</strong><p>This is practice evidence, not a certificate or accredited assessment. Revisit it whenever you want another retrieval attempt.</p></div><button className="button button-quiet" onClick={retry}><RotateCcw size={14}/> Practice again</button></section>}
    <section className="review-grid">{questions.map((question, index) => {
      const isSubmitted = submitted[question.id]
      const correct = isSubmitted && answers[question.id] === question.answer
      return <article key={question.id} className={correct ? 'correct' : ''}><p className="eyebrow">{String(index + 1).padStart(2, '0')} · {question.domain}</p><h2>{question.prompt}</h2><div>{question.choices.map((choice) => <button key={choice} disabled={isSubmitted} className={answers[question.id] === choice ? 'selected' : ''} onClick={() => setAnswers((current) => ({ ...current, [question.id]: choice }))}>{choice}</button>)}</div><button className="review-submit" disabled={!answers[question.id] || isSubmitted} onClick={() => setSubmitted((current) => ({ ...current, [question.id]: true }))}>Check answer</button>{isSubmitted && <p className={correct ? 'correct-feedback' : 'wrong-feedback'}>{correct ? question.feedback : `Not yet. ${question.feedback} Choose again to make the correction yourself.`}</p>}{isSubmitted && !correct && <button className="review-retry" onClick={() => setSubmitted((current) => ({ ...current, [question.id]: false }))}>Try this question again</button>}</article>
    })}</section>
    <section className="review-synthesis"><p className="eyebrow">Written synthesis</p><h2>Choose two chapters. Explain how changing one variable affects the car in both models.</h2><textarea aria-label="Review written synthesis" value={reasoning} onChange={(event) => setReasoning(event.target.value)} placeholder="For example, connect speed to wheel rpm and kinetic energy, including how each relationship differs."/><small>{explanationReady ? 'Ready to record; human review is still needed to judge the scientific quality.' : 'Write at least 15 words. This is saved as learning evidence and is not automatically graded for correctness.'}</small><button className="button button-primary" disabled={!ready || complete} onClick={record}>Record retention evidence <ArrowRight size={14}/></button></section>
  </div>
}
