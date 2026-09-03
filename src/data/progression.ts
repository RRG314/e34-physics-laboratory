import type { ProgressionTarget } from '../domain/model'

export const progressionTargets: ProgressionTarget[] = [
  {
    id: 'controlled-drive', kind: 'capability', title: 'Controlled vehicle movement',
    description: 'Make the complete E34 move in the guided one-dimensional laboratory.',
    requirements: [
      { conceptId: 'speed', dimension: 'calculationSkill', threshold: 0.65 },
      { conceptId: 'velocity', dimension: 'conceptualUnderstanding', threshold: 0.65 },
      { conceptId: 'acceleration', dimension: 'predictionSkill', threshold: 0.65 },
      { conceptId: 'acceleration', dimension: 'graphInterpretation', threshold: 0.45 },
    ],
    unlockEffect: 'The throttle and brake controls become available.',
  },
  {
    id: 'basic-wheel-inspection', kind: 'capability', title: 'Basic wheel inspection',
    description: 'Select each wheel and measure nominal radius and circumference.',
    requirements: [
      { conceptId: 'speed', dimension: 'conceptualUnderstanding', threshold: 0.6 },
      { conceptId: 'acceleration', dimension: 'predictionSkill', threshold: 0.6 },
      { conceptId: 'wheel-circumference', dimension: 'calculationSkill', threshold: 0.45 },
      { conceptId: 'drive-access', dimension: 'applicationSkill', threshold: 0.6 },
    ],
    unlockEffect: 'After the wheel mathematics and motion path, the four wheels become separate selectable physical systems.',
  },
  {
    id: 'wheel-telemetry', kind: 'instrument', title: 'Wheel rotation telemetry',
    description: 'Inspect angular speed, RPM, revolution count, and no-slip linkage to vehicle speed.',
    requirements: [
      { conceptId: 'wheel-circumference', dimension: 'calculationSkill', threshold: 0.65 },
      { conceptId: 'angular-motion', dimension: 'conceptualUnderstanding', threshold: 0.65 },
      { conceptId: 'angular-motion', dimension: 'predictionSkill', threshold: 0.6 },
    ],
    unlockEffect: 'Live wheel telemetry and the first meaningful exploded view become available.',
  },
  {
    id: 'traction-experiments', kind: 'experiment', title: 'Traction experiments',
    description: 'Vary surface friction and compare requested tire force with available grip.',
    requirements: [
      { conceptId: 'newtons-laws', dimension: 'applicationSkill', threshold: 0.65 },
      { conceptId: 'friction', dimension: 'conceptualUnderstanding', threshold: 0.65 },
      { conceptId: 'angular-motion', dimension: 'applicationSkill', threshold: 0.55 },
    ],
    unlockEffect: 'Road-surface controls and tire-force overlays become available.',
  },
  {
    id: 'drivetrain-torque-path', kind: 'capability', title: 'Drivetrain torque path',
    description: 'Follow torque through gearbox, driveshaft, differential, axles, and driven wheels.',
    requirements: [
      { conceptId: 'torque', dimension: 'applicationSkill', threshold: 0.7 },
      { conceptId: 'angular-motion', dimension: 'applicationSkill', threshold: 0.65 },
      { conceptId: 'friction', dimension: 'conceptualUnderstanding', threshold: 0.6 },
    ],
    unlockEffect: 'The drivetrain becomes visible in Follow Force mode.',
  },
]

export const progressionTargetById = Object.fromEntries(progressionTargets.map((target) => [target.id, target]))
