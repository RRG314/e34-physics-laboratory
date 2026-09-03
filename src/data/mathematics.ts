export type MathematicsTier = 'foundation' | 'algebra' | 'precalculus' | 'calculus' | 'systems' | 'research'

export interface MathematicsConcept {
  id: string
  title: string
  prerequisites: string[]
  physicsLinks: string[]
  contextualModule: string
  tier: MathematicsTier
}

/** Mathematics remains independently diagnosable even when it is learned in a physics mission. */
export const mathematicsConcepts: MathematicsConcept[] = [
  { id: 'math-arithmetic', title: 'Arithmetic and estimation', prerequisites: [], physicsLinks: ['units', 'distance-time'], contextualModule: 'Read instruments, estimate scale, and check whether a result is physically plausible.', tier: 'foundation' },
  { id: 'math-fractions', title: 'Fractions and decimals', prerequisites: ['math-arithmetic'], physicsLinks: ['speed'], contextualModule: 'Interpret parts of a revolution, elapsed time, and measurement resolution.', tier: 'foundation' },
  { id: 'math-ratios', title: 'Ratios and proportional reasoning', prerequisites: ['math-fractions'], physicsLinks: ['speed', 'angular-motion'], contextualModule: 'Relate road distance, elapsed time, wheel revolutions, and gear ratios.', tier: 'foundation' },
  { id: 'math-unit-conversion', title: 'Units and dimensional reasoning', prerequisites: ['math-ratios'], physicsLinks: ['units', 'velocity', 'angular-motion'], contextualModule: 'Convert quantities while using dimensions to reject impossible equations.', tier: 'foundation' },
  { id: 'math-signed-quantities', title: 'Signed quantities and coordinates', prerequisites: ['math-arithmetic'], physicsLinks: ['position', 'displacement', 'velocity'], contextualModule: 'Choose an origin and distinguish reversing direction from slowing down.', tier: 'foundation' },
  { id: 'math-scientific-notation', title: 'Scientific notation and scale', prerequisites: ['math-arithmetic'], physicsLinks: ['electrical'], contextualModule: 'Compare sensor, electrical, thermal, and mechanical quantities across scales.', tier: 'foundation' },
  { id: 'math-geometry', title: 'Geometry, area, and volume', prerequisites: ['math-fractions'], physicsLinks: ['wheel-circumference', 'angular-motion'], contextualModule: 'Relate radius, diameter, circumference, tank volume, and contact area.', tier: 'foundation' },
  { id: 'math-data-basics', title: 'Tables, graphs, mean, and spread', prerequisites: ['math-arithmetic'], physicsLinks: ['units', 'position', 'velocity'], contextualModule: 'Summarize repeated measurements and coordinate tables with graphs.', tier: 'foundation' },

  { id: 'math-algebra', title: 'Variables and algebraic structure', prerequisites: ['math-fractions', 'math-signed-quantities'], physicsLinks: ['velocity', 'acceleration', 'newtons-laws'], contextualModule: 'Name changing quantities and explain the structure of a vehicle equation.', tier: 'algebra' },
  { id: 'math-solving-equations', title: 'Solving and rearranging equations', prerequisites: ['math-algebra'], physicsLinks: ['acceleration', 'newtons-laws', 'torque'], contextualModule: 'Solve a physical relationship for different unknown quantities without losing units.', tier: 'algebra' },
  { id: 'math-linear-models', title: 'Linear models, slope, and intercept', prerequisites: ['math-algebra', 'math-data-basics'], physicsLinks: ['position', 'velocity', 'acceleration'], contextualModule: 'Interpret slope and intercept in an instrumented motion or calibration graph.', tier: 'algebra' },
  { id: 'math-functions', title: 'Functions and covariation', prerequisites: ['math-solving-equations', 'math-linear-models'], physicsLinks: ['velocity', 'acceleration', 'thermodynamics'], contextualModule: 'Treat one vehicle quantity as a function of another and state a meaningful domain.', tier: 'algebra' },
  { id: 'math-quadratics', title: 'Quadratic relationships', prerequisites: ['math-functions'], physicsLinks: ['acceleration', 'energy'], contextualModule: 'Connect constant acceleration and kinetic energy to curved graphs and squared terms.', tier: 'algebra' },
  { id: 'math-systems', title: 'Systems and inequalities', prerequisites: ['math-solving-equations'], physicsLinks: ['newtons-laws', 'electrical'], contextualModule: 'Solve connected force or circuit constraints and identify a feasible operating region.', tier: 'algebra' },
  { id: 'math-graph-interpretation', title: 'Graph interpretation and graph area', prerequisites: ['math-linear-models'], physicsLinks: ['position', 'velocity', 'acceleration', 'energy'], contextualModule: 'Connect slope, accumulated area, sign, and turning points to a physical trace.', tier: 'algebra' },

  { id: 'math-trigonometry', title: 'Trigonometry and radians', prerequisites: ['math-geometry', 'math-functions'], physicsLinks: ['newtons-laws', 'friction', 'angular-motion'], contextualModule: 'Resolve force vectors, describe rotation, and model periodic motion.', tier: 'precalculus' },
  { id: 'math-vectors', title: 'Vectors and coordinate frames', prerequisites: ['math-trigonometry'], physicsLinks: ['velocity', 'newtons-laws'], contextualModule: 'Translate quantities among world, vehicle, and wheel coordinate frames.', tier: 'precalculus' },
  { id: 'math-exponentials', title: 'Exponential and logarithmic models', prerequisites: ['math-functions'], physicsLinks: ['thermodynamics', 'electrical', 'waves'], contextualModule: 'Fit cooling, damping, or electrical transients and inspect residuals.', tier: 'precalculus' },
  { id: 'math-sinusoids', title: 'Sinusoidal and periodic functions', prerequisites: ['math-trigonometry'], physicsLinks: ['waves', 'electrical'], contextualModule: 'Connect amplitude, frequency, phase, and period to vibration and alternating signals.', tier: 'precalculus' },
  { id: 'math-regression', title: 'Regression and residuals', prerequisites: ['math-functions', 'math-data-basics'], physicsLinks: ['units', 'thermodynamics', 'waves'], contextualModule: 'Choose and validate a function model against measurements instead of trusting fit alone.', tier: 'precalculus' },
  { id: 'math-complex-numbers', title: 'Complex numbers and phase', prerequisites: ['math-sinusoids', 'math-algebra'], physicsLinks: ['waves', 'electrical'], contextualModule: 'Represent oscillation, impedance, amplitude, and phase compactly.', tier: 'precalculus' },

  { id: 'math-limits', title: 'Limits and local change', prerequisites: ['math-functions', 'math-graph-interpretation'], physicsLinks: ['velocity', 'acceleration'], contextualModule: 'Shrink a measurement interval and explain the approach to an instantaneous rate.', tier: 'calculus' },
  { id: 'math-derivatives', title: 'Derivatives and sensitivity', prerequisites: ['math-limits'], physicsLinks: ['velocity', 'acceleration', 'thermodynamics'], contextualModule: 'Recover rates from state traces and measure how predictions respond to parameters.', tier: 'calculus' },
  { id: 'math-integrals', title: 'Integrals and accumulation', prerequisites: ['math-derivatives'], physicsLinks: ['velocity', 'energy', 'electrical'], contextualModule: 'Recover displacement, impulse, energy, or charge from a rate or graph area.', tier: 'calculus' },
  { id: 'math-multivariable', title: 'Multivariable and vector calculus', prerequisites: ['math-vectors', 'math-derivatives', 'math-integrals'], physicsLinks: ['newtons-laws', 'thermodynamics', 'electrical'], contextualModule: 'Model fields, constraints, and vehicle behavior that depends on several inputs.', tier: 'calculus' },

  { id: 'math-differential-equations', title: 'Differential equations', prerequisites: ['math-derivatives', 'math-integrals'], physicsLinks: ['acceleration', 'thermodynamics', 'waves', 'electrical'], contextualModule: 'Model suspension, cooling, circuits, and vehicle states through time.', tier: 'systems' },
  { id: 'math-linear-algebra', title: 'Linear algebra and state vectors', prerequisites: ['math-vectors', 'math-systems'], physicsLinks: ['newtons-laws', 'waves', 'electrical'], contextualModule: 'Represent coupled systems, transformations, modes, and least-squares fits.', tier: 'systems' },
  { id: 'math-fourier-analysis', title: 'Fourier and frequency analysis', prerequisites: ['math-integrals', 'math-complex-numbers'], physicsLinks: ['waves', 'electrical'], contextualModule: 'Separate vibration, road, and engine-order content by frequency.', tier: 'systems' },
  { id: 'math-numerical-methods', title: 'Numerical methods and computation', prerequisites: ['math-differential-equations', 'math-linear-algebra'], physicsLinks: ['acceleration', 'thermodynamics'], contextualModule: 'Step, test, and validate models that do not have useful closed-form solutions.', tier: 'systems' },
  { id: 'math-probability', title: 'Probability and statistical inference', prerequisites: ['math-regression'], physicsLinks: ['units'], contextualModule: 'Separate measurement variation from model discrepancy and quantify confidence.', tier: 'systems' },

  { id: 'math-uncertainty', title: 'Uncertainty propagation', prerequisites: ['math-probability', 'math-derivatives'], physicsLinks: ['wheel-circumference', 'angular-motion'], contextualModule: 'Propagate measurement and parameter uncertainty into a vehicle prediction.', tier: 'research' },
  { id: 'math-optimization', title: 'Optimization under constraints', prerequisites: ['math-multivariable', 'math-numerical-methods'], physicsLinks: ['newtons-laws', 'energy'], contextualModule: 'Improve a design without violating thermal, traction, strength, or evidence limits.', tier: 'research' },
  { id: 'math-estimation', title: 'Estimation and inverse problems', prerequisites: ['math-linear-algebra', 'math-probability', 'math-optimization'], physicsLinks: ['velocity', 'waves', 'electrical'], contextualModule: 'Infer hidden states or parameters from incomplete and noisy measurements.', tier: 'research' },
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
