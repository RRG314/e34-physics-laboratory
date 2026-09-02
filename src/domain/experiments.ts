import type { PhysicsQuantity } from './quantity'

export type ScientificMethodStage = 'observation' | 'question' | 'hypothesis' | 'prediction' | 'experiment' | 'measurement' | 'analysis' | 'conclusion' | 'revision'

export interface MeasurementSample {
  time: number
  value: number
  unit: string
  uncertainty?: number
}

export interface MeasurementDataset {
  id: string
  title: string
  phenomenon: string
  capturedAt: string
  instrument: string
  calibration: string
  referenceFrame: string
  coordinateSystem: string
  samples: MeasurementSample[]
  metadata: Record<string, string | number | boolean>
  safetyClassification: 'stationary' | 'passenger-collected' | 'closed-course-professional'
  source: 'manual-entry' | 'csv' | 'sensor' | 'simulation'
}

export interface RealityComparison {
  prediction: PhysicsQuantity
  simulation: PhysicsQuantity
  measurement: PhysicsQuantity
  residual: PhysicsQuantity
  explanations: string[]
}

export const scientificMethodStages: { id: ScientificMethodStage; title: string; prompt: string }[] = [
  { id: 'observation', title: 'Observation', prompt: 'What did you notice about the physical E34 or simulation?' },
  { id: 'question', title: 'Question', prompt: 'What measurable question follows?' },
  { id: 'hypothesis', title: 'Hypothesis', prompt: 'What model might explain it?' },
  { id: 'prediction', title: 'Prediction', prompt: 'What numerical or directional result should occur?' },
  { id: 'experiment', title: 'Experiment', prompt: 'What safe procedure can test it?' },
  { id: 'measurement', title: 'Measurement', prompt: 'Record value, unit, uncertainty, instrument, and conditions.' },
  { id: 'analysis', title: 'Analysis', prompt: 'Compare prediction, simulation, and measurement.' },
  { id: 'conclusion', title: 'Conclusion', prompt: 'Does the evidence support the hypothesis?' },
  { id: 'revision', title: 'Model revision', prompt: 'Which assumption or parameter should change?' },
]

export function parseMeasurementCsv(csv: string): MeasurementSample[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean)
  const start = lines[0]?.toLowerCase().includes('time') ? 1 : 0
  return lines.slice(start).map((line, index) => {
    const [time, value, unit = 'm', uncertainty] = line.split(',').map((cell) => cell.trim())
    const sample = { time: Number(time), value: Number(value), unit, uncertainty: uncertainty ? Number(uncertainty) : undefined }
    if (!Number.isFinite(sample.time) || !Number.isFinite(sample.value)) throw new Error(`Invalid numeric value on CSV row ${index + start + 1}`)
    return sample
  })
}
