import { describe, expect, it } from 'vitest'
import { concepts } from '../src/data/curriculum'
import { targetVehicle } from '../src/data/vehicle'
import { validateConceptGraph } from '../src/domain/curriculumGraph'
import { constantAcceleration, radiansPerSecondToRpm, wheelAngularSpeed } from '../src/physics/kinematics'
import { auditCurriculum } from '../src/domain/curriculumAudit'
import { canAccessTarget, getMissingPrerequisites } from '../src/domain/progressionEngine'
import { emptyMastery } from '../src/domain/mastery'
import { validateMathematicsGraph, mathematicsForPhysics } from '../src/data/mathematics'
import { convert, dimensions, quantity, validateDimensions } from '../src/domain/quantity'
import { diagnoseMotionAnswer } from '../src/domain/assessmentDiagnostics'
import { generateMotionProblem, validateGeneratedProblem } from '../src/domain/problemGenerator'
import { parseMeasurementCsv } from '../src/domain/experiments'

describe('kinematics', () => {
  it('matches the analytical constant-acceleration solution', () => {
    expect(constantAcceleration(0, 2, 3, 4)).toEqual({ position: 32, velocity: 14, acceleration: 3, elapsed: 4 })
  })

  it('maps linear wheel speed through v = r omega', () => {
    const radius = targetVehicle.runningGear.unloadedWheelRadius.value
    const omega = wheelAngularSpeed(10, radius)
    expect(omega * radius).toBeCloseTo(10, 10)
    expect(radiansPerSecondToRpm(omega)).toBeGreaterThan(290)
  })
})

describe('curriculum graph', () => {
  it('has no missing prerequisites or cycles', () => {
    expect(validateConceptGraph(concepts)).toEqual({ valid: true, missing: [], cycles: [] })
  })

  it('passes the expanded curriculum and vehicle mapping audit', () => {
    expect(auditCurriculum().filter((finding) => finding.severity === 'error')).toEqual([])
  })
})

describe('progression engine', () => {
  it('explains a locked capability with specific mastery dimensions', () => {
    expect(canAccessTarget('controlled-drive', {})).toBe(false)
    expect(getMissingPrerequisites('controlled-drive', {}).map((item) => item.dimension)).toEqual([
      'calculationSkill', 'conceptualUnderstanding', 'predictionSkill', 'graphInterpretation',
    ])
  })

  it('unlocks wheel telemetry only after circumference and angular mastery', () => {
    const circumference = emptyMastery('wheel-circumference')
    circumference.calculationSkill = 0.7
    const angular = emptyMastery('angular-motion')
    angular.conceptualUnderstanding = 0.7
    angular.predictionSkill = 0.65
    expect(canAccessTarget('wheel-telemetry', { 'wheel-circumference': circumference, 'angular-motion': angular })).toBe(true)
  })
})

describe('vehicle provenance', () => {
  it('does not fabricate the unresolved final-drive ratio', () => {
    expect(targetVehicle.drivetrain.finalDriveRatio.value).toBeNull()
    expect(targetVehicle.drivetrain.finalDriveRatio.status).toBe('NEEDS_SOURCE')
  })
})

describe('learning quality systems', () => {
  it('keeps the mathematics graph valid and linked just in time to physics', () => {
    expect(validateMathematicsGraph()).toEqual({ valid: true, missing: [], cycles: [] })
    expect(mathematicsForPhysics('angular-motion').map((item) => item.id)).toContain('math-geometry')
  })

  it('converts quantities and rejects dimensional mismatch', () => {
    expect(convert(quantity(36, 'km/h'), 'm/s').value).toBeCloseTo(10)
    expect(validateDimensions(dimensions.force, dimensions.energy).valid).toBe(false)
  })

  it('distinguishes sign failure from arithmetic failure', () => {
    expect(diagnoseMotionAnswer(0, 'displacement', 12).category).toBe('sign convention error')
    expect(diagnoseMotionAnswer(1, 'speed', 12).category).toBe('arithmetic error')
  })

  it('generates reproducible and physically constrained problems', () => {
    expect(generateMotionProblem(525)).toEqual(generateMotionProblem(525))
    expect(validateGeneratedProblem(generateMotionProblem(525)).valid).toBe(true)
  })

  it('parses measurement values with uncertainty', () => {
    expect(parseMeasurementCsv('time,value,unit,uncertainty\n0,0.646,m,0.003')).toEqual([{ time: 0, value: 0.646, unit: 'm', uncertainty: 0.003 }])
  })
})
