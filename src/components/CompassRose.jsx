// Sepia faceted compass rose for the lower-left of every plate. Eight points
// (faceted light/dark for an engraved look), an elongated accented North spike,
// two survey rings, and a centre hub — all in Atlas ink/accent tokens so it
// reads as sepia on paper and cream on the night chart.
const C = 50
const rad = (d) => (d * Math.PI) / 180
const pt = (a, r) => `${(C + r * Math.cos(rad(a))).toFixed(2)},${(C + r * Math.sin(rad(a))).toFixed(2)}`

const POINTS = [
  { a: -90, L: 47, hw: 6, n: true }, // N — longer, accented
  { a: -45, L: 22, hw: 4 },
  { a: 0, L: 40, hw: 6 },
  { a: 45, L: 22, hw: 4 },
  { a: 90, L: 40, hw: 6 },
  { a: 135, L: 22, hw: 4 },
  { a: 180, L: 40, hw: 6 },
  { a: 225, L: 22, hw: 4 },
]

export default function CompassRose() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx={C} cy={C} r="38" fill="none" stroke="var(--ink-faint)" strokeWidth="1.1" />
      <circle cx={C} cy={C} r="30" fill="none" stroke="var(--ink-faint)" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
      {POINTS.map((p, i) => {
        const tip = pt(p.a, p.L)
        const lb = pt(p.a + 90, p.hw)
        const rb = pt(p.a - 90, p.hw)
        const light = p.n ? 'color-mix(in srgb, var(--accent) 55%, var(--map))' : 'var(--ink-faint)'
        const dark = p.n ? 'var(--accent)' : 'var(--ink-soft)'
        return (
          <g key={i} stroke="var(--ink-soft)" strokeWidth="0.4" strokeLinejoin="round">
            <polygon points={`${C},${C} ${lb} ${tip}`} fill={light} />
            <polygon points={`${C},${C} ${rb} ${tip}`} fill={dark} />
          </g>
        )
      })}
      <circle cx={C} cy={C} r="3.4" fill="var(--surface)" stroke="var(--ink-soft)" strokeWidth="1" />
    </svg>
  )
}
