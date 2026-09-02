import type { VehicleSimulationSnapshot } from '../simulation/vehicleSimulation'

export function MotionGraph({ simulation }: { simulation: VehicleSimulationSnapshot }) {
  const width = 330
  const height = 116
  const pad = 18
  const points = simulation.history
  const maxT = Math.max(simulation.duration ?? simulation.elapsed, 1)
  const positions = points.map((point) => point.position)
  const minX = Math.min(0, ...positions)
  const maxX = Math.max(1, ...positions)
  const span = Math.max(maxX - minX, 1)
  const polyline = points.map((point) => {
    const x = pad + (point.time / maxT) * (width - pad * 2)
    const y = height - pad - ((point.position - minX) / span) * (height - pad * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="motion-graph" aria-label="Position versus time graph">
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} className="graph-axis" />
        <line x1={pad} y1={pad} x2={pad} y2={height - pad} className="graph-axis" />
        <line x1={pad} y1={height / 2} x2={width - pad} y2={height / 2} className="graph-grid" />
        <polyline points={polyline} className="graph-line" />
        <text x={width - 27} y={height - 5}>t</text>
        <text x={4} y={14}>x</text>
      </svg>
      <span>position / time</span>
    </div>
  )
}
