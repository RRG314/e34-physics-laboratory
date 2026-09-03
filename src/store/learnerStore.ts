import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ConceptMastery, MasteryDimension } from '../domain/model'
import { updateMastery } from '../domain/mastery'

type MasteryMap = Record<string, ConceptMastery>

const wheelGains: Record<number, { conceptId: string; gains: Partial<Record<MasteryDimension, number>> }[]> = {
  0: [{ conceptId: 'wheel-circumference', gains: { exposure: 0.9, conceptualUnderstanding: 0.75, calculationSkill: 0.75, measurementSkill: 0.6 } }],
  1: [{ conceptId: 'angular-motion', gains: { exposure: 0.9, conceptualUnderstanding: 0.75, calculationSkill: 0.65, predictionSkill: 0.7, applicationSkill: 0.45 } }],
}

interface LearnerState {
  mastery: MasteryMap
  motionMissionIndex: number
  wheelMissionIndex: number
  driveChallengeComplete: boolean
  selectedComponentId: string | null
  exploded: boolean
  fidelity: 'A' | 'B'
  completeMotionStep: (step: number) => void
  completeWheelStep: (step: number) => void
  completeDriveChallenge: () => void
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
      mastery: {},
      motionMissionIndex: 0,
      wheelMissionIndex: 0,
      driveChallengeComplete: false,
      selectedComponentId: null,
      exploded: false,
      fidelity: 'A',
      completeMotionStep: (step) => set((state) => step === state.motionMissionIndex ? { motionMissionIndex: Math.min(4, step + 1) } : state),
      completeWheelStep: (step) => set((state) => step === state.wheelMissionIndex ? { mastery: applyGains(state.mastery, wheelGains[step] ?? []), wheelMissionIndex: Math.min(2, step + 1) } : state),
      completeDriveChallenge: () => set((state) => ({
        driveChallengeComplete: true,
        mastery: applyGains(state.mastery, [
          { conceptId: 'motion-mastery', gains: { applicationSkill: 0.35, measurementSkill: 0.25 } },
          { conceptId: 'drive-access', gains: { exposure: 0.8, applicationSkill: 0.7, measurementSkill: 0.65 } },
        ]),
      })),
      recordAttempt: (conceptId, gains, correct) => set((state) => ({ mastery: { ...state.mastery, [conceptId]: updateMastery(state.mastery[conceptId], conceptId, gains, correct) } })),
      selectComponent: (selectedComponentId) => set({ selectedComponentId }),
      setExploded: (exploded) => set({ exploded }),
      setFidelity: (fidelity) => set({ fidelity }),
      resetProgress: () => set({ mastery: {}, motionMissionIndex: 0, wheelMissionIndex: 0, driveChallengeComplete: false, selectedComponentId: null, exploded: false, fidelity: 'A' }),
      unlockForTesting: () => set((state) => ({
        mastery: applyGains(state.mastery, [
          { conceptId: 'speed', gains: { exposure: 1, conceptualUnderstanding: 1, calculationSkill: 1 } },
          { conceptId: 'velocity', gains: { exposure: 1, conceptualUnderstanding: 1, calculationSkill: 1 } },
          { conceptId: 'acceleration', gains: { exposure: 1, conceptualUnderstanding: 1, calculationSkill: 1, predictionSkill: 1, graphInterpretation: 1 } },
          { conceptId: 'motion-mastery', gains: { exposure: 1, conceptualUnderstanding: 1, applicationSkill: 1, measurementSkill: 1 } },
          { conceptId: 'drive-access', gains: { exposure: 1, applicationSkill: 1, measurementSkill: 1 } },
          ...Object.values(wheelGains).flat(),
        ]),
        motionMissionIndex: 4,
        wheelMissionIndex: 2,
        driveChallengeComplete: true,
      })),
    }),
    {
      name: 'e34-physics-lab-learner-v3', version: 3, storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ mastery: state.mastery, motionMissionIndex: state.motionMissionIndex, wheelMissionIndex: state.wheelMissionIndex, driveChallengeComplete: state.driveChallengeComplete, fidelity: state.fidelity }),
    },
  ),
)
