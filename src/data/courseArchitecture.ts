export type CourseStage = 'high-school' | 'advanced-high-school' | 'undergraduate' | 'graduate'

export interface CourseModule {
  id: string
  stage: CourseStage
  chapter: number
  title: string
  drivingQuestion: string
  measurableOutcome: string
  mathematics: string[]
  vehicleContext: string
  investigation: string
  misconception: string
  assessment: string
  unlock: string
  standards: string[]
}

/**
 * This is a curriculum map, not a pile of content. Every module must preserve the
 * objective -> activity -> assessment alignment before it can be marked playable.
 */
export const courseModules: CourseModule[] = [
  { id: 'hs-measurement', stage: 'high-school', chapter: 1, title: 'Measurement, units & uncertainty', drivingQuestion: 'How can two garages reproduce the same measurement?', measurableOutcome: 'Record SI measurements, convert units, report precision, and distinguish measured from estimated values.', mathematics: ['ratios', 'unit conversion', 'scientific notation', 'mean and range'], vehicleContext: 'Measure wheel diameter, wheelbase, mass assumptions, and timing intervals.', investigation: 'Repeat a wheel-diameter measurement and compare spread.', misconception: 'More decimal places always mean a more accurate measurement.', assessment: 'Submit a measurement table with units, precision, and one defensible conclusion.', unlock: '525i inspection tools', standards: ['OpenStax HS Physics Ch. 1', 'NGSS planning and investigation'] },
  { id: 'hs-kinematics-1d', stage: 'high-school', chapter: 2, title: 'One-dimensional motion', drivingQuestion: 'Can a motion graph tell the complete story of a run?', measurableOutcome: 'Calculate and interpret position, displacement, speed, velocity, and acceleration in tables, equations, and graphs.', mathematics: ['signed numbers', 'linear equations', 'slope', 'piecewise graphs'], vehicleContext: 'Instrumented straight-line 525i test lane.', investigation: 'Predict, run, and explain a forward–brake–reverse trace.', misconception: 'A negative velocity means the car is slowing down.', assessment: 'Match x–t, v–t, and a–t graphs and justify each segment.', unlock: 'Driver certification', standards: ['OpenStax HS Physics Ch. 2–3', 'NGSS HS-PS2-1'] },
  { id: 'hs-forces', stage: 'high-school', chapter: 3, title: 'Forces & Newton’s laws', drivingQuestion: 'Why does the car accelerate only when forces are unbalanced?', measurableOutcome: 'Draw a free-body diagram and use ΣF = ma on level ground and a ramp.', mathematics: ['algebraic rearrangement', 'vectors', 'trigonometric components'], vehicleContext: 'Vehicle mass, tire contact patches, tow force, and ramp forces.', investigation: 'Change ramp angle and compare predicted with simulated acceleration.', misconception: 'Motion requires a continuing net force in the direction of motion.', assessment: 'Construct and defend a force model for one ramp run.', unlock: 'Ramp proving ground', standards: ['OpenStax HS Physics Ch. 4–5', 'NGSS HS-PS2-1'] },
  { id: 'hs-rotation', stage: 'high-school', chapter: 4, title: 'Circular & rotational motion', drivingQuestion: 'How does engine rotation become road motion?', measurableOutcome: 'Relate angular and linear quantities and identify the assumptions behind v = rω.', mathematics: ['circle geometry', 'radians', 'ratios', 'angular graphs'], vehicleContext: 'Wheel radius, RPM, gearing, driveshaft, and differential.', investigation: 'Compare wheel RPM under rolling and slipping conditions.', misconception: 'Every point on a rolling tire moves at vehicle speed.', assessment: 'Predict RPM, inspect telemetry, and explain the residual.', unlock: 'Wheel and gearing upgrades', standards: ['OpenStax HS Physics Ch. 6'] },
  { id: 'hs-momentum', stage: 'high-school', chapter: 5, title: 'Momentum, impulse & impact safety', drivingQuestion: 'How can the same momentum change produce a smaller peak force?', measurableOutcome: 'Use impulse–momentum and interpret force–time area in a constrained virtual impact.', mathematics: ['area under a graph', 'proportional reasoning', 'multistep algebra'], vehicleContext: 'Low-speed barrier sled, crumple distance, restraint pulse.', investigation: 'Design a longer stopping pulse while holding initial speed fixed.', misconception: 'A longer collision necessarily creates a larger force.', assessment: 'Meet an impulse target and explain why peak force changed.', unlock: 'Impact laboratory certification', standards: ['OpenStax HS Physics Ch. 8', 'NGSS HS-PS2-2/3'] },
  { id: 'hs-energy', stage: 'high-school', chapter: 6, title: 'Work, energy & power', drivingQuestion: 'Where does the car’s energy go?', measurableOutcome: 'Build and interpret an energy-accounting model for ramps, braking, and drops.', mathematics: ['quadratics', 'graph area', 'rates', 'conservation equations'], vehicleContext: 'Kinetic, gravitational, thermal, and deformation energy stores.', investigation: 'Compare two routes to the same final speed using energy bars and telemetry.', misconception: 'Energy is consumed rather than transferred or transformed.', assessment: 'Close an energy budget within the declared model tolerance.', unlock: 'Drop tower and brake thermal study', standards: ['OpenStax HS Physics Ch. 9'] },
  { id: 'hs-thermal', stage: 'high-school', chapter: 7, title: 'Thermal physics', drivingQuestion: 'Why do repeated stops change brake performance?', measurableOutcome: 'Relate heat transfer, temperature change, work, and simplified cooling curves.', mathematics: ['functions', 'exponentials', 'data fitting'], vehicleContext: 'Brake rotors, coolant loop, radiator, and tires.', investigation: 'Plan a repeated-braking test and model rotor heating/cooling.', misconception: 'Temperature and thermal energy are the same quantity.', assessment: 'Fit a cooling model and identify its limitations.', unlock: 'Brake and cooling packages', standards: ['OpenStax HS Physics Ch. 11–12'] },
  { id: 'hs-waves', stage: 'high-school', chapter: 8, title: 'Waves, sound & vibration', drivingQuestion: 'What can a vibration trace reveal about a fault?', measurableOutcome: 'Connect period, frequency, wavelength, amplitude, resonance, and sound.', mathematics: ['sinusoidal functions', 'frequency', 'superposition'], vehicleContext: 'Suspension oscillation, engine order, cabin sound, and wheel imbalance.', investigation: 'Identify a resonance from time and frequency views.', misconception: 'Greater wave speed means greater frequency for a fixed source.', assessment: 'Diagnose one simulated vibration with supporting graph evidence.', unlock: 'NVH diagnostic tools', standards: ['OpenStax HS Physics Ch. 13–14'] },
  { id: 'hs-electricity', stage: 'high-school', chapter: 9, title: 'Electricity, circuits & magnetism', drivingQuestion: 'How does an electrical fault change the rest of the vehicle?', measurableOutcome: 'Analyze voltage, current, resistance, power, series/parallel circuits, and basic induction.', mathematics: ['systems of equations', 'proportionality', 'power'], vehicleContext: 'Battery, starter, alternator, lamps, sensors, and grounds.', investigation: 'Locate a high-resistance connection using voltage-drop measurements.', misconception: 'Current is used up as it passes through a component.', assessment: 'Diagnose the fault from a circuit diagram and meter readings.', unlock: 'Electrical modification branch', standards: ['OpenStax HS Physics Ch. 18–20'] },
  { id: 'ap-dynamics', stage: 'advanced-high-school', chapter: 10, title: 'AP integrated mechanics studio', drivingQuestion: 'Which model is sufficient for the maneuver?', measurableOutcome: 'Integrate translation, rotation, energy, momentum, oscillations, and fluids in inquiry labs.', mathematics: ['advanced algebra', 'trigonometry', 'uncertainty', 'model comparison'], vehicleContext: '525i whole-vehicle studies with declared parameters and coupled subsystems.', investigation: 'Choose and validate a model for acceleration, cornering, or braking.', misconception: 'A more complex model is automatically a better model.', assessment: 'AP-style experimental design plus an evidence-based model choice.', unlock: '525i systems model', standards: ['AP Physics 1 Units 1–8', 'AP science practices'] },
  { id: 'ug-modeling', stage: 'undergraduate', chapter: 11, title: 'Calculus-based vehicle dynamics', drivingQuestion: 'How do local rates create a full trajectory?', measurableOutcome: 'Derive, solve, and validate continuous-time models with uncertainty.', mathematics: ['calculus', 'differential equations', 'linear algebra', 'numerical methods'], vehicleContext: 'Precisely scoped 525i longitudinal, suspension, and thermal state models.', investigation: 'Fit parameters on one dataset and validate on a held-out maneuver.', misconception: 'Agreement with calibration data proves a model is correct.', assessment: 'Reproducible notebook, derivation, validation residuals, and critique.', unlock: '525i calibrated-model workshop', standards: ['MIT 8.01/8.02/8.03 progression'] },
  { id: 'grad-research', stage: 'graduate', chapter: 12, title: 'Research-grade digital twin', drivingQuestion: 'What can the data actually identify?', measurableOutcome: 'Formulate an inverse problem, quantify identifiability and uncertainty, and report limits.', mathematics: ['estimation', 'optimization', 'probability', 'Fourier/state-space methods'], vehicleContext: 'One identified 525i research vehicle with sensor fusion and competing models.', investigation: 'Design an experiment that distinguishes two plausible models.', misconception: 'A low residual uniquely identifies the physical mechanism.', assessment: 'Defensible research report with falsification attempt and uncertainty budget.', unlock: 'Open research sandbox', standards: ['Graduate computational mechanics and experimental practice'] },
]

