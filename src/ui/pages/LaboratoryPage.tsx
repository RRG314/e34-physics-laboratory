import { LaboratoryScene } from '../../scene/LaboratoryScene'
import { MotionMission } from '../MotionMission'
import { LaboratoryTools } from '../LaboratoryTools'

export function LaboratoryPage() {
  return (
    <div className="split-page page-fill">
      <div className="lab-stage"><LaboratoryScene sceneMode="experiment" /><LaboratoryTools /></div>
      <MotionMission />
    </div>
  )
}
