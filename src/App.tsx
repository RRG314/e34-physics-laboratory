import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './ui/AppShell'
import { DashboardPage } from './ui/pages/DashboardPage'
import { DrivePage } from './ui/pages/DrivePage'
import { ExplorePage } from './ui/pages/ExplorePage'
import { LaboratoryPage } from './ui/pages/LaboratoryPage'
import { LearnPage } from './ui/pages/LearnPage'
import { ReferencePage } from './ui/pages/ReferencePage'
import { ExperimentPage } from './ui/pages/ExperimentPage'
import { NotebookPage } from './ui/pages/NotebookPage'
import { GaragePage } from './ui/pages/GaragePage'
import { TrackLabPage } from './ui/pages/TrackLabPage'
import { useLearnerStore } from './store/learnerStore'
import { useVehicleSimulation } from './hooks/useVehicleSimulation'
import { vehicleSimulation } from './simulation/vehicleSimulation'
import { canAccessTarget } from './domain/progressionEngine'
import { isBroadlyMastered } from './domain/mastery'
import { useLabLearningStore } from './store/labLearningStore'
import { foundationProgress, getNextFoundationStage } from './domain/foundationPath'

declare global {
  interface Window {
    render_game_to_text: () => string
    advanceTime: (ms: number) => void
    __E34_LAB__: { reset: () => void; unlockMotion: () => void }
  }
}

function RuntimeHooks() {
  const location = useLocation()
  const simulation = useVehicleSimulation()
  const mastery = useLearnerStore((state) => state.mastery)
  const missionIndex = useLearnerStore((state) => state.motionMissionIndex)
  const wheelMissionIndex = useLearnerStore((state) => state.wheelMissionIndex)
  const driveChallengeComplete = useLearnerStore((state) => state.driveChallengeComplete)
  const selectedComponentId = useLearnerStore((state) => state.selectedComponentId)
  const resetProgress = useLearnerStore((state) => state.resetProgress)
  const unlockForTesting = useLearnerStore((state) => state.unlockForTesting)
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const diagnostics = useLabLearningStore((state) => state.diagnostics)
  const notebook = useLabLearningStore((state) => state.notebook)
  const modelLevel = useLabLearningStore((state) => state.modelLevel)
  const overlay = useLabLearningStore((state) => state.overlay)
  const resetLearning = useLabLearningStore((state) => state.resetLearning)

  useEffect(() => {
    window.render_game_to_text = () => {
      const liveSimulation = vehicleSimulation.getSnapshot()
      const pathInput = { mathematicsMastery, motionMissionIndex: missionIndex, driveChallengeComplete, wheelMissionIndex }
      const pathProgress = foundationProgress(pathInput)
      const nextStage = getNextFoundationStage(pathInput)
      return JSON.stringify({
      coordinateSystem: 'vehicle +X is forward; world +Y is up; distances are metres; SI units',
      route: location.pathname,
      learner: { foundationPath: { ...pathProgress, nextStage: nextStage?.id ?? null }, motionMissionIndex: missionIndex, driveChallengeComplete, wheelMissionIndex, controlledDriveUnlocked: canAccessTarget('controlled-drive', mastery), wheelInspectionUnlocked: canAccessTarget('basic-wheel-inspection', mastery), wheelTelemetryUnlocked: canAccessTarget('wheel-telemetry', mastery), broadlyMasteredConcepts: Object.values(mastery).filter(isBroadlyMastered).map((entry) => entry.conceptId), selectedComponentId },
      simulation: {
        mode: liveSimulation.mode,
        running: liveSimulation.running,
        time_s: Number(liveSimulation.elapsed.toFixed(3)),
        position_m: Number(liveSimulation.position.toFixed(3)),
        velocity_mps: Number(liveSimulation.velocity.toFixed(3)),
        acceleration_mps2: Number(liveSimulation.acceleration.toFixed(3)),
        wheelAngle_rad: Number(liveSimulation.wheelAngle.toFixed(3)),
        timeScale: liveSimulation.timeScale,
        modelLevel: liveSimulation.modelLevel,
      },
      learningQuality: { mathematicsConceptsWithEvidence: Object.keys(mathematicsMastery), latestDiagnostic: diagnostics[0]?.category ?? null, notebookEntries: notebook.length, selectedModelLevel: modelLevel, activeRepresentation: overlay },
      visibleInteraction: location.pathname === '/laboratory' ? `motion mission ${Math.min(missionIndex + 1, 4)} of 4` : location.pathname === '/drive' ? 'controlled-stop challenge; W/up accelerate; S/down brake; contextual Why path' : location.pathname === '/explore' ? `wheel checkpoint ${Math.min(wheelMissionIndex + 1, 2)} of 2; select one of four wheels` : location.pathname === '/track' ? 'ramp, impact pulse, and ideal drop telemetry sandboxes' : location.pathname === '/garage' ? `Foundation Path ${pathProgress.completed} of ${pathProgress.total}; future paths are dependency-gated plans` : location.pathname === '/learn' ? 'playable wheel mathematics followed by the planned curriculum map' : 'navigation and licensed E34 visual reference',
      })
    }
  }, [location.pathname, mastery, missionIndex, driveChallengeComplete, wheelMissionIndex, selectedComponentId, simulation, mathematicsMastery, diagnostics, notebook.length, modelLevel, overlay])

  useEffect(() => {
    window.advanceTime = (ms) => vehicleSimulation.step(ms / 1000)
    window.__E34_LAB__ = {
      reset: () => { resetProgress(); resetLearning(); vehicleSimulation.reset() },
      unlockMotion: () => unlockForTesting(),
    }
    const onKeyDown = async (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'f') return
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [resetLearning, resetProgress, unlockForTesting])

  useEffect(() => {
    vehicleSimulation.setModelLevel(modelLevel)
  }, [modelLevel])
  return null
}

function AppRoutes() {
  return (
    <>
      <RuntimeHooks />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/track" element={<TrackLabPage />} />
          <Route path="/laboratory" element={<LaboratoryPage />} />
          <Route path="/drive" element={<DrivePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/experiments" element={<ExperimentPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>
}
