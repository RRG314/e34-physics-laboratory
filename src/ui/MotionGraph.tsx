import type { VehicleSimulationSnapshot } from '../simulation/vehicleSimulation'

const ticks = (minimum: number, maximum: number, count = 4) => Array.from({ length: count + 1 }, (_, index) => minimum + (maximum - minimum) * index / count)
const label = (value: number) => Math.abs(value) >= 10 ? value.toFixed(0) : value.toFixed(1).replace('.0', '')

export function MotionGraph({ simulation }: { simulation: VehicleSimulationSnapshot }) {
  const width = 360; const height = 154
  const pad = { left: 42, right: 12, top: 12, bottom: 32 }
  const points = simulation.history
  const maxT = Math.max(simulation.duration ?? simulation.elapsed, 1)
  const positions = points.map((point) => point.position)
  const rawMin = Math.min(0, ...positions); const rawMax = Math.max(0, ...positions)
  const margin = Math.max((rawMax - rawMin) * 0.08, 1)
  const minX = rawMin - margin; const maxX = rawMax + margin; const span = maxX - minX
  const plotWidth = width - pad.left - pad.right; const plotHeight = height - pad.top - pad.bottom
  const pointAt = (time: number, position: number) => ({ x: pad.left + time / maxT * plotWidth, y: pad.top + (maxX - position) / span * plotHeight })
  const polyline = points.map((point) => { const coordinate = pointAt(point.time, point.position); return `${coordinate.x.toFixed(1)},${coordinate.y.toFixed(1)}` }).join(' ')

  return (
    <figure className="motion-graph">
      <figcaption><strong>Position versus time</strong><span>Read slope as velocity</span></figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Position in metres versus time in seconds. Current point: ${simulation.elapsed.toFixed(1)} seconds, ${simulation.position.toFixed(1)} metres.`}>
        {ticks(0, maxT).map((value) => { const coordinate = pointAt(value, minX); return <g key={`t-${value}`}><line x1={coordinate.x} y1={pad.top} x2={coordinate.x} y2={height - pad.bottom} className="graph-grid" /><text x={coordinate.x} y={height - 16} textAnchor="middle">{label(value)}</text></g> })}
        {ticks(minX, maxX).map((value) => { const coordinate = pointAt(0, value); return <g key={`x-${value}`}><line x1={pad.left} y1={coordinate.y} x2={width - pad.right} y2={coordinate.y} className="graph-grid" /><text x={pad.left - 8} y={coordinate.y + 3} textAnchor="end">{label(value)}</text></g> })}
        <line x1={pad.left} y1={height - pad.bottom} x2={width - pad.right} y2={height - pad.bottom} className="graph-axis" /><line x1={pad.left} y1={pad.top} x2={pad.left} y2={height - pad.bottom} className="graph-axis" />
        <polyline points={polyline} className="graph-line" />
        <text x={width / 2} y={height - 2} textAnchor="middle" className="axis-label">time, t (s)</text><text x="11" y={height / 2} textAnchor="middle" transform={`rotate(-90 11 ${height / 2})`} className="axis-label">position, x (m)</text>
      </svg>
    </figure>
  )
}
