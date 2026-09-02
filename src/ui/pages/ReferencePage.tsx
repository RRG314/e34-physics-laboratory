import { sources } from '../../data/sources'
import { targetVehicle } from '../../data/vehicle'
import type { SourcedValue } from '../../domain/model'
import { StatusBadge } from '../StatusBadge'

function SpecRow({ label, item }: { label: string; item: SourcedValue<unknown> }) {
  const value = Array.isArray(item.value) ? item.value.join(' / ') : item.value === null ? 'Unresolved' : String(item.value)
  return <tr><th>{label}</th><td>{value} {item.unit}</td><td><StatusBadge status={item.status} /></td><td>{item.pageOrSection ?? item.note ?? 'Registry note'}</td></tr>
}

export function ReferencePage() {
  const specs: [string, SourcedValue<unknown>][] = [
    ['Engine', targetVehicle.engine.code], ['Layout', targetVehicle.engine.layout], ['Displacement', targetVehicle.engine.displacement], ['Compression ratio', targetVehicle.engine.compressionRatio], ['US rated power', targetVehicle.engine.power], ['US rated torque', targetVehicle.engine.torque],
    ['Length', targetVehicle.dimensions.length], ['Width', targetVehicle.dimensions.width], ['Height', targetVehicle.dimensions.height], ['Wheelbase', targetVehicle.dimensions.wheelbase], ['Curb mass', targetVehicle.dimensions.curbMass],
    ['Manual transmission', targetVehicle.drivetrain.transmission], ['Forward ratios', targetVehicle.drivetrain.forwardRatios], ['Final drive', targetVehicle.drivetrain.finalDriveRatio], ['Nominal tire', targetVehicle.runningGear.nominalTire], ['Unloaded radius', targetVehicle.runningGear.unloadedWheelRadius],
  ]
  return (
    <div className="content-page reference-page">
      <header className="content-header"><p className="eyebrow">Technical reference / configuration 01</p><h1>1995 BMW 525i E34</h1><p>US-market sedan, five-speed manual. Every value is coupled to its evidence status and applicability.</p></header>
      <section className="reference-section"><h2>Canonical configuration</h2><div className="table-wrap"><table><thead><tr><th>Parameter</th><th>Value</th><th>Status</th><th>Applicability / source location</th></tr></thead><tbody>{specs.map(([label, item]) => <SpecRow key={label} label={label} item={item} />)}</tbody></table></div></section>
      <section className="reference-section"><h2>Source registry</h2><div className="source-grid">{sources.map((source) => <article key={source.id}><span>{source.sourceClass.replaceAll('_', ' ')}</span><h3>{source.title}</h3><p>{source.usage}</p><small>{source.organization} · {source.reliability.replace('_', ' ')}</small>{source.url && <a href={source.url} target="_blank" rel="noreferrer">Open source</a>}</article>)}</div></section>
    </div>
  )
}
