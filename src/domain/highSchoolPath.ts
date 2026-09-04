import { getFoundationPath, type FoundationPathInput } from './foundationPath'

export interface HighSchoolPathInput extends FoundationPathInput {
  dynamicsMissionIndex: number
}

export interface DynamicsPathStage {
  id: 'net-force' | 'ramp-forces' | 'energy-climb' | 'impact-design'
  number: number
  title: string
  description: string
  route: string
  complete: boolean
  available: boolean
  outcome: string
}

const dynamicsStageData = [
  { id: 'net-force', title: 'Connect force to acceleration', description: 'Infer net force from declared mass and a measured velocity slope.', outcome: 'ΣF = ma · proportional reasoning · force units' },
  { id: 'ramp-forces', title: 'Resolve gravity on a ramp', description: 'Build a ramp free-body model and test the parallel component of weight.', outcome: 'Force components · signs · right-triangle trigonometry' },
  { id: 'energy-climb', title: 'Close an energy budget', description: 'Follow kinetic energy into gravitational potential energy on the same ramp.', outcome: 'Squared speed · joules · conserved mechanical energy' },
  { id: 'impact-design', title: 'Design a longer stopping pulse', description: 'Compare safe virtual impact pulses using momentum, impulse, and graph area.', outcome: 'Momentum change · impulse · force–time area · transfer' },
] as const

export function isFoundationPathComplete(input: FoundationPathInput) {
  return getFoundationPath(input).every((stage) => stage.complete)
}

export function getDynamicsPath(input: HighSchoolPathInput): DynamicsPathStage[] {
  const foundationComplete = isFoundationPathComplete(input)
  return dynamicsStageData.map((stage, index) => ({
    ...stage,
    number: index + 5,
    route: '/track',
    complete: input.dynamicsMissionIndex > index,
    available: foundationComplete && input.dynamicsMissionIndex >= index,
  }))
}

export function getNextHighSchoolStage(input: HighSchoolPathInput) {
  const foundation = getFoundationPath(input)
  const dynamics = getDynamicsPath(input)
  return [...foundation, ...dynamics].find((stage) => !stage.complete) ?? null
}

export function highSchoolProgress(input: HighSchoolPathInput) {
  const stages = [...getFoundationPath(input), ...getDynamicsPath(input)]
  const completed = stages.filter((stage) => stage.complete).length
  return { completed, total: stages.length, percent: Math.round(completed / stages.length * 100) }
}
