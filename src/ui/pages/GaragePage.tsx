import { CheckCircle2, ExternalLink, GitBranch, ShieldCheck, Wrench } from 'lucide-react'
import { lessonBlueprint, upgradeBranches, vehicleProgression } from '../../data/courseArchitecture'

export function GaragePage() {
  return (
    <div className="content-page garage-page">
      <header className="garage-hero">
        <img src={`${import.meta.env.BASE_URL}assets/e34-525i-reference.jpg`} alt="Open-source BMW 525i E34 reference model" />
        <div><p className="eyebrow">The progression is the build</p><h1>Learn it. Certify it. Install it. Prove it.</h1><p>You begin in a stock 525i high-school garage. Physics certifications—not points—unlock tools, parts, and harder test facilities. A modification is useful only when your model predicts whether the surrounding system can support it.</p><div className="garage-loop"><span>01 Learn</span><i /><span>02 Predict</span><i /><span>03 Test</span><i /><span>04 Install</span><i /><span>05 Prove</span></div></div>
      </header>

      <section className="progression-rig"><p className="eyebrow">The real E34 family / a multi-year learning pathway</p><h2>Each vehicle adds a defensible kind of complexity.</h2><div>{vehicleProgression.map((stage) => <article key={`${stage.year}-${stage.model}`} className={stage.model === '525i' ? 'active' : ''}><span>{stage.year}</span><strong>{stage.model}</strong><h3>{stage.system}</h3><p>{stage.learning}</p><small>{stage.reason}</small></article>)}</div><p className="metaphor-note"><ShieldCheck size={15} /> This is a pedagogical progression, not a price, speed, or production chronology. The 525i remains the canonical high-school lab car; 525iX and Touring are branches, and M-Sport is identified as a market-specific package.</p></section>

      <section className="upgrade-section"><header><div><p className="eyebrow">Modification branches</p><h2>Different physics, similar outcomes.</h2><p>Improve stopping, acceleration, or stability through several valid build paths. The compatibility calculation exposes tradeoffs instead of hiding them behind a rarity score.</p></div><GitBranch size={28} /></header><div className="upgrade-grid">{upgradeBranches.map((branch) => <article key={branch.name}><Wrench size={17} /><h3>{branch.name}</h3><span>Parts</span><p>{branch.parts}</p><span>Physics chain</span><p>{branch.concepts}</p><small>{branch.capacity}</small></article>)}</div></section>

      <section className="lesson-contract"><div><p className="eyebrow">Course quality contract</p><h2>No lesson enters the game as an isolated fact card.</h2><p>Every playable chapter must pass this design checklist. This keeps the platform coherent even when the content grows into hundreds of activities.</p></div><ol>{lessonBlueprint.map((item, index) => <li key={item}><CheckCircle2 size={15} /><span><strong>{String(index + 1).padStart(2, '0')}</strong>{item}</span></li>)}</ol></section>

      <section className="asset-credit"><div><p className="eyebrow">Open model R&amp;D</p><h2>A licensed real E34 replaces the homepage’s toy-like render.</h2><p>The current reference image comes from the downloadable “BMW 525i e34 | Project Zomboid” model by Uralvagonzavod, licensed CC BY 4.0. Its 37,890-face asset is the selected interactive-model candidate; the original archive must be obtained through Sketchfab’s authenticated download flow before bundling it.</p></div><a className="button button-quiet" href="https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb" target="_blank" rel="noreferrer">Inspect source model <ExternalLink size={14} /></a></section>
    </div>
  )
}
