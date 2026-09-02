export type AssessmentErrorCategory =
  | 'conceptual misunderstanding' | 'mathematical manipulation error' | 'unit error'
  | 'sign convention error' | 'coordinate-system error' | 'incorrect model selection'
  | 'arithmetic error' | 'measurement error' | 'graph interpretation error'
  | 'incorrect assumption' | 'insufficient precision' | 'vehicle-system misunderstanding'

export interface DiagnosticEvent {
  id: string
  conceptId: string
  category: AssessmentErrorCategory
  response: string
  remediation: string
  mathConceptId?: string
  createdAt: string
}

const matrix: Record<number, Record<number, Omit<DiagnosticEvent, 'id' | 'conceptId' | 'response' | 'createdAt'>>> = {
  0: {
    12: { category: 'sign convention error', remediation: 'Keep the magnitude, then use the chosen +X direction to determine the sign.' },
    [-4]: { category: 'conceptual misunderstanding', remediation: 'Displacement is a change between two positions, not the final coordinate alone.' },
  },
  1: {
    12: { category: 'arithmetic error', remediation: 'Multiply the full velocity by the full elapsed time.', mathConceptId: 'math-arithmetic' },
    72: { category: 'incorrect model selection', remediation: 'For constant speed use x = vt once; no acceleration term is active.' },
  },
  2: {
    12: { category: 'sign convention error', remediation: 'The negative velocity already encodes motion opposite +X.' },
    6: { category: 'unit error', remediation: 'Velocity multiplied by time produces metres, and both numerical factors still apply.', mathConceptId: 'math-unit-conversion' },
  },
  3: {
    10: { category: 'conceptual misunderstanding', remediation: 'The 10 m/s change must be added to the nonzero initial velocity.' },
    7: { category: 'mathematical manipulation error', remediation: 'Evaluate acceleration × time before adding initial velocity.', mathConceptId: 'math-solving-equations' },
  },
}

export function diagnoseMotionAnswer(missionIndex: number, conceptId: string, response: number): DiagnosticEvent {
  const diagnosis = matrix[missionIndex]?.[response] ?? { category: 'conceptual misunderstanding' as const, remediation: 'Revisit what each quantity represents before calculating again.' }
  return { id: `${Date.now()}-${missionIndex}-${response}`, conceptId, response: String(response), createdAt: new Date().toISOString(), ...diagnosis }
}
