interface SimpleChartProps {
  data: readonly number[];
  width?: number;
  height?: number;
  label: string;
}

export function SimpleChart({ data, width = 600, height = 200, label }: SimpleChartProps) {
  const values = data.filter(Number.isFinite);
  if (!values.length) return null;
  const padding = 20;
  const max = Math.max(1, ...values) * 1.1;
  const plotWidth = Math.max(width - padding * 2, 1);
  const plotHeight = Math.max(height - padding * 2, 1);
  const coordinates = values.map((value, index) => ({
    x: padding + (values.length === 1 ? plotWidth / 2 : index * plotWidth / (values.length - 1)),
    y: padding + (1 - value / max) * plotHeight,
  }));
  const points = coordinates.map(({ x, y }) => `${x},${y}`).join(" ");
  const area = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return <div className="w-full overflow-hidden">
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={label}>
      <title>{label}</title>
      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => <line key={fraction} x1={padding} x2={width - padding} y1={padding + fraction * plotHeight} y2={padding + fraction * plotHeight} stroke="#eef2ff" />)}
      <polyline points={area} fill="#eef2ff" stroke="none" />
      <polyline points={points} fill="none" stroke="#4f46e5" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {coordinates.map(({ x, y }, index) => <circle key={index} cx={x} cy={y} r={3.5} fill="#4f46e5" />)}
    </svg>
  </div>;
}
