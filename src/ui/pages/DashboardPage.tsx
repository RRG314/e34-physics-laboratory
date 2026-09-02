import { ArrowRight, CircleGauge, FlaskConical, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { useLearnerStore } from '../../store/learnerStore'
import { canAccessTarget } from '../../domain/progressionEngine'

export function DashboardPage() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const mastery = useLearnerStore((state) => state.mastery)
  const unlocked = canAccessTarget('controlled-drive', mastery)
  return (
    <div className="dashboard-page page-fill">
      <LaboratoryScene className="dashboard-scene" />
      <div className="dashboard-overlay">
        <p className="eyebrow">1995 BMW 525i / E34 / US</p>
        <h1>One car.<br />Every layer of physics.</h1>
        <p className="hero-copy">Begin with what the complete vehicle does. Deeper systems reveal themselves only when you can measure and explain the motion.</p>
        <Link className="button button-primary" to="/laboratory">{unlocked ? 'Return to laboratory' : 'Begin motion study'} <ArrowRight size={16} /></Link>
      </div>
      <div className="dashboard-rail">
        <div className="rail-card"><FlaskConical size={18} /><span>Current sequence</span><strong>{unlocked ? 'Wheel motion' : `Motion ${missionIndex + 1}/4`}</strong></div>
        <div className={`rail-card ${unlocked ? '' : 'muted'}`}>{unlocked ? <CircleGauge size={18} /> : <LockKeyhole size={18} />}<span>Guided drive</span><strong>{unlocked ? 'Available' : 'Requires motion'}</strong></div>
      </div>
    </div>
  )
}
