import { ArrowRight, CircleGauge, FlaskConical, LockKeyhole, Ruler, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLearnerStore } from '../../store/learnerStore'
import { canAccessTarget } from '../../domain/progressionEngine'
import { foundationProgress, getNextFoundationStage } from '../../domain/foundationPath'
import { useLabLearningStore } from '../../store/labLearningStore'

export function DashboardPage() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const mastery = useLearnerStore((state) => state.mastery)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const unlocked = canAccessTarget('controlled-drive', mastery)
  const pathInput = { mathematicsMastery, motionMissionIndex: missionIndex, driveChallengeComplete, wheelMissionIndex }
  const nextStage = getNextFoundationStage(pathInput)
  const pathProgress = foundationProgress(pathInput)
  return (
    <div className="dashboard-page page-fill">
      <img className="dashboard-photo" src={`${import.meta.env.BASE_URL}assets/e34-525i-reference.jpg`} alt="Open-source BMW 525i E34 model" />
      <div className="dashboard-shade" />
      <div className="dashboard-overlay">
        <p className="eyebrow">Your first build · High school physics · 525i</p>
        <h1>Build the car<br />by learning why it works.</h1>
        <p className="hero-copy">The playable foundation path connects wheel mathematics, motion graphs, a controlled stop, and live wheel telemetry. Finish one stage to open the next on the same 525i.</p>
        <div className="hero-actions"><Link className="button button-primary" to={nextStage?.route ?? '/garage'}>{nextStage ? `${pathProgress.completed ? 'Continue' : 'Start'}: ${nextStage.title}` : 'Review completed path'} <ArrowRight size={16} /></Link><Link className="button button-light" to="/garage">See the learning path</Link></div>
        <div className="hero-sequence"><span><Ruler size={14} /> Wheel math</span><i /><span><FlaskConical size={14} /> Motion</span><i /><span><CircleGauge size={14} /> Control</span><i /><span><ScanLine size={14} /> Telemetry</span></div>
      </div>
      <div className="dashboard-rail">
        <div className="rail-card"><FlaskConical size={18} /><span>Foundation path · {pathProgress.completed}/{pathProgress.total}</span><strong>{nextStage?.title ?? 'Path complete'}</strong></div>
        <div className={`rail-card ${unlocked ? '' : 'muted'}`}>{unlocked ? <CircleGauge size={18} /> : <LockKeyhole size={18} />}<span>Guided drive</span><strong>{unlocked ? (driveChallengeComplete ? 'Challenge complete' : 'Challenge available') : 'Requires motion'}</strong></div>
      </div>
      <a className="photo-credit" href="https://sketchfab.com/3d-models/bmw-525i-e34-project-zomboid-c65aa3b7687d4f5dbbabdfad0b7816bb" target="_blank" rel="noreferrer">525i model: Uralvagonzavod · CC BY 4.0</a>
    </div>
  )
}
