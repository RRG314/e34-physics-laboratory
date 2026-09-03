import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { DiagnosticEvent } from '../domain/assessmentDiagnostics'
import type { ModelLevel } from '../data/modelHierarchy'

export interface MathematicsMastery { conceptual: number; procedural: number; confidence: number; attempts: number }
export interface NotebookEntry { id: string; kind: 'prediction' | 'measurement' | 'conclusion' | 'correction' | 'dataset'; title: string; body: string; createdAt: string }

interface LabLearningState {
  mathematicsMastery: Record<string, MathematicsMastery>
  diagnostics: DiagnosticEvent[]
  notebook: NotebookEntry[]
  modelLevel: ModelLevel
  overlay: 'none' | 'vectors' | 'energy'
  recordDiagnostic: (event: DiagnosticEvent) => void
  recordMathematicsEvidence: (conceptId: string, conceptual: number, procedural: number) => void
  addNotebookEntry: (entry: Omit<NotebookEntry, 'id' | 'createdAt'>) => void
  setModelLevel: (level: ModelLevel) => void
  setOverlay: (overlay: 'none' | 'vectors' | 'energy') => void
  clearNotebook: () => void
  resetLearning: () => void
}

export const useLabLearningStore = create<LabLearningState>()(
  persist(
    (set) => ({
      mathematicsMastery: {}, diagnostics: [], notebook: [], modelLevel: 'idealized', overlay: 'none',
      recordDiagnostic: (event) => set((state) => ({ diagnostics: [event, ...state.diagnostics].slice(0, 40) })),
      recordMathematicsEvidence: (conceptId, conceptual, procedural) => set((state) => {
        const current = state.mathematicsMastery[conceptId] ?? { conceptual: 0, procedural: 0, confidence: 0, attempts: 0 }
        return { mathematicsMastery: { ...state.mathematicsMastery, [conceptId]: { conceptual: Math.max(current.conceptual, conceptual), procedural: Math.max(current.procedural, procedural), confidence: Math.min(1, current.confidence + 0.2), attempts: current.attempts + 1 } } }
      }),
      addNotebookEntry: (entry) => set((state) => ({ notebook: [{ ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...state.notebook].slice(0, 100) })),
      setModelLevel: (modelLevel) => set({ modelLevel }), setOverlay: (overlay) => set({ overlay }), clearNotebook: () => set({ notebook: [] }),
      resetLearning: () => set({ mathematicsMastery: {}, diagnostics: [], notebook: [], modelLevel: 'idealized', overlay: 'none' }),
    }),
    { name: 'e34-physics-lab-learning-v1', storage: createJSONStorage(() => localStorage) },
  ),
)
