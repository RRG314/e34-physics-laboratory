import { useState } from 'react'
import { Check } from 'lucide-react'
import { useLearnerStore } from '../store/learnerStore'

const checks = [
  { title: 'One revolution', prompt: 'For r = 0.323 m, what distance does an ideal wheel advance in one revolution?', equation: 'C = 2πr', options: [1.02, 2.03, 3.23], answer: 2.03, unit: 'm' },
  { title: 'Translation ↔ rotation', prompt: 'At v = 10 m/s with r = 0.323 m, what is the wheel angular speed?', equation: 'ω = v/r', options: [3.1, 31, 310], answer: 31, unit: 'rad/s' },
]

export function WheelCheckpoint() {
  const index = useLearnerStore((state) => state.wheelMissionIndex)
  const complete = useLearnerStore((state) => state.completeWheelStep)
  const recordAttempt = useLearnerStore((state) => state.recordAttempt)
  const [wrong, setWrong] = useState<number | null>(null)
  if (index >= checks.length) return <div className="wheel-check-complete"><Check size={16} /><span>Checkpoint 3 complete</span><strong>Wheel telemetry revealed</strong></div>
  const check = checks[index]
  return (
    <div className="wheel-checkpoint" data-testid={`wheel-check-${index + 1}`}>
      <p className="eyebrow">Wheel sequence {index + 1} / {checks.length}</p>
      <h3>{check.title}</h3>
      <p>{check.prompt}</p>
      <code>{check.equation}</code>
      <div>{check.options.map((option) => <button key={option} className={wrong === option ? 'wrong' : ''} onClick={() => { if (option === check.answer) { setWrong(null); complete(index) } else { setWrong(option); recordAttempt(index === 0 ? 'wheel-circumference' : 'angular-motion', {}, false) } }}><strong>{option}</strong><span>{check.unit}</span></button>)}</div>
    </div>
  )
}
