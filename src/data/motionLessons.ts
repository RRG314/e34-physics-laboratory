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
  transferCheck: { prompt: string; options: string[]; answer: string; rationale: string }
  estimateEvidence?: EvidenceGain[]
  calculationEvidence: EvidenceGain[]
  graphEvidence: EvidenceGain[]
}

export interface MotionVariant {
  prompt: string
  answer: number
  experiment: MotionLesson['experiment']
  explanation: string
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
    transferCheck: { prompt: 'A different trip begins at +8 m and ends at +2 m. Without repeating the worked example, what sign must its displacement have?', options: ['Positive', 'Zero', 'Negative'], answer: 'Negative', rationale: 'The final coordinate is 6 m lower than the initial coordinate, so the displacement is negative.' },
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
    transferCheck: { prompt: 'A second car travels for the same time but at twice the constant speed. How does its change in position compare?', options: ['Half as large', 'The same', 'Twice as large'], answer: 'Twice as large', rationale: 'At fixed time, displacement is directly proportional to speed through Δx = vΔt.' },
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
    transferCheck: { prompt: 'If you reverse the chosen positive direction but the trip itself does not change, what happens to the velocity value?', options: ['Its sign reverses', 'Its magnitude doubles', 'It becomes zero'], answer: 'Its sign reverses', rationale: 'Velocity depends on the coordinate convention. Reversing the positive axis reverses its sign, not the physical trip.' },
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
    transferCheck: { prompt: 'The same acceleration acts for twice as long. How does the velocity change, Δv, compare?', options: ['Half as large', 'The same', 'Twice as large'], answer: 'Twice as large', rationale: 'At fixed acceleration, Δv = aΔt makes velocity change directly proportional to elapsed time.' },
    estimateEvidence: [{ conceptId: 'acceleration', gains: { predictionSkill: 0.7 } }],
    calculationEvidence: [{ conceptId: 'acceleration', gains: { exposure: 0.75, calculationSkill: 0.7 } }],
    graphEvidence: [
      { conceptId: 'acceleration', gains: { conceptualUnderstanding: 0.7, graphInterpretation: 0.55 } },
      { conceptId: 'motion-mastery', gains: { exposure: 0.7, conceptualUnderstanding: 0.7, applicationSkill: 0.65 } },
    ],
  },
]

export const motionVariants: Record<string, MotionVariant[]> = {
  'displacement-from-coordinates': [
    { prompt: 'The E34 begins at x = +11 m and finishes at x = −5 m. What is its displacement?', answer: -16, experiment: { initialPosition: 11, velocity: -2, acceleration: 0, duration: 8 }, explanation: '−5 m − (+11 m) = −16 m. The negative sign records the change toward negative X.' },
    { prompt: 'The E34 begins at x = +6 m and finishes at x = −3 m. What is its displacement?', answer: -9, experiment: { initialPosition: 6, velocity: -1.5, acceleration: 0, duration: 6 }, explanation: '−3 m − (+6 m) = −9 m. The negative sign records the change toward negative X.' },
  ],
  'constant-speed-position': [
    { prompt: 'The E34 travels at 5 m/s for 8 s. Starting at x = 0, where should it finish?', answer: 40, experiment: { initialPosition: 0, velocity: 5, acceleration: 0, duration: 8 }, explanation: '40 m = 5 m/s × 8 s. The graph stays linear because velocity is constant.' },
    { prompt: 'The E34 travels at 7 m/s for 5 s. Starting at x = 0, where should it finish?', answer: 35, experiment: { initialPosition: 0, velocity: 7, acceleration: 0, duration: 5 }, explanation: '35 m = 7 m/s × 5 s. The graph stays linear because velocity is constant.' },
  ],
  'signed-velocity': [
    { prompt: 'The car moves at −3 m/s for 5 s. What is its displacement?', answer: -15, experiment: { initialPosition: 0, velocity: -3, acceleration: 0, duration: 5 }, explanation: 'The magnitude is 15 m; the negative sign records motion opposite the +X direction.' },
    { prompt: 'The car moves at −6 m/s for 2 s. What is its displacement?', answer: -12, experiment: { initialPosition: 0, velocity: -6, acceleration: 0, duration: 2 }, explanation: 'The magnitude is 12 m; the negative sign records motion opposite the +X direction.' },
  ],
  'constant-acceleration-velocity': [
    { prompt: 'Initial velocity is 3 m/s. Constant acceleration is 1.5 m/s² for 6 s. What is the final velocity?', answer: 12, experiment: { initialPosition: 0, velocity: 3, acceleration: 1.5, duration: 6 }, explanation: 'The velocity changes by 9 m/s, so the final velocity is 12 m/s.' },
    { prompt: 'Initial velocity is 1 m/s. Constant acceleration is 2.5 m/s² for 4 s. What is the final velocity?', answer: 11, experiment: { initialPosition: 0, velocity: 1, acceleration: 2.5, duration: 4 }, explanation: 'The velocity changes by 10 m/s, so the final velocity is 11 m/s.' },
  ],
}

export function motionLessonForVariant(index: number, variation: number): MotionLesson {
  const base = motionLessons[index]
  if (!base || variation === 0) return base
  const variants = motionVariants[base.id] ?? []
  const selected = variants[(variation - 1) % variants.length]
  return selected ? { ...base, ...selected } : base
}

export function validateMotionLessons(lessons = motionLessons) {
  const ids = lessons.map((lesson) => lesson.id)
  const uniqueIds = new Set(ids)
  const invalid = lessons.filter((lesson) => !lesson.prompt || !lesson.unit || !Number.isFinite(lesson.answer) || lesson.graphCheck.options.length < 2 || (motionVariants[lesson.id]?.some((variant) => !Number.isFinite(variant.answer) || !variant.prompt) ?? false))
  return { valid: uniqueIds.size === ids.length && invalid.length === 0, duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), invalidIds: invalid.map((lesson) => lesson.id) }
}
