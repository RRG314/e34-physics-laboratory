import { BookOpenText, CarFront, FlaskConical, Gauge, LayoutDashboard, Map, Microscope, Network, NotebookPen, ScanLine, Wrench } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLearnerStore } from '../store/learnerStore'
import { canAccessTarget } from '../domain/progressionEngine'

const nav = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/garage', label: 'Garage', icon: Wrench },
  { to: '/learn', label: 'Course', icon: Network },
  { to: '/laboratory', label: 'Lab', icon: FlaskConical },
  { to: '/track', label: 'Track', icon: Map },
  { to: '/drive', label: 'Drive', icon: Gauge, lock: 'controlled-drive' },
  { to: '/explore', label: 'Explore', icon: ScanLine, lock: 'basic-wheel-inspection' },
  { to: '/experiments', label: 'Method', icon: Microscope },
  { to: '/notebook', label: 'Notes', icon: NotebookPen },
  { to: '/reference', label: 'Reference', icon: BookOpenText },
]

export function AppShell() {
  const mastery = useLearnerStore((state) => state.mastery)
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const progress = Math.round((Math.min(missionIndex, 4) / 4) * 100)
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><CarFront size={18} /><strong>E34</strong><span>PHYSICS LABORATORY</span></div>
        <div className="topbar-context"><span className="live-dot" /> HIGH SCHOOL GARAGE · 525i <i /> <span>MODEL A</span></div>
        <div className="progress-chip"><span>Motion gate</span><strong>{progress}%</strong><i><b style={{ width: `${progress}%` }} /></i></div>
      </header>
      <nav className="sidenav" aria-label="Primary">
        {nav.map((item) => {
          const locked = item.lock ? !canAccessTarget(item.lock, mastery) : false
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
      <footer className="app-footer"><span>OBJECTIVE → EXPERIMENT → EVIDENCE → UPGRADE</span><span><kbd>F</kbd> FULLSCREEN</span></footer>
    </div>
  )
}
