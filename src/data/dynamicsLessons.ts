export type DynamicsLessonId = 'net-force' | 'ramp-forces' | 'energy-climb' | 'impact-design'

export interface DynamicsChoice {
  id: string
  label: string
}

export interface DynamicsLesson {
  id: DynamicsLessonId
  number: number
  title: string
  shortTitle: string
  objective: string
  vehicleQuestion: string
  mathematics: string
  equation: string
  workedExample: string[]
  predictionPrompt: string
  predictionChoices: DynamicsChoice[]
  predictionAnswer: string
  predictionFeedback: string
  calculationPrompt: string
  calculationUnit: string
  graphPrompt: string
  graphChoices: DynamicsChoice[]
  graphAnswer: string
  graphFeedback: string
  assumptions: string[]
  sourceIds: string[]
  mathConceptIds: string[]
  physicsConceptIds: string[]
  notebookConclusion: string
}

/**
 * One bounded high-school mechanics path. Values are learner-controlled in the
 * interface, while the instructional sequence and evidence requirements remain stable.
 */
export const dynamicsLessons: DynamicsLesson[] = [
  {
    id: 'net-force', number: 1, title: 'Connect force to acceleration', shortTitle: 'Net force',
    objective: 'Use a motion change to infer the net external force on an idealized vehicle.',
    vehicleQuestion: 'What net force would produce the 525i model’s measured acceleration?',
    mathematics: 'Variables, multiplication, proportional reasoning, and newton units',
    equation: 'ΣF = ma',
    workedExample: ['Example: m = 1,200 kg and a = 2.0 m/s²', 'ΣF = (1,200 kg)(2.0 m/s²)', 'ΣF = 2,400 N'],
    predictionPrompt: 'If mass stays fixed and acceleration doubles, what happens to net force?',
    predictionChoices: [{ id: 'half', label: 'It is halved' }, { id: 'same', label: 'It stays the same' }, { id: 'double', label: 'It doubles' }],
    predictionAnswer: 'double', predictionFeedback: 'At fixed mass, force is directly proportional to acceleration.',
    calculationPrompt: 'Calculate the net force for the declared mass and acceleration.', calculationUnit: 'N',
    graphPrompt: 'Which feature of the velocity graph is evidence of a constant positive net force?',
    graphChoices: [{ id: 'slope', label: 'Its constant positive slope' }, { id: 'height', label: 'Its starting height' }, { id: 'area', label: 'The area under it is zero' }],
    graphAnswer: 'slope', graphFeedback: 'A constant positive slope means constant positive acceleration; with fixed mass, ΣF = ma is constant and positive.',
    assumptions: ['One-dimensional motion', 'Learner-declared constant mass', 'Constant net force', 'Road load and rotating parts omitted'], sourceIds: ['ngss-hs-forces-interactions', 'openstax-high-school-physics', 'ap-physics-1'],
    mathConceptIds: ['math-algebra', 'math-solving-equations'], physicsConceptIds: ['newtons-laws'],
    notebookConclusion: 'For fixed mass, the velocity slope and net force change in direct proportion through ΣF = ma.',
  },
  {
    id: 'ramp-forces', number: 2, title: 'Resolve gravity on a ramp', shortTitle: 'Ramp forces',
    objective: 'Resolve weight into a component parallel to a ramp and connect it to acceleration.',
    vehicleQuestion: 'How does ramp angle change the rate at which the idealized 525i slows while climbing?',
    mathematics: 'Right-triangle trigonometry, components, signs, and equation evaluation',
    equation: 'a∥ = −g sin θ',
    workedExample: ['Example: θ = 30°', 'a∥ = −(9.81 m/s²) sin 30°', 'a∥ = −4.91 m/s²'],
    predictionPrompt: 'If the uphill direction is positive, what sign should the acceleration have while the car coasts uphill?',
    predictionChoices: [{ id: 'positive', label: 'Positive' }, { id: 'zero', label: 'Zero' }, { id: 'negative', label: 'Negative' }],
    predictionAnswer: 'negative', predictionFeedback: 'The component of gravity along the ramp points downhill, opposite the chosen positive direction.',
    calculationPrompt: 'Calculate the magnitude of the down-ramp acceleration.', calculationUnit: 'm/s²',
    graphPrompt: 'Where does the car reach its highest point in the ideal ramp trace?',
    graphChoices: [{ id: 'vzero', label: 'Where velocity reaches zero' }, { id: 'pzero', label: 'Where position reaches zero' }, { id: 'amax', label: 'Where acceleration is largest' }],
    graphAnswer: 'vzero', graphFeedback: 'Position reaches a maximum at the instant the uphill velocity becomes zero.',
    assumptions: ['Point-mass vehicle', 'Constant ramp angle', 'No drag or rolling resistance', 'No wheel rotational energy'], sourceIds: ['ngss-hs-forces-interactions', 'openstax-high-school-physics', 'ap-physics-1'],
    mathConceptIds: ['math-trigonometry', 'math-vectors'], physicsConceptIds: ['newtons-laws'],
    notebookConclusion: 'On an ideal ramp, the parallel component of gravity is mg sin θ and produces acceleration −g sin θ for an uphill-positive axis.',
  },
  {
    id: 'energy-climb', number: 3, title: 'Close an energy budget', shortTitle: 'Energy climb',
    objective: 'Track kinetic energy becoming gravitational potential energy in a closed ideal model.',
    vehicleQuestion: 'How high could the 525i model coast if its initial kinetic energy became gravitational potential energy?',
    mathematics: 'Squared quantities, rearranging equations, proportional reasoning, and kilojoules',
    equation: '½mv² = mgh',
    workedExample: ['Example: m = 1,200 kg and v = 8.0 m/s', 'KE = ½(1,200 kg)(8.0 m/s)²', 'KE = 38,400 J = 38.4 kJ'],
    predictionPrompt: 'In this ideal no-loss model, what happens to maximum height if mass changes but speed does not?',
    predictionChoices: [{ id: 'increase', label: 'It increases' }, { id: 'same', label: 'It stays the same' }, { id: 'decrease', label: 'It decreases' }],
    predictionAnswer: 'same', predictionFeedback: 'Mass appears on both sides of ½mv² = mgh and cancels. Real losses would change the result.',
    calculationPrompt: 'Calculate the initial kinetic energy.', calculationUnit: 'kJ',
    graphPrompt: 'What must the total-energy line do in this closed ideal model?',
    graphChoices: [{ id: 'constant', label: 'Remain constant' }, { id: 'rise', label: 'Rise with height' }, { id: 'fall', label: 'Fall with speed' }],
    graphAnswer: 'constant', graphFeedback: 'Kinetic energy falls while gravitational potential energy rises by the same amount, so their total remains constant.',
    assumptions: ['Closed mechanical-energy model', 'No drag, rolling resistance, or braking', 'Uniform g = 9.81 m/s²', 'Vehicle treated as a point mass'], sourceIds: ['ngss-hs-energy', 'openstax-high-school-physics', 'ap-physics-1'],
    mathConceptIds: ['math-quadratics', 'math-solving-equations'], physicsConceptIds: ['mechanical-energy'],
    notebookConclusion: 'In the ideal climb model, kinetic energy transfers to gravitational potential energy while total mechanical energy remains constant.',
  },
  {
    id: 'impact-design', number: 4, title: 'Design a longer stopping pulse', shortTitle: 'Impulse design',
    objective: 'Use impulse and momentum to compare safer simulated stopping-time designs.',
    vehicleQuestion: 'How does increasing stopping time change average force for the same change in momentum?',
    mathematics: 'Products, inverse proportion, graph area, and unit conversion',
    equation: 'J = Δp = F̄Δt',
    workedExample: ['Example: Δp = 12,000 kg·m/s over 0.30 s', 'F̄ = Δp / Δt', 'F̄ = 40,000 N = 40 kN'],
    predictionPrompt: 'For the same mass and speed change, what does a longer stopping time do to average force?',
    predictionChoices: [{ id: 'raise', label: 'Raises it' }, { id: 'same', label: 'Leaves it unchanged' }, { id: 'lower', label: 'Lowers it' }],
    predictionAnswer: 'lower', predictionFeedback: 'The required impulse stays fixed. Spreading it over more time lowers the average force.',
    calculationPrompt: 'Calculate the average force magnitude for the rectangular pulse.', calculationUnit: 'kN',
    graphPrompt: 'When stopping time increases but momentum change is fixed, what remains the same on a force–time graph?',
    graphChoices: [{ id: 'height', label: 'Pulse height' }, { id: 'area', label: 'Area under the force curve' }, { id: 'slope', label: 'Velocity slope' }],
    graphAnswer: 'area', graphFeedback: 'Force–time area is impulse. The pulse becomes wider and lower while its area remains the required momentum change.',
    assumptions: ['One-dimensional stop', 'Constant rectangular average-force pulse', 'Learner-declared mass', 'Vehicle deformation, restraints, occupants, and structures are not predicted'], sourceIds: ['ngss-hs-forces-interactions', 'openstax-high-school-physics', 'ap-physics-1'],
    mathConceptIds: ['math-solving-equations', 'math-graph-interpretation'], physicsConceptIds: ['momentum-impulse'],
    notebookConclusion: 'For a fixed momentum change, increasing stopping time lowers average force while force–time area remains equal to impulse.',
  },
]

export function validateDynamicsLessons() {
  const ids = dynamicsLessons.map((lesson) => lesson.id)
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
  const invalid = dynamicsLessons.filter((lesson) => !lesson.predictionChoices.some((choice) => choice.id === lesson.predictionAnswer) || !lesson.graphChoices.some((choice) => choice.id === lesson.graphAnswer) || lesson.sourceIds.length === 0).map((lesson) => lesson.id)
  return { valid: duplicates.length === 0 && invalid.length === 0, duplicates, invalid }
}
