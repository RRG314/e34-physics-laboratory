import { BookOpenText, CarFront, FlaskConical, Gauge, LayoutDashboard, Map, Microscope, Network, NotebookPen, ScanLine, Wrench } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLearnerStore } from '../store/learnerStore'
import { getFoundationPath, type FoundationPathStage } from '../domain/foundationPath'
import { highSchoolProgress, isFoundationPathComplete } from '../domain/highSchoolPath'
import { useLabLearningStore } from '../store/labLearningStore'

const nav = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/garage', label: 'Path', icon: Wrench },
  { to: '/learn', label: 'Curriculum', icon: Network, stage: 'wheel-mathematics' },
  { to: '/laboratory', label: 'Lesson', icon: FlaskConical, stage: 'motion' },
  { to: '/drive', label: 'Drive', icon: Gauge, stage: 'controlled-drive' },
  { to: '/explore', label: 'Explore', icon: ScanLine, stage: 'wheel-telemetry' },
  { to: '/track', label: 'Forces', icon: Map, requiresFoundation: true },
  { to: '/experiments', label: 'Research', icon: Microscope },
  { to: '/notebook', label: 'Notes', icon: NotebookPen },
  { to: '/reference', label: 'Sources', icon: BookOpenText },
]

export function AppShell() {
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const dynamicsMissionIndex = useLearnerStore((state) => state.dynamicsMissionIndex)
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const pathInput = { mathematicsMastery, motionMissionIndex: missionIndex, driveChallengeComplete, wheelMissionIndex, dynamicsMissionIndex }
  const progress = highSchoolProgress(pathInput)
  const stages = getFoundationPath(pathInput)
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><CarFront size={18} /><strong>E34</strong><span>PHYSICS LABORATORY</span></div>
        <div className="topbar-context"><span className="live-dot" /> HIGH-SCHOOL MECHANICS · 525i <i /> <span>MODEL A</span></div>
        <div className="progress-chip"><span>Path {progress.completed}/{progress.total}</span><strong>{progress.percent}%</strong><i><b style={{ width: `${progress.percent}%` }} /></i></div>
      </header>
      <nav className="sidenav" aria-label="Primary">
        {nav.map((item) => {
          const stage = 'stage' in item ? stages.find((candidate) => candidate.id === item.stage as FoundationPathStage['id']) : undefined
          const locked = Boolean((stage && !stage.available) || ('requiresFoundation' in item && item.requiresFoundation && !isFoundationPathComplete(pathInput)))
          return (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `${isActive ? 'active' : ''} ${locked ? 'nav-locked' : ''}`}>
              <item.icon size={19} />
              <span>{item.label}</span>
              {locked && <i className="nav-lock-dot" />}
            </NavLink>
          )
        })}
      </nav>
      <main className="app-main"><Outlet /></main>
    </div>
  )
}
