import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { MotionMission } from '../MotionMission'
import { LaboratoryTools } from '../LaboratoryTools'
import { useLabLearningStore } from '../../store/labLearningStore'
import { isFoundationMathematicsComplete } from '../../domain/foundationPath'
import { LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { vehicleSimulation } from '../../simulation/vehicleSimulation'

export function LaboratoryPage() {
  const mathematicsMastery = useLabLearningStore((state) => state.mathematicsMastery)
  const mathematicsComplete = isFoundationMathematicsComplete(mathematicsMastery)
  useEffect(() => {
    if (mathematicsComplete) vehicleSimulation.reset('experiment')
  }, [mathematicsComplete])
  if (!mathematicsComplete) return (
    <div className="locked-page page-fill">
      <div className="locked-card">
        <LockKeyhole size={28} />
        <p className="eyebrow">Foundation stage 02 locked</p>
        <h1>Build the wheel model first.</h1>
        <p>The motion investigations depend on signed values, unit conversion, geometry, and graph interpretation. Complete the wheel mathematics chapter so those tools have a concrete meaning before the car moves.</p>
        <Link className="button button-primary" to="/learn">Start wheel mathematics</Link>
      </div>
    </div>
  )
  return (
    <div className="split-page page-fill">
      <div className="lab-stage"><LaboratoryScene sceneMode="experiment" /><LaboratoryTools /></div>
      <MotionMission />
    </div>
  )
}
