import { ArrowRight, BookOpenCheck, CircleGauge, FlaskConical, LockKeyhole, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLearnerStore } from '../../store/learnerStore'
import { canAccessTarget } from '../../domain/progressionEngine'

export function DashboardPage() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const mastery = useLearnerStore((state) => state.mastery)
  const unlocked = canAccessTarget('controlled-drive', mastery)
  return (
    <div className="dashboard-page page-fill">
      <img className="dashboard-photo" src={`${import.meta.env.BASE_URL}assets/e34-525i-reference.jpg`} alt="Open-source BMW 525i E34 model" />
      <div className="dashboard-shade" />
      <div className="dashboard-overlay">
        <p className="eyebrow">Your first build · High school physics · 525i</p>
        <h1>Build the car<br />by learning why it works.</h1>
        <p className="hero-copy">Earn physics certifications in short investigations. Use them to install compatible parts, then prove the build on an instrumented track. Every graph, equation, and upgrade belongs to the same car.</p>
        <div className="hero-actions"><Link className="button button-primary" to="/garage">Enter your garage <ArrowRight size={16} /></Link><Link className="button button-light" to="/track">Open proving ground</Link></div>
        <div className="hero-sequence"><span><BookOpenCheck size={14} /> Learn</span><i /><span><FlaskConical size={14} /> Test</span><i /><span><Wrench size={14} /> Install</span><i /><span><CircleGauge size={14} /> Prove</span></div>
      </div>
      <div className="dashboard-rail">
        <div className="rail-card"><FlaskConical size={18} /><span>Current certification</span><strong>{unlocked ? 'Wheel motion' : `Motion ${missionIndex + 1}/4`}</strong></div>
        <div className={`rail-card ${unlocked ? '' : 'muted'}`}>{unlocked ? <CircleGauge size={18} /> : <LockKeyhole size={18} />}<span>Guided drive</span><strong>{unlocked ? 'Available' : 'Requires motion'}</strong></div>
      </div>
      <a className="photo-credit" href="https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb" target="_blank" rel="noreferrer">525i model: Uralvagonzavod · CC BY 4.0</a>
    </div>
  )
}
