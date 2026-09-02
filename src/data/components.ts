import type { VehicleComponent } from '../domain/model'

const basicWheelRequirements = [
  { conceptId: 'speed', dimension: 'conceptualUnderstanding' as const, threshold: 0.6 },
  { conceptId: 'acceleration', dimension: 'predictionSkill' as const, threshold: 0.6 },
]

const deepWheelRequirements = [
  { conceptId: 'wheel-circumference', dimension: 'calculationSkill' as const, threshold: 0.65 },
  { conceptId: 'angular-motion', dimension: 'conceptualUnderstanding' as const, threshold: 0.65 },
  { conceptId: 'angular-motion', dimension: 'predictionSkill' as const, threshold: 0.6 },
]

const wheelAccess = [
  { conceptId: 'wheel-circumference', academicTier: 'tier1' as const, requirements: basicWheelRequirements, depth: 'basic' as const },
  { conceptId: 'angular-motion', academicTier: 'tier1' as const, requirements: deepWheelRequirements, depth: 'intermediate' as const },
]

export const components: VehicleComponent[] = [
  { id: 'vehicle-shell', name: 'Complete vehicle', parentId: null, system: 'vehicle', selectable: true, physicsConcepts: ['position', 'speed', 'velocity', 'acceleration', 'newtons-laws'], explosionVector: [0, 1, 0], explosionDistance: 0, explosionStage: 0, dataStatus: 'PLACEHOLDER' },
  { id: 'body-shell', name: 'Body shell', parentId: 'vehicle-shell', system: 'body', selectable: true, unlockConceptId: 'motion-mastery', physicsConcepts: ['newtons-laws'], explosionVector: [0, 1, 0], explosionDistance: 0.45, explosionStage: 2, dataStatus: 'PLACEHOLDER' },
  { id: 'wheel-fl', name: 'Front-left wheel', parentId: 'vehicle-shell', system: 'running-gear', selectable: true, unlockConceptId: 'motion-mastery', physicsConcepts: ['wheel-circumference', 'angular-motion', 'friction'], explosionVector: [0, 0, 1], explosionDistance: 0.65, explosionStage: 1, serviceRemovalOrder: 1, dataStatus: 'ESTIMATED', conceptAccess: wheelAccess },
  { id: 'wheel-fr', name: 'Front-right wheel', parentId: 'vehicle-shell', system: 'running-gear', selectable: true, unlockConceptId: 'motion-mastery', physicsConcepts: ['wheel-circumference', 'angular-motion', 'friction'], explosionVector: [0, 0, -1], explosionDistance: 0.65, explosionStage: 1, serviceRemovalOrder: 1, dataStatus: 'ESTIMATED', conceptAccess: wheelAccess },
  { id: 'wheel-rl', name: 'Rear-left driven wheel', parentId: 'vehicle-shell', system: 'running-gear', selectable: true, unlockConceptId: 'motion-mastery', physicsConcepts: ['wheel-circumference', 'angular-motion', 'friction', 'torque'], explosionVector: [0, 0, 1], explosionDistance: 0.65, explosionStage: 1, serviceRemovalOrder: 1, dataStatus: 'ESTIMATED', conceptAccess: wheelAccess },
  { id: 'wheel-rr', name: 'Rear-right driven wheel', parentId: 'vehicle-shell', system: 'running-gear', selectable: true, unlockConceptId: 'motion-mastery', physicsConcepts: ['wheel-circumference', 'angular-motion', 'friction', 'torque'], explosionVector: [0, 0, -1], explosionDistance: 0.65, explosionStage: 1, serviceRemovalOrder: 1, dataStatus: 'ESTIMATED', conceptAccess: wheelAccess },
  { id: 'tire-contact-patches', name: 'Tire contact patches', parentId: 'vehicle-shell', system: 'running-gear', selectable: false, unlockConceptId: 'angular-motion', physicsConcepts: ['friction', 'newtons-laws'], explosionVector: [0, 0, 0], explosionDistance: 0, explosionStage: 0, dataStatus: 'ESTIMATED' },
  { id: 'differential', name: 'Rear differential', parentId: 'vehicle-shell', system: 'drivetrain', selectable: true, unlockConceptId: 'torque', physicsConcepts: ['angular-motion', 'torque'], explosionVector: [-0.3, 0, 0], explosionDistance: 0.45, explosionStage: 2, dataStatus: 'PLACEHOLDER' },
]

export const componentById = Object.fromEntries(components.map((component) => [component.id, component]))
