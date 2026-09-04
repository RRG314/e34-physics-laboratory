import { Check, LockKeyhole, Search } from 'lucide-react'
import { useState } from 'react'
import { concepts } from '../../data/curriculum'
import { isConceptAccessible } from '../../domain/curriculumGraph'
import { useLearnerStore } from '../../store/learnerStore'
import { isBroadlyMastered } from '../../domain/mastery'
import { getNextRecommendedConcepts } from '../../domain/progressionEngine'
import { mathematicsConcepts, type MathematicsTier } from '../../data/mathematics'
import { useLabLearningStore } from '../../store/labLearningStore'
import { courseModules, curriculumLevels } from '../../data/courseArchitecture'
import { WheelMathLab } from '../WheelMathLab'
import { useNavigate } from 'react-router-dom'

const lanes = [
  { label: 'Pre-course foundations', tier: 'foundation' },
  { label: 'High-school physics · 525i', tier: 'tier1' },
] as const

const wheelLabMathematics = new Set(['math-ratios', 'math-unit-conversion', 'math-geometry', 'math-graph-interpretation'])
const dynamicsMathematics = new Set(['math-algebra', 'math-solving-equations', 'math-trigonometry', 'math-vectors', 'math-quadratics'])
const mathTiers: { id: MathematicsTier; label: string }[] = [
  { id: 'foundation', label: 'Foundations' },
  { id: 'algebra', label: 'Algebra & functions' },
  { id: 'precalculus', label: 'Precalculus' },
  { id: 'calculus', label: 'Calculus' },
  { id: 'systems', label: 'Systems mathematics' },
  { id: 'research', label: 'Research mathematics' },
]

export function LearnPage() {
  const navigate = useNavigate()
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
      <header className="map-subhead"><p className="eyebrow">Integrated mathematics + physics</p><h2>Learn the mathematics when the physical question gives it meaning.</h2><p>Essential readiness skills come first. New mathematics is then developed inside a 525i investigation, practiced in a short focused studio, and used again for prediction, measurement, and transfer. Mathematics and physics evidence remain separate so feedback can identify the real gap.</p></header>
      <section className="integration-loop" aria-label="Integrated lesson sequence"><span><b>01</b> Check readiness</span><i /><span><b>02</b> Observe and model</span><i /><span><b>03</b> Build the mathematics</span><i /><span><b>04</b> Predict and test</span><i /><span><b>05</b> Explain and transfer</span></section>
      <section className="syllabus-spine">
        <div className="stage-strip">{curriculumLevels.map((level) => <span key={level.id}><strong>{level.model}</strong>{level.label}<small>{level.mathematics}</small></span>)}</div>
        <div className="module-list">{courseModules.map((module) => <details key={module.id} open={module.chapter === 1}><summary><span>{String(module.chapter).padStart(2, '0')}</span><div><small>{module.vehicleSystems}</small><strong>{module.title}</strong></div><em>Five depth treatments</em></summary><div className="integrated-module"><p className="module-question"><b>Driving question</b>{module.drivingQuestion}</p><div className="depth-grid">{module.depths.map((depth) => {
          const level = curriculumLevels.find((item) => item.id === depth.level)
          return <article key={depth.level}><small>{level?.label}</small><h4>{depth.physics}</h4><p><b>Mathematics</b>{depth.mathematics.join(' · ')}</p><p><b>525i mission</b>{depth.vehicleMission}</p><p><b>Evidence</b>{depth.evidence}</p><span>{depth.unlock}</span></article>
        })}</div></div></details>)}</div>
      </section>
      <header className="map-subhead"><p className="eyebrow">Current playable prerequisite slice</p><h2>Motion learning map</h2><p>The detailed course above is the canonical sequence. This graph shows what is currently interactive—not a false claim that every chapter is already built.</p></header>
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
        {mathTiers.map((tier) => <div className="math-tier" key={tier.id}><h3>{tier.label}</h3><div>{mathematicsConcepts.filter((concept) => concept.tier === tier.id).map((concept) => {
          const evidence = mathematicsMastery[concept.id]
          const demonstrated = Boolean(evidence && evidence.conceptual >= 0.6 && evidence.procedural >= 0.6)
          const wheelImplemented = wheelLabMathematics.has(concept.id)
          const dynamicsImplemented = dynamicsMathematics.has(concept.id)
          return <article key={concept.id} className={demonstrated ? 'mastered' : ''}><span>{demonstrated ? <Check size={13} /> : null}{concept.physicsLinks.slice(0, 2).join(' · ')}</span><h4>{concept.title}</h4><p>{concept.contextualModule}</p><small>{concept.prerequisites.length ? `Requires ${concept.prerequisites.join(', ')}` : 'Entry mathematics'}</small>{wheelImplemented ? <button onClick={() => document.getElementById('wheel-math-lab')?.scrollIntoView({ behavior: 'smooth' })}>{demonstrated ? 'Review wheel lab' : 'Begin wheel lab'}</button> : dynamicsImplemented ? <button onClick={() => navigate('/track')}>{demonstrated ? 'Review Path 02' : 'Learn in Path 02'}</button> : <button disabled>Planned · no credit</button>}</article>
        })}</div></div>)}
      </section>
    </div>
  )
}
