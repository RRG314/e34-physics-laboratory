export type EvidenceStatus =
  | 'VERIFIED'
  | 'PROVISIONAL'
  | 'ESTIMATED'
  | 'PLACEHOLDER'
  | 'NEEDS_MEASUREMENT'
  | 'NEEDS_SOURCE'

export type SourceClass =
  | 'manufacturer_archive'
  | 'independent_technical_manual'
  | 'university_curriculum'
  | 'open_textbook'
  | 'education_standard'
  | 'research_based_curriculum'
  | 'government_practice_guide'
  | 'peer_reviewed_research'
  | 'official_software_documentation'
  | 'independent_specification'
  | 'simulation_assumption'
  | 'licensed_visual_asset'

export interface SourceRecord {
  id: string
  title: string
  organization: string
  url?: string
  localPath?: string
  sourceClass: SourceClass
  reliability: 'primary' | 'authoritative_secondary' | 'secondary' | 'assumption'
  applicability: string
  usage: string
  licensing: string
  accessed: string
}

export interface SourcedValue<T> {
  value: T
  unit: string
  status: EvidenceStatus
  sourceIds: string[]
  pageOrSection?: string
  note?: string
  derivation?: string
}

export type AcademicTier = 'foundation' | 'tier1' | 'tier2' | 'tier3' | 'tier4'

export interface Concept {
  id: string
  title: string
  shortTitle: string
  tier: AcademicTier
  domain: 'measurement' | 'kinematics' | 'dynamics' | 'rotation' | 'thermodynamics' | 'electrical' | 'waves' | 'mathematics'
  prerequisites: string[]
  unlocks: string[]
  vehicleLinks: string[]
  sourceIds: string[]
  learningGoal: string
  labQuestion: string
  status: 'available' | 'mapped_future'
  recommendedReinforcement?: string[]
  optionalEnrichment?: string[]
  depths?: ConceptDepth[]
}

export type MasteryDimension =
  | 'exposure'
  | 'conceptualUnderstanding'
  | 'calculationSkill'
  | 'graphInterpretation'
  | 'predictionSkill'
  | 'measurementSkill'
  | 'experimentalSkill'
  | 'applicationSkill'
  | 'diagnosticSkill'
  | 'modelingSkill'
  | 'derivationSkill'
  | 'validationSkill'

export interface ConceptDepth {
  conceptId: string
  academicTier: AcademicTier
  requiredMath: string[]
  requiredPhysics: string[]
  learningObjectives: string[]
  equations: string[]
  assumptions: string[]
  vehicleExamples: string[]
  experiments: string[]
  assessmentMethods: string[]
  misconceptions: string[]
  unlockEffects: string[]
  advancedConnections: string[]
}

export interface ConceptMastery {
  conceptId: string
  exposure: number
  conceptualUnderstanding: number
  calculationSkill: number
  graphInterpretation: number
  predictionSkill: number
  measurementSkill: number
  experimentalSkill: number
  applicationSkill: number
  diagnosticSkill: number
  modelingSkill: number
  derivationSkill: number
  validationSkill: number
  confidence: number
  attempts: number
  recentPerformance: number
  lastUsed: string | null
}

export interface MasteryRequirement {
  conceptId: string
  dimension: MasteryDimension
  threshold: number
}

export interface ProgressionTarget {
  id: string
  kind: 'capability' | 'component' | 'instrument' | 'experiment' | 'depth'
  title: string
  description: string
  requirements: MasteryRequirement[]
  unlockEffect: string
}

export interface VehicleGraphEdge {
  from: string
  to: string
  relation:
    | 'contains'
    | 'drives'
    | 'supports'
    | 'transfers-energy-to'
    | 'transfers-force-to'
    | 'supplies-fluid-to'
    | 'supplies-current-to'
    | 'measures'
    | 'controls'
    | 'mechanically-coupled-to'
    | 'thermally-coupled-to'
    | 'electrically-coupled-to'
}

export interface VehicleComponent {
  id: string
  name: string
  parentId: string | null
  system: string
  selectable: boolean
  unlockConceptId?: string
  physicsConcepts: string[]
  explosionVector: [number, number, number]
  explosionDistance: number
  explosionStage: number
  serviceRemovalOrder?: number
  dataStatus: EvidenceStatus
  conceptAccess?: {
    conceptId: string
    academicTier: AcademicTier
    requirements: MasteryRequirement[]
    depth: 'orientation' | 'basic' | 'intermediate' | 'advanced' | 'research'
  }[]
}
