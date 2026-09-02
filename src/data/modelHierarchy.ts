export type ModelLevel = 'idealized' | 'intermediate' | 'engineering' | 'high-fidelity' | 'experimental'

export interface ModelProfile {
  id: ModelLevel
  title: string
  available: boolean
  assumptions: string[]
  neglectedEffects: string[]
  equations: string[]
  numericalMethod: string
  timestep: string
  validity: string
  limitations: string
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  parameterSource: string
}

export const modelHierarchy: ModelProfile[] = [
  { id: 'idealized', title: 'Idealized', available: true, assumptions: ['point-mass translation', 'flat road', 'constant commanded acceleration', 'rigid no-slip wheels'], neglectedEffects: ['aerodynamic drag', 'rolling resistance', 'drivetrain loss', 'load transfer'], equations: ['ẋ = v', 'v̇ = a', 'v = rω'], numericalMethod: 'semi-analytical fixed-step integration', timestep: '≤ 0.10 s', validity: 'Low-speed, one-dimensional concept studies', limitations: 'Not a performance prediction for the real vehicle.', confidence: 'HIGH', parameterSource: 'Declared educational assumptions' },
  { id: 'intermediate', title: 'Intermediate road load', available: true, assumptions: ['flat road', 'lumped vehicle mass', 'no tire slip'], neglectedEffects: ['grade', 'wind', 'transient drivetrain loss', 'load transfer'], equations: ['v̇ = a_cmd − a_roll − k_drag v²'], numericalMethod: 'fixed-step explicit integration', timestep: '≤ 0.10 s', validity: 'Qualitative road-load comparisons below 90 km/h', limitations: 'Road-load coefficients are provisional, not calibrated.', confidence: 'LOW', parameterSource: 'Provisional engineering approximation' },
  { id: 'engineering', title: 'Engineering approximation', available: true, assumptions: ['lumped longitudinal dynamics', 'quasi-steady road load'], neglectedEffects: ['full tire model', 'powertrain transients', 'wind yaw'], equations: ['m v̇ = F_drive − F_brake − Crr mg − ½ρCdAv²'], numericalMethod: 'fixed-step explicit integration', timestep: '≤ 0.05 s', validity: 'Sensitivity studies, not homologation or safety analysis', limitations: 'Mass and drag inputs remain unresolved for the exact car.', confidence: 'LOW', parameterSource: 'Mixed sourced and unresolved E34 parameters' },
  { id: 'high-fidelity', title: 'High-fidelity numerical model', available: false, assumptions: ['to be declared with solver implementation'], neglectedEffects: ['not yet characterized'], equations: ['future coupled tire/powertrain/chassis model'], numericalMethod: 'not implemented', timestep: 'not selected', validity: 'Unavailable', limitations: 'Architecture target only.', confidence: 'LOW', parameterSource: 'Placeholder' },
  { id: 'experimental', title: 'Experimental comparison', available: false, assumptions: ['dataset-specific metadata and uncertainty required'], neglectedEffects: ['dataset-specific'], equations: ['residual = measurement − prediction'], numericalMethod: 'future calibration and residual analysis', timestep: 'measurement-dependent', validity: 'Unavailable until a real dataset is imported', limitations: 'Must never be labeled an exact digital twin without validation.', confidence: 'LOW', parameterSource: 'Future physical E34 measurements' },
]

export const modelById = Object.fromEntries(modelHierarchy.map((profile) => [profile.id, profile]))