export const courseStages = [
  { id: 'high-school' as const, model: '525i · Model A', label: 'High school garage', promise: 'Build the full conceptual spine with algebra, graphs, measurement, and safe virtual experiments.', modules: '01–09' },
  { id: 'advanced-high-school' as const, model: '525i · Model B', label: 'Advanced / AP studio', promise: 'Integrate systems and choose models in inquiry-driven, multistep investigations.', modules: '10' },
  { id: 'undergraduate' as const, model: '525i · Model C', label: 'University workshop', promise: 'Derive and validate calculus-based coupled vehicle models.', modules: '11' },
  { id: 'graduate' as const, model: 'Specific 525i', label: 'Graduate research bay', promise: 'Design identifiable experiments and defend uncertainty-aware conclusions.', modules: '12' },
]

export const vehicleProgression = [
  { year: 'Orientation', model: '525i visual', system: 'Licensed visual reference', learning: 'Observation, coordinates, units, and the difference between appearance and measurement evidence.', reason: 'The model can show the car without pretending that mesh dimensions are factory data.' },
  { year: 'High school', model: '525i · Model A', system: 'Idealized vehicle', learning: 'Motion, forces, energy, momentum, rotation, graphs, and explicit assumptions.', reason: 'A point mass and rigid no-slip wheels answer many foundational questions without unsupported vehicle claims.' },
  { year: 'Advanced high school', model: '525i · Model B', system: 'Semantic system model', learning: 'Brakes, driveline, suspension, thermal, electrical, waves, and competing idealizations.', reason: 'System depth is admitted component by component as visuals and evidence become available.' },
  { year: 'University', model: '525i · Model C', system: 'Calibrated configuration', learning: 'Calculus, differential equations, parameter fitting, residuals, sensitivity, and validation.', reason: 'Academic rigor comes from mathematics and evidence, not from replacing the vehicle with a higher badge.' },
  { year: 'Research', model: 'Specific 525i', system: 'Measured research vehicle', learning: 'Identifiability, uncertainty propagation, state estimation, competing models, and falsification.', reason: 'A credible twin requires a defined relationship to one physical car and independently checked data.' },
]

