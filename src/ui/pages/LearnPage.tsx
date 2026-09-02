import { Check, LockKeyhole, Search } from 'lucide-react'
import { useState } from 'react'
import { concepts } from '../../data/curriculum'
import { isConceptAccessible } from '../../domain/curriculumGraph'
import { useLearnerStore } from '../../store/learnerStore'
import { isBroadlyMastered } from '../../domain/mastery'
import { getNextRecommendedConcepts } from '../../domain/progressionEngine'
import { mathematicsConcepts } from '../../data/mathematics'
import { useLabLearningStore } from '../../store/labLearningStore'

const lanes = [
  { label: 'Foundation', tier: 'foundation' },
  { label: 'First-year physics', tier: 'tier1' },
] as const

export function LearnPage() {
  const mastery = useLearnerStore((state) => state.mastery)
  const mastered = concepts.filter((concept) => isBroadlyMastered(mastery[concept.id])).map((concept) => concept.id)
  const recommended = getNextRecommendedConcepts(mastery)
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const recordMathematicsEvidence = useLabLearningStore((state) => state.recordMathematicsEvidence)
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredConcepts = normalizedQuery ? concepts.filter((concept) => `${concept.title} ${concept.domain} ${concept.vehicleLinks.join(' ')}`.toLowerCase().includes(normalizedQuery)) : concepts
  return (
    <div className="content-page learn-page">
      <header className="content-header"><p className="eyebrow">Directed prerequisite map</p><h1>Capability grows from evidence.</h1><p>Only the immediate neighborhood is shown. Mastered ideas stay connected to the vehicle systems they unlock.</p></header>
      <div className="graph-summary"><span><strong>{mastered.length}</strong> broadly mastered</span><span><strong>{recommended.length}</strong> recommended next</span><span><strong>{concepts.length}</strong> mapped in slice</span></div>
      <label className="physics-search"><Search size={16} /><input aria-label="Search physics and vehicle systems" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search velocity, pressure, wheel, differential…" /></label>
      {lanes.map((lane) => (
        <section className="concept-lane" key={lane.tier}>
          <h2>{lane.label}</h2>
          <div className="concept-grid">
            {filteredConcepts.filter((concept) => concept.tier === lane.tier).map((concept) => {
              const complete = mastered.includes(concept.id)
              const accessible = isConceptAccessible(concept, mastered)
              return (
                <article key={concept.id} className={`concept-card ${complete ? 'mastered' : accessible ? 'accessible' : 'locked'}`}>
                  <div className="concept-state">{complete ? <Check size={15} /> : !accessible ? <LockKeyhole size={14} /> : <i />}</div>
                  <span>{concept.domain}</span>
                  <h3>{concept.shortTitle}</h3>
                  <p>{concept.learningGoal}</p>
                  <small>{concept.prerequisites.length ? `Requires: ${concept.prerequisites.join(', ')}` : 'Entry concept'}</small>
                </article>
              )
            })}
          </div>
        </section>
      ))}
      <section className="math-map">
        <header><div><p className="eyebrow">Parallel mathematics graph</p><h2>Just enough mathematics, exactly when needed.</h2><p>Mathematics evidence is tracked separately so a calculation error is not mistaken for a physics misconception.</p></div><span><strong>{Object.keys(mathematicsMastery).length}</strong> with evidence</span></header>
        {(['foundation', 'algebra', 'calculus', 'advanced'] as const).map((tier) => <div className="math-tier" key={tier}><h3>{tier}</h3><div>{mathematicsConcepts.filter((concept) => concept.tier === tier).map((concept) => {
          const evidence = mathematicsMastery[concept.id]
          return <article key={concept.id} className={evidence ? 'mastered' : ''}><span>{evidence ? <Check size={13} /> : null}{concept.physicsLinks.slice(0, 2).join(' · ')}</span><h4>{concept.title}</h4><p>{concept.contextualModule}</p><small>{concept.prerequisites.length ? `Requires ${concept.prerequisites.join(', ')}` : 'Entry mathematics'}</small><button onClick={() => recordMathematicsEvidence(concept.id, 0.6, 0.55)}>Open contextual module</button></article>
        })}</div></div>)}
      </section>
    </div>
  )
}
