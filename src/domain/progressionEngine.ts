import { componentById, components } from '../data/components'
import { conceptById, concepts } from '../data/curriculum'
import { progressionTargetById, progressionTargets } from '../data/progression'
import type { AcademicTier, ConceptMastery, MasteryRequirement, ProgressionTarget } from './model'
import { isBroadlyMastered } from './mastery'

export type MasteryMap = Record<string, ConceptMastery>

export interface RequirementResult extends MasteryRequirement {
  current: number
  met: boolean
  conceptTitle: string
}

export function evaluateRequirements(requirements: MasteryRequirement[], mastery: MasteryMap): RequirementResult[] {
  return requirements.map((requirement) => {
    const current = mastery[requirement.conceptId]?.[requirement.dimension] ?? 0
    return { ...requirement, current, met: current >= requirement.threshold, conceptTitle: conceptById[requirement.conceptId]?.title ?? requirement.conceptId }
  })
}

export function canAccessTarget(targetId: string, mastery: MasteryMap) {
  const target = progressionTargetById[targetId]
  return Boolean(target && evaluateRequirements(target.requirements, mastery).every((requirement) => requirement.met))
}

export function getMissingPrerequisites(targetId: string, mastery: MasteryMap) {
  const target = progressionTargetById[targetId]
  return target ? evaluateRequirements(target.requirements, mastery).filter((requirement) => !requirement.met) : []
}

export function canAccessConcept(conceptId: string, mastery: MasteryMap) {
  const concept = conceptById[conceptId]
  return Boolean(concept && concept.prerequisites.every((id) => isBroadlyMastered(mastery[id])))
}

export function canInspectComponent(componentId: string, mastery: MasteryMap, depth: 'orientation' | 'basic' | 'intermediate' | 'advanced' | 'research' = 'basic') {
  const component = componentById[componentId]
  if (!component) return false
  if (componentId === 'vehicle-shell') return true
  const mappings = component.conceptAccess?.filter((mapping) => mapping.depth === depth) ?? []
  return mappings.length > 0 && mappings.some((mapping) => evaluateRequirements(mapping.requirements, mastery).every((result) => result.met))
}

export function canUseInstrument(instrumentId: string, mastery: MasteryMap) {
  const target = progressionTargetById[instrumentId]
  return Boolean(target?.kind === 'instrument' && canAccessTarget(instrumentId, mastery))
}

export function canRunExperiment(experimentId: string, mastery: MasteryMap) {
  const target = progressionTargetById[experimentId]
  return Boolean(target?.kind === 'experiment' && canAccessTarget(experimentId, mastery))
}

export function canAccessDepth(conceptId: string, tier: AcademicTier, mastery: MasteryMap) {
  const depth = conceptById[conceptId]?.depths?.find((item) => item.academicTier === tier)
  return Boolean(depth && depth.requiredPhysics.every((id) => isBroadlyMastered(mastery[id])))
}

export function getNextRecommendedConcepts(mastery: MasteryMap) {
  return concepts.filter((concept) => !isBroadlyMastered(mastery[concept.id]) && canAccessConcept(concept.id, mastery)).slice(0, 5)
}

export function getNewlyUnlockedCapabilities(before: MasteryMap, after: MasteryMap): ProgressionTarget[] {
  return progressionTargets.filter((target) => !canAccessTarget(target.id, before) && canAccessTarget(target.id, after))
}

export function getWeakPrerequisites(targetId: string, mastery: MasteryMap) {
  const target = progressionTargetById[targetId]
  if (!target) return []
  return evaluateRequirements(target.requirements, mastery).filter((result) => result.met && (mastery[result.conceptId]?.recentPerformance ?? 0) < 0.55)
}

export function getApplicableVehicleExamples(conceptId: string) {
  return components.filter((component) => component.physicsConcepts.includes(conceptId))
}

export function describeTarget(targetId: string): ProgressionTarget | undefined {
  return progressionTargetById[targetId]
}
