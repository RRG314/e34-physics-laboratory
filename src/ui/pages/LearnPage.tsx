import { Check, LockKeyhole, Search } from 'lucide-react'
import { useState } from 'react'
import { concepts } from '../../data/curriculum'
import { isConceptAccessible } from '../../domain/curriculumGraph'
import { useLearnerStore } from '../../store/learnerStore'
import { isBroadlyMastered } from '../../domain/mastery'
import { getNextRecommendedConcepts } from '../../domain/progressionEngine'
import { mathematicsConcepts } from '../../data/mathematics'
import { useLabLearningStore } from '../../store/labLearningStore'
import { courseModules, courseStages, vehicleProgression } from '../../data/courseArchitecture'
import { WheelMathLab } from '../WheelMathLab'

const lanes = [
  { label: 'Pre-course foundations', tier: 'foundation' },
  { label: 'High-school physics · 525i', tier: 'tier1' },
] as const

const wheelLabMathematics = new Set(['math-ratios', 'math-unit-conversion', 'math-geometry', 'math-graph-interpretation'])

export function LearnPage() {
  const mastery = useLearnerStore((state) => state.mastery)
  const mastered = concepts.filter((concept) => isBroadlyMastered(mastery[concept.id])).map((concept) => concept.id)
  const recommended = getNextRecommendedConcepts(mastery)
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const demonstratedMathematics = Object.values(mathematicsMastery).filter((evidence) => evidence.conceptual >= 0.6 && evidence.procedural >= 0.6).length
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredConcepts = normalizedQuery ? concepts.filter((concept) => `${concept.title} ${concept.domain} ${concept.vehicleLinks.join(' ')}`.toLowerCase().includes(normalizedQuery)) : concepts
  return (
    <div className="content-page learn-page">
      <header className="content-header"><p className="eyebrow">Course · current assignment</p><h1>Begin with the wheel in front of you.</h1><p>Read a real vehicle marking, turn it into a mathematical model, and find where that model stops matching the physical car. The complete high-school-to-research pathway follows below.</p></header>
      <WheelMathLab />
      <header className="map-subhead"><p className="eyebrow">Coherent course map</p><h2>Start in high school. Grow toward research.</h2><p>The numbered syllabus is the spine; prerequisites are the connective tissue. Lessons, mathematics, experiments, assessments, and vehicle upgrades stay aligned to the same measurable outcomes.</p></header>
      <section className="syllabus-spine">
        <div className="stage-strip">{vehicleProgression.map((stage) => <span key={`${stage.year}-${stage.model}`}><strong>{stage.model}</strong>{stage.year}</span>)}</div>
        <div className="module-list">{courseModules.map((module) => <details key={module.id} open={module.chapter === 1}><summary><span>{String(module.chapter).padStart(2, '0')}</span><div><small>{courseStages.find((stage) => stage.id === module.stage)?.model}</small><strong>{module.title}</strong></div><em>{module.unlock}</em></summary><div className="module-contract"><p><b>Driving question</b>{module.drivingQuestion}</p><p><b>Student can</b>{module.measurableOutcome}</p><p><b>Mathematics</b>{module.mathematics.join(' · ')}</p><p><b>Vehicle investigation</b>{module.investigation}</p><p><b>Misconception check</b>{module.misconception}</p><p><b>Evidence required</b>{module.assessment}</p><small>{module.standards.join(' · ')}</small></div></details>)}</div>
      </section>
      <header className="map-subhead"><p className="eyebrow">Current playable prerequisite slice</p><h2>Motion certification map</h2><p>The detailed course above is the canonical sequence. This graph shows what is currently interactive—not a false claim that every chapter is already built.</p></header>
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
        <header><div><p className="eyebrow">Parallel mathematics graph</p><h2>Just enough mathematics, exactly when needed.</h2><p>Mathematics evidence is tracked separately so a calculation error is not mistaken for a physics misconception.</p></div><span><strong>{demonstratedMathematics}</strong> demonstrated</span></header>
        {(['foundation', 'algebra', 'calculus', 'advanced'] as const).map((tier) => <div className="math-tier" key={tier}><h3>{tier}</h3><div>{mathematicsConcepts.filter((concept) => concept.tier === tier).map((concept) => {
          const evidence = mathematicsMastery[concept.id]
          const demonstrated = Boolean(evidence && evidence.conceptual >= 0.6 && evidence.procedural >= 0.6)
          const implemented = wheelLabMathematics.has(concept.id)
          return <article key={concept.id} className={demonstrated ? 'mastered' : ''}><span>{demonstrated ? <Check size={13} /> : null}{concept.physicsLinks.slice(0, 2).join(' · ')}</span><h4>{concept.title}</h4><p>{concept.contextualModule}</p><small>{concept.prerequisites.length ? `Requires ${concept.prerequisites.join(', ')}` : 'Entry mathematics'}</small>{implemented ? <button onClick={() => document.getElementById('wheel-math-lab')?.scrollIntoView({ behavior: 'smooth' })}>{demonstrated ? 'Review wheel lab' : 'Begin wheel lab'}</button> : <button disabled>Planned · no credit</button>}</article>
        })}</div></div>)}
      </section>
    </div>
  )
}
