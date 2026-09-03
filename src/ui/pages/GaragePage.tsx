import { CheckCircle2, ExternalLink, GitBranch, ShieldCheck, Wrench } from 'lucide-react'
import { lessonBlueprint, upgradeBranches, vehicleProgression } from '../../data/courseArchitecture'

export function GaragePage() {
  return (
    <div className="content-page garage-page">
      <header className="garage-hero">
        <img src={`${import.meta.env.BASE_URL}assets/e34-525i-reference.jpg`} alt="Open-source BMW 525i E34 reference model" />
        <div><p className="eyebrow">The progression is the build</p><h1>Learn it. Test it. Use it. Prove it.</h1><p>You begin in a stock 525i high-school garage. Demonstrated skills—not points—open tools, parts, and harder test facilities. A modification is useful only when your model predicts whether the surrounding system can support it.</p><div className="garage-loop"><span>01 Learn</span><i /><span>02 Predict</span><i /><span>03 Test</span><i /><span>04 Install</span><i /><span>05 Prove</span></div></div>
      </header>

      <section className="progression-rig"><p className="eyebrow">One supported car / increasing model depth</p><h2>The physics advances before the badge changes.</h2><div>{vehicleProgression.map((stage) => <article key={`${stage.year}-${stage.model}`} className={stage.year === 'High school foundations' ? 'active' : ''}><span>{stage.year}</span><strong>{stage.model}</strong><h3>{stage.system}</h3><p>{stage.learning}</p><small>{stage.reason}</small></article>)}</div><p className="metaphor-note"><ShieldCheck size={15} /> Only the 1995 US manual 525i sedan is an active teaching vehicle. Other E34s remain research candidates until their exact data and redistributable visuals pass the admission gate.</p></section>

      <section className="upgrade-section"><header><div><p className="eyebrow">Modification branches</p><h2>Different physics, similar outcomes.</h2><p>Improve stopping, acceleration, or stability through several valid build paths. The compatibility calculation exposes tradeoffs instead of hiding them behind a rarity score.</p></div><GitBranch size={28} /></header><div className="upgrade-grid">{upgradeBranches.map((branch) => <article key={branch.name}><Wrench size={17} /><h3>{branch.name}</h3><span>Parts</span><p>{branch.parts}</p><span>Physics chain</span><p>{branch.concepts}</p><small>{branch.capacity}</small></article>)}</div></section>

      <section className="lesson-contract"><div><p className="eyebrow">Course quality contract</p><h2>No lesson enters the game as an isolated fact card.</h2><p>Every playable chapter must pass this design checklist. This keeps the platform coherent even when the content grows into hundreds of activities.</p></div><ol>{lessonBlueprint.map((item, index) => <li key={item}><CheckCircle2 size={15} /><span><strong>{String(index + 1).padStart(2, '0')}</strong>{item}</span></li>)}</ol></section>

      <section className="asset-credit"><div><p className="eyebrow">Release boundary</p><h2>One 525i across the whole course.</h2><p>The interactive car and homepage image are adapted from “BMW 525i e34 | Project Zomboid” by Uralvagonzavod under CC BY 4.0. The same car remains with the learner at every level. Other E34 models are future expansion work and do not appear as teaching vehicles in the first production release.</p></div><a className="button button-quiet" href="https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb" target="_blank" rel="noreferrer">Inspect source model <ExternalLink size={14} /></a></section>
    </div>
  )
}
