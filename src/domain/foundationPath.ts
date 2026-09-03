export interface MathematicsEvidenceLike {
  conceptual: number
  procedural: number
}

export interface FoundationPathInput {
  mathematicsMastery: Record<string, MathematicsEvidenceLike>
  motionMissionIndex: number
  driveChallengeComplete: boolean
  wheelMissionIndex: number
}

export interface FoundationPathStage {
  id: 'wheel-mathematics' | 'motion' | 'controlled-drive' | 'wheel-telemetry'
  number: number
  title: string
  description: string
  route: string
  complete: boolean
  available: boolean
  outcome: string
}

export const foundationMathematicsRequirements = [
  'math-ratios',
  'math-unit-conversion',
  'math-geometry',
  'math-graph-interpretation',
] as const

export function isFoundationMathematicsComplete(mathematicsMastery: FoundationPathInput['mathematicsMastery']) {
  return foundationMathematicsRequirements.every((id) => {
    const evidence = mathematicsMastery[id]
    return Boolean(evidence && evidence.conceptual >= 0.6 && evidence.procedural >= 0.6)
  })
}

export function getFoundationPath(input: FoundationPathInput): FoundationPathStage[] {
  const mathematicsComplete = isFoundationMathematicsComplete(input.mathematicsMastery)
  const motionComplete = input.motionMissionIndex >= 4
  const driveComplete = input.driveChallengeComplete
  const wheelsComplete = input.wheelMissionIndex >= 2

  return [
    {
      id: 'wheel-mathematics', number: 1, title: 'Measure and model a wheel', route: '/learn',
      description: 'Decode a tire, calculate its geometry and wheel speed, then explain why a loaded model differs.',
      complete: mathematicsComplete, available: true, outcome: 'Ratios · units · geometry · graph interpretation',
    },
    {
      id: 'motion', number: 2, title: 'Describe complete-car motion', route: '/laboratory',
      description: 'Predict, calculate, observe, and interpret displacement, speed, velocity, and acceleration.',
      complete: motionComplete, available: mathematicsComplete, outcome: 'Four motion investigations · guided drive access',
    },
    {
      id: 'controlled-drive', number: 3, title: 'Control and stop the 525i', route: '/drive',
      description: 'Use the motion model to reach a target speed, then stop inside a measured distance window.',
      complete: driveComplete, available: mathematicsComplete && motionComplete, outcome: 'Control input · live state · changed-motion application',
    },
    {
      id: 'wheel-telemetry', number: 4, title: 'Connect road motion to wheel rotation', route: '/explore',
      description: 'Select a wheel, test circumference and angular speed, then use live rotational telemetry.',
      complete: wheelsComplete, available: mathematicsComplete && motionComplete && driveComplete, outcome: 'Selectable wheels · RPM · revolutions · exploded view',
    },
  ]
}

export function getNextFoundationStage(input: FoundationPathInput) {
  const stages = getFoundationPath(input)
  return stages.find((stage) => !stage.complete) ?? null
}

export function foundationProgress(input: FoundationPathInput) {
  const stages = getFoundationPath(input)
  const completed = stages.filter((stage) => stage.complete).length
  return { completed, total: stages.length, percent: Math.round(completed / stages.length * 100) }
}
