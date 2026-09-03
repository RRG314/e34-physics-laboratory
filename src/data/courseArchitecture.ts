export type CurriculumLevelId = 'hs-foundation' | 'hs-advanced' | 'college-1' | 'college-advanced' | 'research'

export interface CurriculumLevel {
  id: CurriculumLevelId
  label: string
  model: string
  mathematics: string
  physics: string
  learningMode: string
}

export interface ModuleDepth {
  level: CurriculumLevelId
  mathematics: string[]
  physics: string
  vehicleMission: string
  evidence: string
  unlock: string
}

export interface CourseModule {
  id: string
  chapter: number
  title: string
  vehicleSystems: string
  drivingQuestion: string
  depths: ModuleDepth[]
  sourceIds: string[]
}

export const curriculumLevels: CurriculumLevel[] = [
  { id: 'hs-foundation', label: 'High school foundations', model: '525i · Model A', mathematics: 'Arithmetic, ratios, units, Algebra I, geometry, graphs, and basic statistics', physics: 'A complete conceptual and algebra-based first pass through the major domains', learningMode: 'Concrete experiments become diagrams, tables, graphs, and equations.' },
  { id: 'hs-advanced', label: 'Advanced high school', model: '525i · Model B', mathematics: 'Algebra II, functions, trigonometry, exponentials, logarithms, and regression', physics: 'AP-style mechanics, fluids, thermal physics, waves, electricity, magnetism, and optics', learningMode: 'Learners choose models, justify representations, and design controlled tests.' },
  { id: 'college-1', label: 'College year 1', model: '525i · Model C', mathematics: 'Precalculus bridge as needed, then single-variable calculus and numerical approximation', physics: 'The same fundamentals rebuilt as continuous, calculus-based models', learningMode: 'Finite differences lead to derivatives; graph area leads to integrals.' },
  { id: 'college-advanced', label: 'College years 2–4', model: '525i · Coupled systems', mathematics: 'Multivariable calculus, differential equations, linear algebra, probability, and computation', physics: 'Coupled mechanical, thermal, fluid, electrical, signal, and control systems', learningMode: 'Subsystem models interact; modifications require compatibility and trade studies.' },
  { id: 'research', label: 'Graduate and research', model: 'Specific 525i', mathematics: 'Estimation, optimization, uncertainty propagation, signal processing, and numerical validation', physics: 'A bounded digital twin tied to one measured car and stated uses', learningMode: 'Learners design identifiable experiments, test competing models, and report limits.' },
]

const d = (level: CurriculumLevelId, mathematics: string[], physics: string, vehicleMission: string, evidence: string, unlock: string): ModuleDepth => ({ level, mathematics, physics, vehicleMission, evidence, unlock })

/**
 * The course is a spiral of stable domain families. Every family is revisited at
 * greater mathematical and physical depth while the same 525i remains in view.
 */
