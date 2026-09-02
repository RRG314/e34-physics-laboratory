import { modelHierarchy, modelById, type ModelLevel } from '../data/modelHierarchy'
import { vehicleSimulation } from '../simulation/vehicleSimulation'
import { useLabLearningStore } from '../store/labLearningStore'

export function ModelInspector() {
  const modelLevel = useLabLearningStore((state) => state.modelLevel)
  const setModelLevel = useLabLearningStore((state) => state.setModelLevel)
  const profile = modelById[modelLevel]
  const choose = (level: ModelLevel) => {
    if (!modelById[level].available) return
    setModelLevel(level)
    vehicleSimulation.setModelLevel(level)
  }
  return (
    <details className="model-inspector">
      <summary><span>Model assumptions</span><strong>{profile.title}</strong></summary>
      <div className="model-levels" aria-label="Simulation model hierarchy">
        {modelHierarchy.map((item) => <button key={item.id} disabled={!item.available} className={item.id === modelLevel ? 'active' : ''} onClick={() => choose(item.id)}>{item.title}</button>)}
      </div>
      <div className="model-inspector-grid">
        <section><h4>Active assumptions</h4><ul>{profile.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h4>Neglected effects</h4><ul>{profile.neglectedEffects.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h4>Governing model</h4>{profile.equations.map((item) => <code key={item}>{item}</code>)}<small>{profile.numericalMethod} · Δt {profile.timestep}</small></section>
        <section><h4>Validity / confidence</h4><p>{profile.validity}</p><small>{profile.confidence} · {profile.parameterSource}</small></section>
      </div>
      <p className="model-limitation">{profile.limitations}</p>
    </details>
  )
}
