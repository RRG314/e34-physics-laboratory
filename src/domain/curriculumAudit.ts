import { components } from '../data/components'
import { concepts } from '../data/curriculum'
import { progressionTargets } from '../data/progression'
import { validateConceptGraph } from './curriculumGraph'

export interface AuditFinding {
  severity: 'error' | 'warning'
  code: string
  subject: string
  message: string
}

const tierRank = { foundation: 0, tier1: 1, tier2: 2, tier3: 3, tier4: 4 }

export function auditCurriculum(): AuditFinding[] {
  const findings: AuditFinding[] = []
  const byId = Object.fromEntries(concepts.map((concept) => [concept.id, concept]))
  const graph = validateConceptGraph(concepts)
  for (const missing of graph.missing) findings.push({ severity: 'error', code: 'MISSING_PREREQUISITE', subject: missing, message: 'Prerequisite identifier does not exist.' })
  for (const cycle of graph.cycles) findings.push({ severity: 'error', code: 'PREREQUISITE_CYCLE', subject: cycle.join(' -> '), message: 'Academic prerequisite graph contains a cycle.' })

  for (const concept of concepts) {
    if (concept.vehicleLinks.length === 0) findings.push({ severity: 'warning', code: 'NO_VEHICLE_EXAMPLE', subject: concept.id, message: 'Concept has no vehicle-system mapping.' })
    for (const prerequisite of concept.prerequisites) {
      if (byId[prerequisite] && tierRank[byId[prerequisite].tier] > tierRank[concept.tier]) findings.push({ severity: 'error', code: 'TIER_INVERSION', subject: concept.id, message: `${prerequisite} is assigned to a higher academic tier.` })
    }
    for (const depth of concept.depths ?? []) {
      if (depth.academicTier === 'tier4' && (depth.requiredMath.length === 0 || !depth.assessmentMethods.some((item) => /validation|residual|uncertainty|model/i.test(item)))) {
        findings.push({ severity: 'error', code: 'WEAK_RESEARCH_SCAFFOLD', subject: `${concept.id}:${depth.academicTier}`, message: 'Research treatment lacks mathematical prerequisites or model-validation assessment.' })
      }
    }
  }

  for (const component of components) {
    for (const conceptId of component.physicsConcepts) if (!byId[conceptId]) findings.push({ severity: 'error', code: 'UNKNOWN_COMPONENT_CONCEPT', subject: component.id, message: `Maps to nonexistent concept ${conceptId}.` })
    for (const mapping of component.conceptAccess ?? []) {
      if (!byId[mapping.conceptId]) findings.push({ severity: 'error', code: 'UNKNOWN_ACCESS_CONCEPT', subject: component.id, message: `Access mapping references nonexistent concept ${mapping.conceptId}.` })
      for (const requirement of mapping.requirements) if (!byId[requirement.conceptId]) findings.push({ severity: 'error', code: 'IMPOSSIBLE_COMPONENT_GATE', subject: component.id, message: `Gate references nonexistent concept ${requirement.conceptId}.` })
    }
  }

  for (const target of progressionTargets) {
    if (target.requirements.length === 0) findings.push({ severity: 'warning', code: 'EMPTY_GATE', subject: target.id, message: 'Progression target has no academically meaningful requirement.' })
    for (const requirement of target.requirements) if (!byId[requirement.conceptId]) findings.push({ severity: 'error', code: 'IMPOSSIBLE_TARGET_GATE', subject: target.id, message: `Gate references nonexistent concept ${requirement.conceptId}.` })
  }

  const titleGroups = concepts.reduce<Record<string, typeof concepts>>((groups, concept) => {
    const title = concept.title.toLowerCase()
    groups[title] = [...(groups[title] ?? []), concept]
    return groups
  }, {})
  for (const [title, group] of Object.entries(titleGroups)) if (group.length > 1) findings.push({ severity: 'warning', code: 'DUPLICATE_CONCEPT', subject: title, message: 'Use depth treatments instead of duplicate concepts.' })
  return findings
}