export const courseModules: CourseModule[] = [
  {
    id: 'measurement-modeling', chapter: 1, title: 'Measurement, data & modeling', vehicleSystems: 'Whole vehicle · tools · sensors', drivingQuestion: 'What would another learner need to reproduce this result?', sourceIds: ['openstax-high-school-physics', 'ngss-mathematics-computation', 'ies-instruction-study-guide'],
    depths: [
      d('hs-foundation', ['units', 'ratios', 'scientific notation', 'mean and range'], 'Measurement, precision, uncertainty, system boundaries, and model assumptions.', 'Measure a wheel and time repeated straight-line runs.', 'A table with units, precision, spread, and one supported claim.', 'Inspection tools'),
      d('hs-advanced', ['functions', 'scatterplots', 'regression', 'residuals'], 'Calibration, repeatability, random/systematic error, and competing empirical models.', 'Calibrate a speed or temperature sensor against a declared reference.', 'A calibration graph, residual plot, and limitation statement.', 'Data logger'),
      d('college-1', ['derivatives as sensitivity', 'propagation by approximation', 'statistics'], 'Calibration separated from validation and uncertainty attached to derived quantities.', 'Calibrate on one dataset and validate the 525i measurement model on another.', 'Parameter estimate, uncertainty interval, and held-out residuals.', 'Calibrated telemetry'),
      d('college-advanced', ['linear algebra', 'covariance', 'least squares', 'optimization'], 'Multi-sensor estimation, identifiability, and experiment design.', 'Estimate one shared state from wheel, position, and acceleration measurements.', 'Reproducible fit with rank, covariance, and sensitivity checks.', 'Synchronized acquisition'),
      d('research', ['Bayesian inference', 'information measures', 'uncertainty budgets'], 'Traceable measurement systems and validation for a stated digital-twin use.', 'Design the minimum experiment that can distinguish two 525i models.', 'Preregistered method, uncertainty budget, falsification attempt, and validation report.', 'Research measurement pipeline'),
    ],
  },
  {
    id: 'motion', chapter: 2, title: 'Motion', vehicleSystems: 'Body · speedometer · odometer · wheels', drivingQuestion: 'How can several representations describe the same run?', sourceIds: ['pum-physics-union-mathematics', 'ap-physics-1', 'mit-8-01sc'],
    depths: [
      d('hs-foundation', ['signed numbers', 'linear equations', 'slope', 'area by counting'], 'Position, displacement, speed, velocity, acceleration, and motion graphs.', 'Predict and run a forward–brake–reverse test lane trace.', 'Match words, motion diagram, table, x–t, v–t, and a–t graphs.', 'Guided driving'),
      d('hs-advanced', ['piecewise functions', 'quadratics', 'vectors', 'trigonometry'], 'Two-dimensional motion, circular motion, relative motion, and model selection.', 'Compare straight braking with a constant-radius maneuver.', 'A symbolic prediction and evidence-based choice between models.', 'Expanded proving ground'),
      d('college-1', ['limits', 'derivatives', 'integrals', 'numerical differences'], 'Instantaneous motion and continuous trajectories.', 'Recover velocity from position data and displacement from velocity data.', 'A derivation plus numerical and graphical cross-checks.', 'Calculus telemetry tools'),
      d('college-advanced', ['ordinary differential equations', 'state vectors', 'numerical integration'], 'Road load, variable acceleration, and coupled position–velocity states.', 'Fit and simulate a coast-down model.', 'A stable numerical model checked against limiting cases and held-out data.', 'Longitudinal simulator'),
      d('research', ['state estimation', 'probability', 'sensor fusion'], 'Latent motion reconstructed from noisy and disagreeing sensors.', 'Fuse wheel-speed, inertial, and position measurements.', 'Estimator residuals, uncertainty, and failure-mode analysis.', 'Motion-state estimator'),
    ],
  },
  {
    id: 'forces-traction', chapter: 3, title: 'Forces, traction & equilibrium', vehicleSystems: 'Tires · contact patches · ramps · steering', drivingQuestion: 'Which interactions actually change the car’s motion?', sourceIds: ['openstax-high-school-physics', 'ap-physics-1', 'mit-8-01sc'],
    depths: [
      d('hs-foundation', ['equation solving', 'vectors', 'right-triangle trigonometry'], 'Newton’s laws, free-body diagrams, friction, equilibrium, and ramps.', 'Predict acceleration while changing ramp angle or tow force.', 'A free-body diagram whose components agree with the measured acceleration.', 'Ramp laboratory'),
      d('hs-advanced', ['systems of equations', 'inequalities', 'function domains'], 'Traction limits, centripetal acceleration, and force envelopes.', 'Find when braking or turning demand exceeds declared tire grip.', 'A force-envelope graph with assumptions and boundary cases.', 'Tire test pad'),
      d('college-1', ['vector calculus foundations', 'derivatives', 'integrals'], 'Variable forces, distributed loading, and work from force data.', 'Analyze combined braking and cornering using measured force traces.', 'A model that reconciles force, motion, and energy representations.', 'Load-transfer instruments'),
      d('college-advanced', ['multivariable functions', 'optimization', 'nonlinear equations'], 'Load transfer, nonlinear tire behavior, and suspension geometry effects.', 'Compare tire and alignment choices under several maneuvers.', 'A constrained trade study rather than one best-number claim.', 'Grip and chassis modifications'),
      d('research', ['parameter estimation', 'sensitivity', 'uncertainty propagation'], 'Identification and validation of a bounded tire-force model.', 'Design maneuvers that identify the parameters the model actually uses.', 'Independent validation with confidence bounds and rejected alternatives.', 'Research tire model'),
    ],
  },
  {
    id: 'energy-momentum', chapter: 4, title: 'Energy, momentum & safety', vehicleSystems: 'Brakes · restraint model · ramps · powertrain', drivingQuestion: 'What remains conserved, and where are the transfers?', sourceIds: ['openstax-high-school-physics', 'ap-physics-1', 'ngss-mathematics-computation'],
    depths: [
      d('hs-foundation', ['quadratics', 'proportions', 'graph area', 'multistep algebra'], 'Work, kinetic and potential energy, power, momentum, and impulse.', 'Close an energy budget and lengthen a virtual stopping pulse.', 'Energy bars and force–time area that agree with the equations.', 'Energy and impact labs'),
      d('hs-advanced', ['functional dependence', 'piecewise graphs', 'regression'], 'Efficiency, nonconstant power, restitution, and protective-device design.', 'Compare braking or restraint designs under the same initial conditions.', 'A design claim supported by conserved quantities and tradeoffs.', 'Brake and safety design'),
      d('college-1', ['definite integrals', 'work integrals', 'derivatives of energy'], 'Variable force, power as an instantaneous rate, and impulse integrals.', 'Compute work and impulse from telemetry rather than constant-value formulas.', 'Symbolic, numerical, and graphical results that agree within tolerance.', 'Integrated force/energy analysis'),
      d('college-advanced', ['numerical optimization', 'coupled ODEs', 'constraint models'], 'Mechanical, thermal, and deformation-energy coupling.', 'Size a brake thermal package or simulated restraint pulse under constraints.', 'Optimization record with compatibility limits and sensitivity.', 'Brake and safety modifications'),
      d('research', ['uncertainty quantification', 'model discrepancy', 'validation statistics'], 'Validated energy and impulse models for explicitly bounded uses.', 'Compare competing models with synthetic or safely collected bench data.', 'A validation decision that includes what the model cannot predict.', 'Safety-model research tools'),
    ],
  },
  {
    id: 'rotation-powertrain', chapter: 5, title: 'Rotation & powertrain', vehicleSystems: 'Wheels · gears · clutch · driveshaft · differential', drivingQuestion: 'How does rotation become force and road speed?', sourceIds: ['openstax-high-school-physics', 'ap-physics-1', 'mit-8-01sc'],
    depths: [
      d('hs-foundation', ['circle geometry', 'ratios', 'radians', 'unit conversion'], 'Angular position, speed, acceleration, torque, and ideal rolling.', 'Decode a tire, predict wheel RPM, and test the no-slip model.', 'A dimensional calculation plus an explanation of model mismatch.', 'Wheel telemetry'),
      d('hs-advanced', ['functions', 'trigonometry', 'systems of equations'], 'Rotational inertia, angular momentum, gear ratios, and power.', 'Predict road speed and wheel torque through a declared gear train.', 'A speed/torque graph with compatibility and evidence labels.', 'Gearing experiments'),
      d('college-1', ['rotational calculus', 'energy integrals', 'first-order ODEs'], 'Rotational dynamics and transient driveline response.', 'Build an engine-to-wheel state model with sourced or declared parameters.', 'A derivation and simulation that conserve energy in the ideal limit.', 'Driveline simulator'),
      d('college-advanced', ['matrix systems', 'frequency response', 'constrained optimization'], 'Compliance, losses, differential behavior, and torsional vibration.', 'Compare final-drive, flywheel, or differential changes without exceeding limits.', 'A system-level trade study covering every affected component.', 'Powertrain modifications'),
      d('research', ['inverse problems', 'spectral estimation', 'uncertainty'], 'Identification of driveline inertia, compliance, and losses.', 'Infer parameters from synchronized engine and wheel-speed traces.', 'Identifiability analysis and independent validation.', 'Measured driveline model'),
    ],
  },
  {
    id: 'oscillations-waves', chapter: 6, title: 'Oscillations, waves & sound', vehicleSystems: 'Springs · dampers · tires · engine vibration · cabin', drivingQuestion: 'What can a time trace reveal about a vibrating system?', sourceIds: ['openstax-high-school-physics', 'ap-physics-1', 'mit-8-03sc'],
    depths: [
      d('hs-foundation', ['period and frequency', 'graph reading', 'proportions'], 'Periodic motion, amplitude, frequency, damping, resonance, waves, and sound.', 'Observe suspension bounce and identify a simulated wheel imbalance.', 'Time-graph interpretation and a diagnosis supported by frequency.', 'Vibration test rig'),
      d('hs-advanced', ['sinusoidal functions', 'exponentials', 'logarithmic scales', 'regression'], 'Simple harmonic motion, damping curves, superposition, and resonance.', 'Estimate damping and avoid a resonance while changing a declared component.', 'A fitted model with residuals and a transfer prediction.', 'Damper tuning'),
      d('college-1', ['second-order ODEs', 'complex numbers', 'derivatives'], 'Free, damped, and forced oscillators with phase.', 'Model a quarter-car suspension under road input.', 'Analytical and numerical responses with physical checks.', 'Suspension simulator'),
      d('college-advanced', ['linear algebra', 'eigenvalues', 'Fourier analysis', 'control'], 'Multiple degrees of freedom, normal modes, spectra, and isolation.', 'Separate wheel, suspension, engine-order, and cabin responses.', 'Modal and spectral evidence tied to a proposed change.', 'NVH and suspension modifications'),
      d('research', ['stochastic processes', 'system identification', 'signal uncertainty'], 'Operational modal analysis and uncertain excitation.', 'Identify mode parameters from measured 525i vibration data.', 'Repeatable acquisition, confidence bounds, and competing-model test.', 'Research NVH pipeline'),
    ],
  },
  {
    id: 'thermal-fluids', chapter: 7, title: 'Thermal systems & fluids', vehicleSystems: 'Brakes · coolant · radiator · oil · tires · fuel tank', drivingQuestion: 'How do energy, pressure, and flow move through the car?', sourceIds: ['openstax-high-school-physics', 'ap-physics-1', 'ap-physics-2'],
    depths: [
      d('hs-foundation', ['ratios', 'density', 'area and volume', 'energy equations'], 'Temperature, heat, phase, pressure, buoyancy, and simple continuity.', 'Track brake temperature and relate fuel-tank depth to pressure.', 'A thermal-energy account and a pressure/flow representation.', 'Temperature and pressure tools'),
      d('hs-advanced', ['exponential functions', 'logarithms', 'geometry', 'regression'], 'Cooling curves, gas laws, Bernoulli/continuity models, and efficiency.', 'Model rotor cooling, radiator flow, or a tank fill/drain scenario.', 'A function model chosen and validated against data.', 'Cooling and fuel-system tests'),
      d('college-1', ['derivatives', 'integrals', 'first-order ODEs'], 'First-law analysis, transient heat transfer, control volumes, and fluid energy.', 'Simulate repeated braking and coolant or fuel flow through a bounded system.', 'A time-dependent balance with units, initial conditions, and limits.', 'Thermal/fluid simulator'),
      d('college-advanced', ['dimensional analysis', 'coupled ODEs', 'numerical methods'], 'Thermal networks, pressure losses, lubrication, and simplified slosh dynamics.', 'Evaluate radiator, oil-cooling, or fuel-baffle changes across duty cycles.', 'A validated reduced-order model and compatibility trade study.', 'Cooling and fuel modifications'),
      d('research', ['parameter estimation', 'computational methods', 'uncertainty quantification'], 'Measured transport models and comparison with higher-fidelity simulation.', 'Identify heat-transfer or flow parameters and test when the lumped model fails.', 'Validation data, residual structure, and a declared domain of use.', 'Research thermal/fluid model'),
    ],
  },
  {
    id: 'electricity-sensing', chapter: 8, title: 'Electricity, magnetism & sensing', vehicleSystems: 'Battery · grounds · starter · alternator · lamps · sensors', drivingQuestion: 'How can electrical measurements locate an invisible fault?', sourceIds: ['openstax-high-school-physics', 'ap-physics-2', 'mit-8-02x'],
    depths: [
      d('hs-foundation', ['ratios', 'linear equations', 'systems', 'power'], 'Charge, current, voltage, resistance, series/parallel circuits, power, and induction.', 'Use voltage-drop measurements to locate a high-resistance ground.', 'A circuit model whose predicted readings distinguish the fault.', 'Multimeter and circuit bench'),
      d('hs-advanced', ['exponentials', 'sinusoids', 'function composition', 'regression'], 'RC/RL transients, alternating signals, magnetic induction, and sensor transfer functions.', 'Analyze a starting, charging, or sensor transient.', 'A time graph and parameter estimate that explain the behavior.', 'Oscilloscope and diagnostics'),
      d('college-1', ['differential equations', 'integrals', 'vector foundations'], 'Dynamic circuits, field relationships, induction, and energy storage.', 'Model alternator, actuator, or sensor response without hiding assumptions.', 'Analytical and numerical circuit results checked against measurements.', 'Electrical systems simulator'),
      d('college-advanced', ['linear algebra', 'Fourier analysis', 'sampling', 'feedback control'], 'Filters, digital signals, observers, feedback, and coupled electromechanical systems.', 'Design a data-acquisition or control change and test stability/noise tradeoffs.', 'Frequency/time-domain evidence and failure-mode analysis.', 'Sensors and control modifications'),
      d('research', ['state-space estimation', 'probability', 'fault classification'], 'Sensor fusion, observability, diagnostics, and uncertainty-aware control.', 'Detect and distinguish faults using measured multi-sensor data.', 'Out-of-sample performance, uncertainty, and false-alarm analysis.', 'Research instrumentation'),
    ],
  },
  {
    id: 'light-materials', chapter: 9, title: 'Light, instrumentation & materials', vehicleSystems: 'Headlamps · mirrors · displays · sensors · body and restraint materials', drivingQuestion: 'What can light and deformation tell us about the vehicle?', sourceIds: ['openstax-high-school-physics', 'ap-physics-2'],
    depths: [
      d('hs-foundation', ['geometry', 'proportions', 'graph interpretation'], 'Reflection, refraction, lenses, stress, strain, and elastic behavior.', 'Trace a headlamp or mirror ray and compare elastic deformation under load.', 'A ray/force diagram with a measurement-based explanation.', 'Optical and material inspection'),
      d('hs-advanced', ['trigonometry', 'inverse relationships', 'linear regression'], 'Image formation, wave optics boundaries, elastic modulus, and material tradeoffs.', 'Test beam aim or estimate stiffness from load–deflection data.', 'A model whose fit and limits are explicitly defended.', 'Lighting and material test tools'),
      d('college-1', ['derivatives', 'integrals', 'multivariable geometry'], 'Geometric optics, interference foundations, distributed stress, and strain energy.', 'Analyze an optical sensor or simplified structural member.', 'A derivation connected to a reproducible measurement.', 'Instrument and structure models'),
      d('college-advanced', ['matrix methods', 'finite differences', 'optimization'], 'Optical systems, material models, and reduced structural analysis.', 'Compare an instrumentation or structural modification under constraints.', 'A mesh/model convergence check and trade study.', 'Instrumentation/material modifications'),
      d('research', ['inverse imaging', 'regularization', 'uncertainty'], 'Measurement through images and validated material parameter identification.', 'Infer geometry or deformation from calibrated imagery.', 'Traceable calibration, uncertainty, and independent validation.', 'Research optical measurement'),
    ],
  },
  {
    id: 'integrated-engineering', chapter: 10, title: 'Integrated engineering & capstones', vehicleSystems: 'The complete 525i', drivingQuestion: 'Can the proposed change survive a different test than the one it was designed for?', sourceIds: ['ngss-mathematics-computation', 'ap-physics-1', 'ap-physics-2', 'ies-instruction-study-guide'],
    depths: [
      d('hs-foundation', ['multistep algebra', 'tables', 'basic statistics'], 'System boundaries, conservation, evidence, and engineering constraints.', 'Complete a stock-vehicle safety or efficiency campaign across several labs.', 'A claim–evidence–reasoning report with a changed-context test.', 'High-school 525i capstone'),
      d('hs-advanced', ['model comparison', 'functions', 'tradeoff graphs'], 'Interacting systems and competing design solutions.', 'Choose one tire, brake, or instrumentation change and prove its compatibility.', 'A multirepresentation design review and transfer test.', 'First bounded modification'),
      d('college-1', ['calculus models', 'sensitivity', 'introductory optimization'], 'Coupled mechanical, thermal, and electrical balances.', 'Predict the consequences of one modification outside its target maneuver.', 'A reproducible notebook with calibration and validation separated.', 'College engineering campaign'),
      d('college-advanced', ['constrained optimization', 'simulation', 'probability'], 'System integration, robustness, controls, and failure modes.', 'Build a compatible package and test it across a duty cycle.', 'Requirement trace, trade study, failure analysis, and held-out validation.', 'Integrated modification workshop'),
      d('research', ['experimental design', 'identifiability', 'uncertainty budgets'], 'Digital-twin credibility, falsification, and reproducible research.', 'Use one measured 525i to distinguish competing explanations or models.', 'A reviewable research package with data, code, limits, and negative results.', 'Open research sandbox'),
    ],
  },
]

