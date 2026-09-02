import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ConceptMastery, MasteryDimension } from '../domain/model'
import { emptyMastery, updateMastery } from '../domain/mastery'

type MasteryMap = Record<string, ConceptMastery>

function seedMastery(): MasteryMap {
  const units = emptyMastery('units')
  units.exposure = 0.75
  units.conceptualUnderstanding = 0.45
  units.measurementSkill = 0.35
  const distanceTime = emptyMastery('distance-time')
  distanceTime.exposure = 0.65
  distanceTime.conceptualUnderstanding = 0.35
  return { units, 'distance-time': distanceTime }
}

const motionGains: Record<number, { conceptId: string; gains: Partial<Record<MasteryDimension, number>> }[]> = {
  0: [
    { conceptId: 'units', gains: { conceptualUnderstanding: 0.35, measurementSkill: 0.4 } },
    { conceptId: 'coordinates', gains: { exposure: 0.8, conceptualUnderstanding: 0.75, measurementSkill: 0.65 } },
    { conceptId: 'distance-time', gains: { conceptualUnderstanding: 0.35, measurementSkill: 0.45 } },
    { conceptId: 'position', gains: { exposure: 0.8, conceptualUnderstanding: 0.75, graphInterpretation: 0.55 } },
    { conceptId: 'displacement', gains: { exposure: 0.8, conceptualUnderstanding: 0.7, calculationSkill: 0.65 } },
  ],
  1: [{ conceptId: 'speed', gains: { exposure: 0.85, conceptualUnderstanding: 0.75, calculationSkill: 0.75, predictionSkill: 0.65, experimentalSkill: 0.45 } }],
  2: [{ conceptId: 'velocity', gains: { exposure: 0.85, conceptualUnderstanding: 0.75, calculationSkill: 0.7, graphInterpretation: 0.55, predictionSkill: 0.65 } }],
  3: [
    { conceptId: 'acceleration', gains: { exposure: 0.85, conceptualUnderstanding: 0.75, calculationSkill: 0.7, graphInterpretation: 0.55, predictionSkill: 0.75, experimentalSkill: 0.5 } },
    { conceptId: 'motion-mastery', gains: { exposure: 1, conceptualUnderstanding: 0.8, applicationSkill: 0.65, validationSkill: 0.5 } },
  ],
}

const wheelGains: Record<number, { conceptId: string; gains: Partial<Record<MasteryDimension, number>> }[]> = {
  0: [{ conceptId: 'wheel-circumference', gains: { exposure: 0.9, conceptualUnderstanding: 0.75, calculationSkill: 0.75, measurementSkill: 0.6 } }],
  1: [{ conceptId: 'angular-motion', gains: { exposure: 0.9, conceptualUnderstanding: 0.75, calculationSkill: 0.65, predictionSkill: 0.7, applicationSkill: 0.45 } }],
}

interface LearnerState {
  mastery: MasteryMap
  motionMissionIndex: number
  wheelMissionIndex: number
  selectedComponentId: string | null
  exploded: boolean
  fidelity: 'A' | 'B'
  completeMotionStep: (step: number) => void
  completeWheelStep: (step: number) => void
  recordAttempt: (conceptId: string, gains: Partial<Record<MasteryDimension, number>>, correct: boolean) => void
  selectComponent: (id: string | null) => void
  setExploded: (value: boolean) => void
  setFidelity: (value: 'A' | 'B') => void
  resetProgress: () => void
  unlockForTesting: () => void
}

function applyGains(mastery: MasteryMap, entries: { conceptId: string; gains: Partial<Record<MasteryDimension, number>> }[]) {
  const next = { ...mastery }
  for (const entry of entries) next[entry.conceptId] = updateMastery(next[entry.conceptId], entry.conceptId, entry.gains)
  return next
}

export const useLearnerStore = create<LearnerState>()(
  persist(
    (set) => ({
      mastery: seedMastery(),
      motionMissionIndex: 0,
      wheelMissionIndex: 0,
      selectedComponentId: null,
      exploded: false,
      fidelity: 'A',
      completeMotionStep: (step) => set((state) => step === state.motionMissionIndex ? { mastery: applyGains(state.mastery, motionGains[step] ?? []), motionMissionIndex: Math.min(4, step + 1) } : state),
      completeWheelStep: (step) => set((state) => step === state.wheelMissionIndex ? { mastery: applyGains(state.mastery, wheelGains[step] ?? []), wheelMissionIndex: Math.min(2, step + 1) } : state),
      recordAttempt: (conceptId, gains, correct) => set((state) => ({ mastery: { ...state.mastery, [conceptId]: updateMastery(state.mastery[conceptId], conceptId, gains, correct) } })),
      selectComponent: (selectedComponentId) => set({ selectedComponentId }),
      setExploded: (exploded) => set({ exploded }),
      setFidelity: (fidelity) => set({ fidelity }),
      resetProgress: () => set({ mastery: seedMastery(), motionMissionIndex: 0, wheelMissionIndex: 0, selectedComponentId: null, exploded: false, fidelity: 'A' }),
      unlockForTesting: () => set((state) => ({
        mastery: applyGains(state.mastery, [...Object.values(motionGains).flat(), ...Object.values(wheelGains).flat()]),
        motionMissionIndex: 4,
        wheelMissionIndex: 2,
      })),
    }),
    {
      name: 'e34-physics-lab-learner-v2', version: 2, storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ mastery: state.mastery, motionMissionIndex: state.motionMissionIndex, wheelMissionIndex: state.wheelMissionIndex, fidelity: state.fidelity }),
    },
  ),
)
