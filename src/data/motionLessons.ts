import type { MasteryDimension } from '../domain/model'

export interface EvidenceGain {
  conceptId: string
  gains: Partial<Record<MasteryDimension, number>>
}

export interface MotionLesson {
  id: string
  eyebrow: string
  title: string
  prompt: string
  equation: string
  answer: number
  tolerance: number
  unit: string
  focusConcept: string
  experiment: { initialPosition: number; velocity: number; acceleration: number; duration: number }
  explanation: string
  estimate: { prompt: string; options: string[]; answer: string; rationale: string }
  graphCheck: { prompt: string; options: string[]; answer: string; rationale: string }
  estimateEvidence?: EvidenceGain[]
  calculationEvidence: EvidenceGain[]
  graphEvidence: EvidenceGain[]
}

/**
 * The motion chapter is content data rather than component logic. A lesson earns
 * evidence only for the response that directly demonstrates that dimension.
 */
export const motionLessons: MotionLesson[] = [
  {
    id: 'displacement-from-coordinates', eyebrow: 'Investigation 01 / describe the car', title: 'Measure a change in position',
    prompt: 'The E34 begins at x = +8 m and finishes at x = −4 m. What is its displacement?', equation: 'Δx = x_f − x_i', answer: -12, tolerance: 0.01, unit: 'm', focusConcept: 'displacement',
    experiment: { initialPosition: 8, velocity: -2, acceleration: 0, duration: 6 },
    explanation: '−4 m − (+8 m) = −12 m. The sign records the change toward negative X.',
    estimate: { prompt: 'Before calculating: should the displacement be positive, zero, or negative?', options: ['Positive', 'Zero', 'Negative'], answer: 'Negative', rationale: 'The final coordinate lies in the −X direction from the initial coordinate.' },
    graphCheck: { prompt: 'Which position–time trace matches constant motion from +8 m to −4 m?', options: ['A straight line falling left to right', 'A horizontal line', 'A curve that gets steeper'], answer: 'A straight line falling left to right', rationale: 'Constant negative velocity produces a constant negative slope.' },
    calculationEvidence: [
      { conceptId: 'displacement', gains: { exposure: 0.7, calculationSkill: 0.7 } },
      { conceptId: 'coordinates', gains: { exposure: 0.7, conceptualUnderstanding: 0.7 } },
      { conceptId: 'units', gains: { exposure: 0.35, measurementSkill: 0.25 } },
    ],
    graphEvidence: [
      { conceptId: 'displacement', gains: { conceptualUnderstanding: 0.7, graphInterpretation: 0.55 } },
      { conceptId: 'position', gains: { exposure: 0.7, conceptualUnderstanding: 0.65, graphInterpretation: 0.55 } },
    ],
  },
  {
    id: 'constant-speed-position', eyebrow: 'Investigation 02 / speed', title: 'Predict a constant-speed run',
    prompt: 'The E34 travels at 6 m/s for 6 s. Starting at x = 0, where should it finish?', equation: 'x = x₀ + vt', answer: 36, tolerance: 0.01, unit: 'm', focusConcept: 'speed',
    experiment: { initialPosition: 0, velocity: 6, acceleration: 0, duration: 6 },
    explanation: '36 m = 6 m/s × 6 s. The graph is a straight line because velocity is constant.',
    estimate: { prompt: 'Order-of-magnitude check: is the result units, tens, or hundreds of metres?', options: ['Units', 'Tens', 'Hundreds'], answer: 'Tens', rationale: 'A few metres per second sustained for a few seconds produces a few tens of metres.' },
    graphCheck: { prompt: 'What does the constant slope of this position–time graph represent?', options: ['The car’s constant velocity', 'The car’s mass', 'The wheel diameter'], answer: 'The car’s constant velocity', rationale: 'On a position–time graph, slope is change in position divided by change in time: velocity.' },
    estimateEvidence: [{ conceptId: 'speed', gains: { predictionSkill: 0.35 } }],
    calculationEvidence: [{ conceptId: 'speed', gains: { exposure: 0.75, calculationSkill: 0.7 } }],
    graphEvidence: [{ conceptId: 'speed', gains: { conceptualUnderstanding: 0.7, graphInterpretation: 0.55 } }, { conceptId: 'position', gains: { graphInterpretation: 0.25 } }],
  },
  {
    id: 'signed-velocity', eyebrow: 'Investigation 03 / velocity', title: 'Keep the direction in the number',
    prompt: 'The car moves at −4 m/s for 3 s. What is its displacement?', equation: 'Δx = vΔt', answer: -12, tolerance: 0.01, unit: 'm', focusConcept: 'velocity',
    experiment: { initialPosition: 0, velocity: -4, acceleration: 0, duration: 3 },
    explanation: 'The magnitude is 12 m; the negative sign records motion opposite the +X direction.',
    estimate: { prompt: 'Before calculating: what sign should the displacement have?', options: ['Positive', 'Zero', 'Negative'], answer: 'Negative', rationale: 'Negative velocity over positive elapsed time produces negative displacement.' },
    graphCheck: { prompt: 'The graph falls at a constant rate. What can you conclude?', options: ['Velocity is constant and negative', 'Speed is increasing', 'Acceleration is positive'], answer: 'Velocity is constant and negative', rationale: 'A straight negative slope means a constant negative velocity.' },
    calculationEvidence: [{ conceptId: 'velocity', gains: { exposure: 0.75, calculationSkill: 0.7 } }],
    graphEvidence: [{ conceptId: 'velocity', gains: { conceptualUnderstanding: 0.7, graphInterpretation: 0.55 } }],
  },
  {
    id: 'constant-acceleration-velocity', eyebrow: 'Investigation 04 / acceleration', title: 'Predict the final velocity',
    prompt: 'Initial velocity is 2 m/s. Constant acceleration is 2 m/s² for 5 s. What is the final velocity?', equation: 'v = v₀ + at', answer: 12, tolerance: 0.01, unit: 'm/s', focusConcept: 'acceleration',
    experiment: { initialPosition: 0, velocity: 2, acceleration: 2, duration: 5 },
    explanation: 'The velocity changes by 10 m/s, so the final velocity is 12 m/s.',
    estimate: { prompt: 'With positive acceleration, should final velocity increase, decrease, or stay constant?', options: ['Increase', 'Decrease', 'Stay constant'], answer: 'Increase', rationale: 'Positive acceleration increases velocity in the selected +X direction.' },
    graphCheck: { prompt: 'Why does the position–time trace bend upward?', options: ['Its slope—velocity—is increasing', 'Time is accelerating', 'Position has no units'], answer: 'Its slope—velocity—is increasing', rationale: 'Positive acceleration makes velocity, and therefore the graph’s slope, increase with time.' },
    estimateEvidence: [{ conceptId: 'acceleration', gains: { predictionSkill: 0.7 } }],
    calculationEvidence: [{ conceptId: 'acceleration', gains: { exposure: 0.75, calculationSkill: 0.7 } }],
    graphEvidence: [
      { conceptId: 'acceleration', gains: { conceptualUnderstanding: 0.7, graphInterpretation: 0.55 } },
      { conceptId: 'motion-mastery', gains: { exposure: 0.7, conceptualUnderstanding: 0.7, applicationSkill: 0.65 } },
    ],
  },
]

export function validateMotionLessons(lessons = motionLessons) {
  const ids = lessons.map((lesson) => lesson.id)
  const uniqueIds = new Set(ids)
  const invalid = lessons.filter((lesson) => !lesson.prompt || !lesson.unit || !Number.isFinite(lesson.answer) || lesson.graphCheck.options.length < 2)
  return { valid: uniqueIds.size === ids.length && invalid.length === 0, duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), invalidIds: invalid.map((lesson) => lesson.id) }
}
