import { describe, expect, it } from 'vitest'
import { deriveTireGeometry, distanceAfterRevolutions, teachingTire, wheelRpm } from '../src/domain/tireMath'
import { idealDrop, rampClimb, rectangularImpactPulse } from '../src/domain/trackPhysics'
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
import { motionLessons, validateMotionLessons } from '../src/data/motionLessons'
import { courseModules, courseStages, curriculumLevels, validateCourseArchitecture, vehicleProgression } from '../src/data/courseArchitecture'
import { sourceById } from '../src/data/sources'

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

  it('keeps the first production course on one consistent 525i', () => {
    expect(courseStages.every((stage) => stage.model.includes('525i'))).toBe(true)
    expect(vehicleProgression.every((stage) => stage.model.includes('525i'))).toBe(true)
  })

  it('gives every recurring domain one treatment at every academic depth', () => {
    expect(validateCourseArchitecture()).toEqual({ valid: true, duplicateModules: [], invalidDepths: [] })
    expect(courseModules).toHaveLength(10)
    expect(courseModules.every((module) => module.depths.length === curriculumLevels.length)).toBe(true)
    expect(courseModules.flatMap((module) => module.depths).every((depth) => depth.mathematics.length > 0 && depth.vehicleMission && depth.evidence && depth.unlock)).toBe(true)
    expect(courseModules.flatMap((module) => module.sourceIds).filter((sourceId) => !sourceById[sourceId])).toEqual([])
  })
})

describe('learning quality systems', () => {
  it('keeps motion lessons data-driven and requires calculation plus graph evidence', () => {
    expect(validateMotionLessons()).toEqual({ valid: true, duplicateIds: [], invalidIds: [] })
    expect(motionLessons.every((lesson) => lesson.calculationEvidence.length > 0 && lesson.graphEvidence.length > 0)).toBe(true)
  })

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

  it('derives the teaching tire geometry and wheel speed from dimensional inputs', () => {
    const geometry = deriveTireGeometry(teachingTire)
    expect(geometry.sidewallHeightMm).toBeCloseTo(133.25)
    expect(geometry.rimDiameterMm).toBeCloseTo(381)
    expect(geometry.unloadedDiameterMm).toBeCloseTo(647.5)
    expect(geometry.circumferenceM).toBeCloseTo(2.03418, 4)
    expect(wheelRpm(100, geometry.circumferenceM)).toBeCloseTo(819.3, 1)
    expect(distanceAfterRevolutions(10, geometry.unloadedRadiusM)).toBeCloseTo(geometry.circumferenceM * 10)
  })
})

describe('virtual proving ground', () => {
  it('conserves energy in the ideal drop model', () => {
    const drop = idealDrop(20)
    expect(.5 * drop.impactSpeed ** 2).toBeCloseTo(drop.specificEnergy, 10)
  })

  it('keeps impact impulse fixed while stop time changes force', () => {
    const short = rectangularImpactPulse(1600, 10, .1)
    const long = rectangularImpactPulse(1600, 10, .2)
    expect(short.impulse).toBe(long.impulse)
    expect(short.averageForce).toBeCloseTo(long.averageForce * 2)
  })

  it('returns the kinematic stopping distance for an ideal ramp climb', () => {
    const ramp = rampClimb(12, 15)
    expect(2 * ramp.accelerationMagnitude * ramp.distance).toBeCloseTo(12 ** 2, 10)
  })
})