export const courseStages = curriculumLevels.map((level) => ({
  id: level.id,
  model: level.model,
  label: level.label,
  promise: level.learningMode,
  modules: 'All domain families',
}))

export const vehicleProgression = curriculumLevels.map((level) => ({
  year: level.label,
  model: level.model,
  system: level.physics,
  learning: level.mathematics,
  reason: level.learningMode,
}))

export const upgradeBranches = [
  { name: 'Grip & chassis', parts: 'tires → springs/dampers → anti-roll balance', concepts: 'friction → oscillation → lateral dynamics', capacity: 'Begins after force, rotation, and uncertainty evidence' },
  { name: 'Braking & safety', parts: 'pads → rotor thermal package → restraint model', concepts: 'energy → heat transfer → impulse', capacity: 'Begins after energy and impulse evidence is demonstrated' },
  { name: 'Powertrain', parts: 'final drive → engine map → coupled driveline', concepts: 'rotation → power → differential equations', capacity: 'Begins after the complete driveline model is defensible' },
  { name: 'Electrical & control', parts: 'meters → sensors → estimator/controller', concepts: 'circuits → signals → state estimation', capacity: 'Begins after measurement uncertainty is demonstrated' },
]

export const lessonBlueprint = [
  'Diagnose prerequisite mathematics and prior physics',
  'Expose a vehicle phenomenon before naming the equation',
  'Build words, diagram, table, graph, and equation together',
  'Teach the needed mathematics in a short, contextual studio',
  'Interleave a worked example with fading support',
  'Require a prediction before running the experiment',
  'Diagnose math errors separately from physics misconceptions',
  'Assess transfer in a changed vehicle situation',
  'Schedule retrieval before a dependent capability unlocks',
]

export function validateCourseArchitecture() {
  const levelIds = curriculumLevels.map((level) => level.id)
  const moduleIds = courseModules.map((module) => module.id)
  const duplicateModules = moduleIds.filter((id, index) => moduleIds.indexOf(id) !== index)
  const invalidDepths = courseModules.flatMap((module) => {
    const depthIds = module.depths.map((depth) => depth.level)
    const missing = levelIds.filter((id) => !depthIds.includes(id)).map((id) => `${module.id}:missing:${id}`)
    const duplicates = depthIds.filter((id, index) => depthIds.indexOf(id) !== index).map((id) => `${module.id}:duplicate:${id}`)
    const unknown = depthIds.filter((id) => !levelIds.includes(id)).map((id) => `${module.id}:unknown:${id}`)
    return [...missing, ...duplicates, ...unknown]
  })
  return { valid: duplicateModules.length === 0 && invalidDepths.length === 0, duplicateModules, invalidDepths }
}
