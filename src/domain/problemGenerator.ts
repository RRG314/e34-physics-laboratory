export interface GeneratedMotionProblem {
  seed: number
  solverVersion: 'motion-v1'
  parameters: { initialVelocity: number; acceleration: number; time: number }
  expected: { finalVelocity: number; distance: number }
  tolerance: number
  assumptions: string[]
}

function randomFromSeed(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 0x100000000
  }
}

export function generateMotionProblem(seed: number): GeneratedMotionProblem {
  const random = randomFromSeed(seed)
  const initialVelocity = Math.round(random() * 8)
  const acceleration = Math.round((0.8 + random() * 2.2) * 10) / 10
  const time = Math.round(2 + random() * 6)
  const finalVelocity = initialVelocity + acceleration * time
  const distance = initialVelocity * time + 0.5 * acceleration * time * time
  return { seed, solverVersion: 'motion-v1', parameters: { initialVelocity, acceleration, time }, expected: { finalVelocity, distance }, tolerance: 0.01, assumptions: ['one-dimensional', 'constant acceleration', 'SI units', 'no road load'] }
}

export function validateGeneratedProblem(problem: GeneratedMotionProblem) {
  const { initialVelocity, acceleration, time } = problem.parameters
  const plausible = initialVelocity >= 0 && initialVelocity <= 8 && acceleration >= 0.8 && acceleration <= 3 && time >= 2 && time <= 8
  const consistent = Math.abs(problem.expected.finalVelocity - (initialVelocity + acceleration * time)) <= problem.tolerance && Math.abs(problem.expected.distance - (initialVelocity * time + 0.5 * acceleration * time * time)) <= problem.tolerance
  return { valid: plausible && consistent, plausible, consistent }
}
