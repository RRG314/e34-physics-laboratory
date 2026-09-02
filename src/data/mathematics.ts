export interface MathematicsConcept {
  id: string
  title: string
  prerequisites: string[]
  physicsLinks: string[]
  contextualModule: string
  tier: 'foundation' | 'algebra' | 'calculus' | 'advanced'
}

export const mathematicsConcepts: MathematicsConcept[] = [
  { id: 'math-arithmetic', title: 'Arithmetic', prerequisites: [], physicsLinks: ['units', 'distance-time'], contextualModule: 'Read the E34 instrument values and combine measured distances and times.', tier: 'foundation' },
  { id: 'math-fractions', title: 'Fractions', prerequisites: ['math-arithmetic'], physicsLinks: ['speed'], contextualModule: 'Treat speed as distance divided by time.', tier: 'foundation' },
  { id: 'math-ratios', title: 'Ratios', prerequisites: ['math-fractions'], physicsLinks: ['speed', 'angular-motion'], contextualModule: 'Compare road distance to wheel revolutions.', tier: 'foundation' },
  { id: 'math-unit-conversion', title: 'Unit conversion', prerequisites: ['math-ratios'], physicsLinks: ['units', 'velocity', 'angular-motion'], contextualModule: 'Convert the speedometer between km/h and m/s.', tier: 'foundation' },
  { id: 'math-scientific-notation', title: 'Scientific notation', prerequisites: ['math-arithmetic'], physicsLinks: ['electrical'], contextualModule: 'Express sensor and electrical quantities across large scales.', tier: 'foundation' },
  { id: 'math-algebra', title: 'Algebra', prerequisites: ['math-fractions'], physicsLinks: ['velocity', 'acceleration', 'newtons-laws'], contextualModule: 'Rearrange the motion equation using measured E34 data.', tier: 'algebra' },
  { id: 'math-solving-equations', title: 'Solving equations', prerequisites: ['math-algebra'], physicsLinks: ['acceleration', 'newtons-laws', 'torque'], contextualModule: 'Solve F = ma for the unknown vehicle quantity.', tier: 'algebra' },
  { id: 'math-graph-interpretation', title: 'Graph interpretation', prerequisites: ['math-ratios'], physicsLinks: ['position', 'velocity', 'acceleration'], contextualModule: 'Read slope and change from the E34 motion trace.', tier: 'algebra' },
  { id: 'math-geometry', title: 'Geometry', prerequisites: ['math-fractions'], physicsLinks: ['wheel-circumference', 'angular-motion'], contextualModule: 'Use the actual wheel diagram to relate radius, diameter, and circumference.', tier: 'algebra' },
  { id: 'math-trigonometry', title: 'Trigonometry', prerequisites: ['math-geometry', 'math-algebra'], physicsLinks: ['newtons-laws', 'friction'], contextualModule: 'Resolve a wheel-force arrow into longitudinal and vertical components.', tier: 'algebra' },
  { id: 'math-vectors', title: 'Vectors', prerequisites: ['math-trigonometry'], physicsLinks: ['velocity', 'newtons-laws'], contextualModule: 'Compare world, vehicle, and wheel-frame vectors.', tier: 'algebra' },
  { id: 'math-functions', title: 'Functions', prerequisites: ['math-algebra', 'math-graph-interpretation'], physicsLinks: ['velocity', 'acceleration'], contextualModule: 'Treat vehicle position as a function of time.', tier: 'algebra' },
  { id: 'math-exponentials', title: 'Exponentials and logarithms', prerequisites: ['math-functions'], physicsLinks: ['thermodynamics', 'electrical'], contextualModule: 'Fit a cooling or electrical transient.', tier: 'calculus' },
  { id: 'math-derivatives', title: 'Derivatives', prerequisites: ['math-functions'], physicsLinks: ['velocity', 'acceleration'], contextualModule: 'Estimate velocity from a position trace.', tier: 'calculus' },
  { id: 'math-integrals', title: 'Integrals', prerequisites: ['math-derivatives'], physicsLinks: ['velocity', 'energy'], contextualModule: 'Recover distance from the area under a speed trace.', tier: 'calculus' },
  { id: 'math-differential-equations', title: 'Differential equations', prerequisites: ['math-derivatives', 'math-integrals'], physicsLinks: ['thermodynamics', 'waves'], contextualModule: 'Model suspension or cooling state through time.', tier: 'calculus' },
  { id: 'math-linear-algebra', title: 'Linear algebra', prerequisites: ['math-vectors', 'math-functions'], physicsLinks: ['newtons-laws'], contextualModule: 'Represent a coupled vehicle model as states and matrices.', tier: 'advanced' },
  { id: 'math-complex-numbers', title: 'Complex numbers', prerequisites: ['math-trigonometry', 'math-algebra'], physicsLinks: ['waves', 'electrical'], contextualModule: 'Represent oscillation and AC phase.', tier: 'advanced' },
  { id: 'math-fourier-analysis', title: 'Fourier analysis', prerequisites: ['math-integrals', 'math-complex-numbers'], physicsLinks: ['waves'], contextualModule: 'Inspect vibration and engine-audio frequency content.', tier: 'advanced' },
  { id: 'math-numerical-methods', title: 'Numerical methods', prerequisites: ['math-differential-equations'], physicsLinks: ['acceleration'], contextualModule: 'Step and validate a longitudinal vehicle simulation.', tier: 'advanced' },
  { id: 'math-probability', title: 'Probability and statistics', prerequisites: ['math-functions'], physicsLinks: ['units'], contextualModule: 'Summarize repeated wheel-diameter measurements.', tier: 'advanced' },
  { id: 'math-uncertainty', title: 'Uncertainty propagation', prerequisites: ['math-probability', 'math-derivatives'], physicsLinks: ['wheel-circumference', 'angular-motion'], contextualModule: 'Propagate tire-radius uncertainty into predicted wheel RPM.', tier: 'advanced' },
]

export const mathematicsById = Object.fromEntries(mathematicsConcepts.map((concept) => [concept.id, concept]))

export function mathematicsForPhysics(physicsConceptId: string) {
  return mathematicsConcepts.filter((concept) => concept.physicsLinks.includes(physicsConceptId))
}

export function validateMathematicsGraph() {
  const ids = new Set(mathematicsConcepts.map((concept) => concept.id))
  const missing = mathematicsConcepts.flatMap((concept) => concept.prerequisites.filter((id) => !ids.has(id)).map((id) => `${concept.id}:${id}`))
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const cycles: string[] = []
  const visit = (id: string) => {
    if (visiting.has(id)) { cycles.push(id); return }
    if (visited.has(id)) return
    visiting.add(id)
    mathematicsById[id]?.prerequisites.forEach(visit)
    visiting.delete(id)
    visited.add(id)
  }
  mathematicsConcepts.forEach((concept) => visit(concept.id))
  return { valid: missing.length === 0 && cycles.length === 0, missing, cycles }
}
