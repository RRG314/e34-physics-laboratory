import { useMemo, useState } from 'react'
import { Check, Database, ShieldCheck } from 'lucide-react'
import { scientificMethodStages, parseMeasurementCsv } from '../../domain/experiments'
import { targetVehicle } from '../../data/vehicle'
import { useLabLearningStore } from '../../store/labLearningStore'

const capstones = [
  ['Introductory mechanics', 'Predict acceleration and stopping using motion, force, friction, energy, and wheel rotation.'],
  ['Wheel / drivetrain', 'Predict engine RPM from velocity, tire geometry, transmission ratio, and final drive.'],
  ['Whole-car synthesis', 'Analyze grade, load, torque, power, heat rejection, drag, and cooling demand together.'],
]

export function ExperimentPage() {
  const radius = targetVehicle.runningGear.unloadedWheelRadius.value
  const prediction = 2 * Math.PI * radius
  const [measurement, setMeasurement] = useState(2.02)
  const [csv, setCsv] = useState('time,value,unit,uncertainty\n0,0.646,m,0.003\n1,0.647,m,0.003\n2,0.645,m,0.003')
  const [importStatus, setImportStatus] = useState('No dataset imported in this session.')
  const addNotebookEntry = useLabLearningStore((state) => state.addNotebookEntry)
  const residual = measurement - prediction
  const plausibility = useMemo(() => measurement > 1.5 && measurement < 2.6, [measurement])
  const importDataset = () => {
    try {
      const samples = parseMeasurementCsv(csv)
      const mean = samples.reduce((sum, sample) => sum + sample.value, 0) / samples.length
      setImportStatus(`${samples.length} samples parsed · mean ${mean.toFixed(4)} ${samples[0]?.unit ?? ''}`)
      addNotebookEntry({ kind: 'dataset', title: 'Imported stationary measurement dataset', body: `${samples.length} samples; mean ${mean.toFixed(4)} ${samples[0]?.unit ?? ''}. Metadata still requires instrument and calibration review.` })
    } catch (error) { setImportStatus(error instanceof Error ? error.message : 'Could not parse dataset.') }
  }
  return (
    <div className="content-page experiment-page">
      <header className="content-header"><p className="eyebrow">Experimental physics / real-world bridge</p><h1>Prediction meets measurement.</h1><p>Use a guided scientific-method loop now; later the same dataset contract can accept measurements from the physical E34.</p></header>
      <div className="safety-banner"><ShieldCheck size={20} /><div><strong>Safe experiment policy</strong><span>Collect wheel dimensions only while parked, secured, and stationary. Moving-vehicle data must be collected by a passenger or suitable data logger—never by the driver.</span></div></div>
      <section className="method-loop">{scientificMethodStages.map((stage, index) => <article key={stage.id}><span>{String(index + 1).padStart(2, '0')}</span><h2>{stage.title}</h2><p>{stage.prompt}</p></article>)}</section>
      <section className="comparison-lab">
        <div><p className="eyebrow">Simulation vs reality / stationary wheel</p><h2>One-revolution distance</h2><p>Model A predicts circumference from the provisional unloaded radius. Enter a demonstration measurement to expose the residual.</p><label>Measured circumference <input type="number" step="0.001" value={measurement} onChange={(event) => setMeasurement(Number(event.target.value))} /> m</label><div className={`plausibility ${plausibility ? 'valid' : 'invalid'}`}>{plausibility ? <Check size={15} /> : null}{plausibility ? 'Physically plausible range' : 'Pause: this value is implausible for an E34 road wheel.'}</div></div>
        <div className="comparison-values"><span>Prediction<strong>{prediction.toFixed(3)} m</strong></span><span>Simulation<strong>{prediction.toFixed(3)} m</strong></span><span>Measurement<strong>{measurement.toFixed(3)} m</strong></span><span>Residual<strong>{residual >= 0 ? '+' : ''}{residual.toFixed(3)} m</strong></span><p>Possible discrepancy sources: tire deformation, actual tire size, tape alignment, inflation pressure, and model-radius uncertainty.</p></div>
      </section>
      <section className="dataset-import"><div><p className="eyebrow">Future data-import architecture</p><h2>Dataset → metadata → uncertainty → residual</h2><p>CSV columns: time, value, unit, uncertainty. Imported data remains local to this browser.</p></div><textarea aria-label="Measurement CSV" value={csv} onChange={(event) => setCsv(event.target.value)} /><button className="button button-primary" onClick={importDataset}><Database size={15} /> Import dataset</button><output>{importStatus}</output></section>
      <section className="capstone-section"><p className="eyebrow">Cumulative transfer challenges</p><div>{capstones.map(([title, body]) => <article key={title}><span>CAPSTONE</span><h2>{title}</h2><p>{body}</p><small>Mapped architecture · deeper prerequisites pending</small></article>)}</div></section>
    </div>
  )
}
