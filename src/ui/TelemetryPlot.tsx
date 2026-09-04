interface Series { label: string; unit: string; color: string; values: number[] }

export function TelemetryPlot({ title, series }: { title: string; series: Series[] }) {
  const width = 520
  const height = Math.max(180, series.length * 68 + 34)
  const padLeft = 58
  const padRight = 14
  const padTop = 8
  const padBottom = 22
  const longest = Math.max(2, ...series.map((item) => item.values.length))
  const bandHeight = (height - padTop - padBottom) / series.length
  const x = (index: number) => padLeft + (index / (longest - 1)) * (width - padLeft - padRight)
  const scale = (item: Series, seriesIndex: number) => {
    const min = Math.min(0, ...item.values)
    const max = Math.max(0, ...item.values)
    const range = max - min || 1
    const top = padTop + seriesIndex * bandHeight + 13
    const bottom = padTop + (seriesIndex + 1) * bandHeight - 9
    const y = (value: number) => bottom - ((value - min) / range) * (bottom - top)
    return { min, max, top, bottom, y }
  }
  const description = series.map((item) => `${item.label} in ${item.unit}, from ${item.values[0]?.toFixed(2)} to ${item.values.at(-1)?.toFixed(2)}`).join('; ')
  return (
    <figure className="telemetry-plot">
      <figcaption><strong>{title}</strong><span>{series.map((item) => `${item.label} (${item.unit})`).join(' · ')}</span></figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title}. ${description}`}>
        <title>{title}</title><desc>{description}. Each quantity has its own vertical scale; all share the same time axis.</desc>
        {series.map((item, seriesIndex) => {
          const band = scale(item, seriesIndex)
          return <g key={item.label}>
            <rect x={padLeft} y={padTop + seriesIndex * bandHeight} width={width - padLeft - padRight} height={bandHeight} className="telemetry-band" />
            {[0, .5, 1].map((ratio) => <line key={ratio} x1={padLeft} x2={width - padRight} y1={band.top + ratio * (band.bottom - band.top)} y2={band.top + ratio * (band.bottom - band.top)} className="telemetry-grid" />)}
            {band.min <= 0 && band.max >= 0 && <line x1={padLeft} x2={width - padRight} y1={band.y(0)} y2={band.y(0)} className="telemetry-zero" />}
            <text x={4} y={padTop + seriesIndex * bandHeight + 14} className="telemetry-series-name">{item.label}</text>
            <text x={4} y={padTop + seriesIndex * bandHeight + 26}>{item.unit}</text>
            <text x={padLeft + 3} y={band.top + 8}>{band.max.toFixed(1)}</text>
            <text x={padLeft + 3} y={band.bottom - 2}>{band.min.toFixed(1)}</text>
            <polyline points={item.values.map((value, index) => `${x(index)},${band.y(value)}`).join(' ')} fill="none" stroke={item.color} strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
          </g>
        })}
        <text x={padLeft} y={height - 6}>start</text><text x={width - padRight - 16} y={height - 6}>time</text>
      </svg>
    </figure>
  )
}
