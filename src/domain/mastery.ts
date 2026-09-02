import type { ConceptMastery, MasteryDimension } from './model'

export const masteryDimensions: MasteryDimension[] = [
  'exposure', 'conceptualUnderstanding', 'calculationSkill', 'graphInterpretation', 'predictionSkill', 'measurementSkill',
  'experimentalSkill', 'applicationSkill', 'diagnosticSkill', 'modelingSkill', 'derivationSkill', 'validationSkill',
]

export function emptyMastery(conceptId: string): ConceptMastery {
  return {
    conceptId,
    exposure: 0,
    conceptualUnderstanding: 0,
    calculationSkill: 0,
    graphInterpretation: 0,
    predictionSkill: 0,
    measurementSkill: 0,
    experimentalSkill: 0,
    applicationSkill: 0,
    diagnosticSkill: 0,
    modelingSkill: 0,
    derivationSkill: 0,
    validationSkill: 0,
    confidence: 0,
    attempts: 0,
    recentPerformance: 0,
    lastUsed: null,
  }
}

export function updateMastery(current: ConceptMastery | undefined, conceptId: string, gains: Partial<Record<MasteryDimension, number>>, correct = true): ConceptMastery {
  const base = current ?? emptyMastery(conceptId)
  const next = { ...base }
  for (const [dimension, gain] of Object.entries(gains) as [MasteryDimension, number][]) {
    next[dimension] = Math.max(0, Math.min(1, next[dimension] + gain))
  }
  next.attempts += 1
  next.recentPerformance = Math.max(0, Math.min(1, base.recentPerformance * 0.65 + (correct ? 1 : 0) * 0.35))
  next.confidence = Math.max(0, Math.min(1, base.confidence + (correct ? 0.12 : -0.08)))
  next.lastUsed = new Date().toISOString()
  return next
}

export function isBroadlyMastered(mastery: ConceptMastery | undefined) {
  return Boolean(mastery && mastery.exposure >= 0.6 && mastery.conceptualUnderstanding >= 0.6)
}
