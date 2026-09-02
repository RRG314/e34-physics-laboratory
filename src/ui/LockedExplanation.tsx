import { Check, Circle } from 'lucide-react'
import { describeTarget, getMissingPrerequisites, type MasteryMap } from '../domain/progressionEngine'

export function LockedExplanation({ targetId, mastery }: { targetId: string; mastery: MasteryMap }) {
  const target = describeTarget(targetId)
  const missing = getMissingPrerequisites(targetId, mastery)
  if (!target) return null
  return (
    <div className="locked-explanation" data-testid={`locked-${targetId}`}>
      <span>Why is this locked?</span>
      <strong>{target.title}</strong>
      <p>{target.description}</p>
      <div>
        {target.requirements.map((requirement) => {
          const unmet = missing.find((item) => item.conceptId === requirement.conceptId && item.dimension === requirement.dimension)
          return <small key={`${requirement.conceptId}-${requirement.dimension}`} className={unmet ? 'missing' : 'met'}>{unmet ? <Circle size={11} /> : <Check size={11} />}{unmet?.conceptTitle ?? requirement.conceptId.replaceAll('-', ' ')} · {requirement.dimension.replace(/([A-Z])/g, ' $1').toLowerCase()}</small>
        })}
      </div>
      <em>{target.unlockEffect}</em>
    </div>
  )
}
