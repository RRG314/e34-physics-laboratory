import { ArrowRight, Check, CheckCircle2, Circle, ExternalLink, GitBranch, LockKeyhole, ShieldCheck, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { lessonBlueprint, upgradeBranches, vehicleProgression } from '../../data/courseArchitecture'
import { foundationProgress, getFoundationPath } from '../../domain/foundationPath'
import { getDynamicsPath, getNextHighSchoolStage, highSchoolProgress } from '../../domain/highSchoolPath'
import { useLabLearningStore } from '../../store/labLearningStore'
import { useLearnerStore } from '../../store/learnerStore'

const futurePaths = [
  {
    number: '03', title: 'Rotation, traction, and a first modification', status: 'Planned',
    starts: 'Starts after expert review and learner testing of the two playable paths.',
    scope: 'Torque, gear ratios, tire force limits, rotational inertia, and one bounded wheel or final-drive trade study.',
  },
  {
    number: '04', title: 'Thermal, fluid, electrical, and vibration systems', status: 'Research mapped',
    starts: 'Starts subsystem-by-subsystem only when reliable 525i data and a defensible model are available.',
    scope: 'Brakes and cooling, fuel and pressure, circuits and sensing, springs, damping, vibration, and sound.',
  },
]

export function GaragePage() {
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const motionMissionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const dynamicsMissionIndex = useLearnerStore((state) => state.dynamicsMissionIndex)
  const input = { mathematicsMastery, motionMissionIndex, driveChallengeComplete, wheelMissionIndex, dynamicsMissionIndex }
  const stages = getFoundationPath(input)
  const dynamicsStages = getDynamicsPath(input)
  const foundation = foundationProgress(input)
  const progress = highSchoolProgress(input)
  const current = getNextHighSchoolStage(input)

  return (
    <div className="content-page garage-page">
      <header className="path-hero">
        <div><p className="eyebrow">Current release · one supported 525i</p><h1>Your usable path starts here.</h1><p>Eight connected chapters now form two complete high-school mechanics paths. Each chapter records separate prediction, calculation, and representation evidence before it opens the next.</p>{current ? <Link className="button button-primary" to={current.route}>Continue: {current.title} <ArrowRight size={15} /></Link> : <Link className="button button-primary" to="/learn">Review the completed route <ArrowRight size={15} /></Link>}</div>
        <div className="path-meter"><span>High-school mechanics</span><strong>{progress.completed}<i>/ {progress.total}</i></strong><p>{current ? `Next: ${current.title}` : 'Both playable paths complete'}</p><div><i style={{ width: `${progress.percent}%` }} /></div></div>
      </header>

      <section className="foundation-path" aria-label="Foundation learning path">
        <header><div><p className="eyebrow">Path 01 · Playable now · {foundation.completed}/4</p><h2>Measurement and motion foundations.</h2></div><p>The same 525i moves from measurement to motion, then control, then wheel rotation. Locked stages name what is missing instead of pretending unfinished content is available.</p></header>
        <div className="foundation-stage-grid">{stages.map((stage) => {
          const state = stage.complete ? 'complete' : stage.available ? 'current' : 'locked'
          return <article key={stage.id} className={state}>
            <div className="stage-state"><span>{String(stage.number).padStart(2, '0')}</span>{state === 'complete' ? <Check size={17} /> : state === 'locked' ? <LockKeyhole size={16} /> : <Circle size={16} />}</div>
            <small>{state === 'complete' ? 'Complete' : state === 'current' ? 'Available now' : 'Requires the previous stage'}</small>
            <h3>{stage.title}</h3><p>{stage.description}</p><strong>{stage.outcome}</strong>
            {stage.available ? <Link to={stage.route}>{stage.complete ? 'Review stage' : 'Open stage'} <ArrowRight size={13} /></Link> : <span className="locked-label">Not yet available</span>}
          </article>
        })}</div>
      </section>

      <section className="foundation-path dynamics-path" aria-label="Forces and energy learning path">
        <header><div><p className="eyebrow">Path 02 · Playable now · {dynamicsMissionIndex}/4</p><h2>Forces, ramps, energy, and momentum.</h2></div><p>Every chapter starts with a qualitative prediction, develops the required mathematics, reveals a graph, and ends with a conclusion saved to the notebook.</p></header>
        <div className="foundation-stage-grid">{dynamicsStages.map((stage) => {
          const state = stage.complete ? 'complete' : stage.available ? 'current' : 'locked'
          return <article key={stage.id} className={state}>
            <div className="stage-state"><span>{String(stage.number).padStart(2, '0')}</span>{state === 'complete' ? <Check size={17} /> : state === 'locked' ? <LockKeyhole size={16} /> : <Circle size={16} />}</div>
            <small>{state === 'complete' ? 'Complete' : state === 'current' ? 'Available now' : stage.number === 5 ? 'Requires Path 01' : 'Requires the previous chapter'}</small>
            <h3>{stage.title}</h3><p>{stage.description}</p><strong>{stage.outcome}</strong>
            {stage.available ? <Link to={stage.route}>{stage.complete ? 'Review chapter' : 'Open chapter'} <ArrowRight size={13} /></Link> : <span className="locked-label">Not yet available</span>}
          </article>
        })}</div>
      </section>

      <section className="future-paths"><header><div><p className="eyebrow">What comes after the playable mechanics route</p><h2>Build order is based on prerequisites and evidence.</h2></div><p>No release dates are invented here. A path starts when its prerequisite learning works, its vehicle claims have sources, and its simulation can be checked.</p></header><div>{futurePaths.map((path) => <article key={path.number}><span>{path.number}</span><div><small>{path.status}</small><h3>{path.title}</h3><p>{path.scope}</p><strong>{path.starts}</strong></div></article>)}</div></section>

      <section className="progression-rig"><p className="eyebrow">Planned academic depth · not five playable levels</p><h2>The same car can support deeper models later.</h2><div>{vehicleProgression.map((stage) => <article key={`${stage.year}-${stage.model}`} className={stage.year === 'High school foundations' ? 'active' : ''}><span>{stage.year}</span><strong>{stage.model}</strong><h3>{stage.system}</h3><p>{stage.learning}</p><small>{stage.reason}</small></article>)}</div><p className="metaphor-note"><ShieldCheck size={15} /> Only the 1995 US manual 525i sedan is an active teaching vehicle. Other E34s remain research candidates until their exact data and redistributable visuals pass the admission gate.</p></section>

      <section className="upgrade-section"><header><div><p className="eyebrow">Planned modification branches</p><h2>Modifications arrive after their physics.</h2><p>These are curriculum directions, not currently installable parts. Each branch depends on measurements, prerequisite concepts, and a compatibility calculation.</p></div><GitBranch size={28} /></header><div className="upgrade-grid">{upgradeBranches.map((branch) => <article key={branch.name}><Wrench size={17} /><h3>{branch.name}</h3><span>Parts</span><p>{branch.parts}</p><span>Physics chain</span><p>{branch.concepts}</p><small>{branch.capacity}</small></article>)}</div></section>

      <section className="lesson-contract"><div><p className="eyebrow">Course quality contract</p><h2>What “complete” must mean for every future chapter.</h2><p>A topic does not become playable because it has a page or formula. It must connect prerequisite diagnosis, instruction, prediction, interaction, feedback, evidence, and transfer.</p></div><ol>{lessonBlueprint.map((item, index) => <li key={item}><CheckCircle2 size={15} /><span><strong>{String(index + 1).padStart(2, '0')}</strong>{item}</span></li>)}</ol></section>

      <section className="asset-credit"><div><p className="eyebrow">Release boundary</p><h2>One 525i across the whole course.</h2><p>The interactive car and homepage image are adapted from “BMW 525i e34 | Project Zomboid” by Uralvagonzavod under CC BY 4.0. The same car remains with the learner at every level. Other E34 models are future expansion work and do not appear as teaching vehicles in this release.</p></div><a className="button button-quiet" href="https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb" target="_blank" rel="noreferrer">Inspect source model <ExternalLink size={14} /></a></section>
    </div>
  )
}
