interface Series { label: string; unit: string; color: string; values: number[] }

export function TelemetryPlot({ title, series }: { title: string; series: Series[] }) {
  const width = 520
  const height = 180
  const pad = 26
  const all = series.flatMap((item) => item.values)
  const min = Math.min(0, ...all)
  const max = Math.max(1, ...all)
  const range = max - min || 1
  const longest = Math.max(2, ...series.map((item) => item.values.length))
  const y = (value: number) => height - pad - ((value - min) / range) * (height - pad * 2)
  const x = (index: number) => pad + (index / (longest - 1)) * (width - pad * 2)
  return (
    <figure className="telemetry-plot">
      <figcaption><strong>{title}</strong><span>{series.map((item) => `${item.label} (${item.unit})`).join(' · ')}</span></figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title} telemetry graph`}>
        {[0, .25, .5, .75, 1].map((ratio) => <line key={ratio} x1={pad} x2={width - pad} y1={pad + ratio * (height - pad * 2)} y2={pad + ratio * (height - pad * 2)} className="telemetry-grid" />)}
        <line x1={pad} x2={width - pad} y1={y(0)} y2={y(0)} className="telemetry-zero" />
        {series.map((item) => <polyline key={item.label} points={item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke={item.color} strokeWidth="2.6" vectorEffect="non-scaling-stroke" />)}
        <text x={4} y={pad + 4}>{max.toFixed(1)}</text><text x={4} y={height - pad}>{min.toFixed(1)}</text><text x={width - 18} y={height - 7}>t</text>
      </svg>
    </figure>
  )
}