export const upgradeBranches = [
  { name: 'Grip & chassis', parts: 'tires → springs/dampers → anti-roll balance', concepts: 'friction → oscillation → lateral dynamics', capacity: 'Load transfer and tire-force model required' },
  { name: 'Braking & safety', parts: 'pads → rotor thermal package → restraint model', concepts: 'energy → heat transfer → impulse', capacity: 'Energy and impulse certifications required' },
  { name: 'Powertrain', parts: 'final drive → engine map → coupled driveline', concepts: 'rotation → power → differential equations', capacity: 'Torque capacity must exceed predicted peak' },
  { name: 'Electrical & control', parts: 'meters → sensors → estimator/controller', concepts: 'circuits → signals → state estimation', capacity: 'Measurement uncertainty required before control' },
]

export const lessonBlueprint = [
  'Diagnose prior knowledge with one low-stakes prompt',
  'State one observable learning outcome and success criterion',
  'Expose a vehicle phenomenon before naming the equation',
  'Connect concrete animation, graph, equation, words, and units',
  'Interleave a worked example with a faded-support problem',
  'Require a prediction before running the experiment',
  'Give targeted feedback tied to a known misconception',
  'Assess transfer in a different vehicle situation',
  'Schedule a later retrieval checkpoint before dependent upgrades',
]
