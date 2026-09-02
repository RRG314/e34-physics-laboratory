import { useState } from 'react'
import { BookOpenCheck, Plus } from 'lucide-react'
import { useLearnerStore } from '../../store/learnerStore'
import { useLabLearningStore } from '../../store/labLearningStore'

const equations = [
  { at: 1, title: 'Displacement', equation: 'Δx = x_f − x_i', units: 'm', assumptions: 'one-dimensional signed coordinate', systems: 'complete vehicle' },
  { at: 2, title: 'Constant speed', equation: 'x = x₀ + vt', units: 'm = m + (m/s)s', assumptions: 'constant velocity', systems: 'complete vehicle' },
  { at: 3, title: 'Average velocity', equation: 'v = Δx / Δt', units: 'm/s', assumptions: 'finite measurement interval', systems: 'complete vehicle' },
  { at: 4, title: 'Constant acceleration', equation: 'v = v₀ + at', units: 'm/s = m/s + (m/s²)s', assumptions: 'constant acceleration', systems: 'complete vehicle' },
  { at: 5, title: 'Rolling constraint', equation: 'v = rω', units: 'm/s = m · rad/s', assumptions: 'rigid wheel, no slip', systems: 'road wheels' },
]

export function NotebookPage() {
  const motionMissionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const notebook = useLabLearningStore((state) => state.notebook)
  const diagnostics = useLabLearningStore((state) => state.diagnostics)
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const [note, setNote] = useState('')
  const equationProgress = motionMissionIndex + (wheelMissionIndex > 0 ? 1 : 0)
  const add = () => { if (note.trim()) { addNotebookEntry({ kind: 'conclusion', title: 'Learner note', body: note.trim() }); setNote('') } }
  return (
    <div className="content-page notebook-page">
      <header className="content-header"><p className="eyebrow">Personal physics notebook</p><h1>Keep the evidence trail.</h1><p>Predictions, measurements, mistakes, corrections, datasets, equations, and conclusions persist locally and can be revisited.</p></header>
      <section className="notebook-compose"><textarea aria-label="New notebook entry" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Record a hypothesis, observation, calculation, or conclusion…" /><button className="button button-primary" onClick={add}><Plus size={15} /> Add entry</button></section>
      <section className="equation-library"><p className="eyebrow">Personal equation library</p><div>{equations.map((item) => {
        const unlocked = item.at <= equationProgress
        return <article key={item.title} className={unlocked ? '' : 'locked'}><span>{unlocked ? 'LEARNED' : 'LOCKED'}</span><h2>{unlocked ? item.title : 'Continue the laboratory'}</h2><code>{unlocked ? item.equation : '—'}</code>{unlocked && <><p>{item.units}</p><small>{item.assumptions} · {item.systems}</small></>}</article>
      })}</div></section>
      <div className="notebook-columns"><section><h2><BookOpenCheck size={18} /> Entries</h2>{notebook.length ? notebook.map((entry) => <article key={entry.id}><span>{entry.kind} · {new Date(entry.createdAt).toLocaleString()}</span><h3>{entry.title}</h3><p>{entry.body}</p></article>) : <p className="empty-copy">No entries yet. Predictions and imported datasets will appear here.</p>}</section><section><h2>Diagnostic trail</h2>{diagnostics.length ? diagnostics.map((event) => <article key={event.id}><span>{event.category}</span><h3>{event.conceptId}</h3><p>{event.remediation}</p>{event.mathConceptId && <small>Just-in-time mathematics: {event.mathConceptId}</small>}</article>) : <p className="empty-copy">No diagnosed errors. Correct numbers alone still do not imply conceptual mastery.</p>}</section></div>
    </div>
  )
}
