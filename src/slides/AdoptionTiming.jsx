import { useState } from 'react'
import SlidePlate from '../components/SlidePlate.jsx'

/*
  Three adoption-timing lenses overlaid in one normalized coordinate space.
  Each lens is an independent toggle in its own colour; when all three are on
  they sweep up and cross at a single engineered point — the "iPhone moment",
  the tipping point from early-adopter advantage to mainstream inevitability.
  Geometry ported from D:/Projects/Adoption_Timing (Catmull-Rom splines), then
  re-skinned for the Atlas palette and made to intersect at TIP_X.
*/

/* ---- Catmull-Rom spline helpers ---- */
function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t
  return {
    x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  }
}
function splineCurve(cp, n = 400) {
  const pts = cp.map((p) => ({ x: p[0], y: p[1] }))
  const ext = [pts[0], ...pts, pts[pts.length - 1]]
  const res = []
  for (let i = 0; i < ext.length - 3; i++) {
    const segs = Math.max(4, Math.round(n / (ext.length - 3)))
    for (let j = 0; j <= segs; j++) res.push(catmullRom(ext[i], ext[i + 1], ext[i + 2], ext[i + 3], j / segs))
  }
  return res
}
function splineLookup(cp, n = 400) {
  const pts = splineCurve(cp, n)
  return (x) => {
    for (let i = 0; i < pts.length - 1; i++) {
      if (x >= pts[i].x && x <= pts[i + 1].x) {
        const t = (x - pts[i].x) / (pts[i + 1].x - pts[i].x)
        return pts[i].y + t * (pts[i + 1].y - pts[i].y)
      }
    }
    return pts[pts.length - 1].y
  }
}
const bell = (x) => Math.exp(-0.5 * Math.pow((x - 0.5) / 0.18, 2))

/* ---- curve control points (normalized 0–1 x; y pre-transform) ---- */
const GARTNER_POINTS = [
  [0.0, 0.0], [0.02, 0.2], [0.035, 0.6], [0.06, 0.95], [0.08, 1.0],
  [0.1, 0.8], [0.125, 0.35], [0.16, 0.12], [0.2, 0.14], [0.24, 0.28],
  [0.3, 0.52], [0.36, 0.72], [0.43, 0.84], [0.53, 0.88], [0.68, 0.9], [1.0, 0.9],
]
const JCURVE_POINTS = [
  [0.0, 0.0], [0.035, -0.12], [0.07, -0.38], [0.11, -0.55], [0.14, -0.6],
  [0.19, -0.42], [0.24, -0.1], [0.3, 0.15], [0.36, 0.42], [0.43, 0.62],
  [0.53, 0.76], [0.65, 0.84], [0.82, 0.88], [1.0, 0.9],
]
const ROGERS_SEGMENTS = [
  { name: 'Innovators', pct: '2.5%', x: 0.0, w: 0.06 },
  { name: 'Early Adopters', pct: '13.5%', x: 0.06, w: 0.14 },
  { name: 'Early Majority', pct: '34%', x: 0.2, w: 0.28 },
  { name: 'Late Majority', pct: '34%', x: 0.48, w: 0.3 },
  { name: 'Laggards', pct: '16%', x: 0.78, w: 0.22 },
]

/* ---- layout ---- */
const W = 720, H = 384
const PAD = { top: 30, right: 40, bottom: 56, left: 42 }
const CW = W - PAD.left - PAD.right
const CH = H - PAD.top - PAD.bottom
const toSVG = (xN, yN) => [PAD.left + xN * CW, PAD.top + CH - yN * CH]
const clamp01 = (v) => Math.max(0, Math.min(1, v))

/* ---- vertical transforms, solved so all three cross at TIP_X ---- */
const ROG_S = 0.86, ROG_O = 0.04
const TIP_X = 0.33
const gartnerFn = splineLookup(GARTNER_POINTS)
const jcurveFn = splineLookup(JCURVE_POINTS)
const TIP_Y = bell(TIP_X) * ROG_S + ROG_O
const GY_S = 0.8, GY_O = TIP_Y - gartnerFn(TIP_X) * GY_S
const JY_S = 0.44, JY_O = TIP_Y - jcurveFn(TIP_X) * JY_S

const splinePath = (cp, yS, yO) =>
  'M' + splineCurve(cp, 400).map((p) => { const [sx, sy] = toSVG(clamp01(p.x), clamp01(p.y * yS + yO)); return `${sx},${sy}` }).join(' L')
const ROGERS_PATH = (() => {
  const pts = []
  for (let i = 0; i <= 220; i++) { const x = i / 220; const [sx, sy] = toSVG(x, bell(x) * ROG_S + ROG_O); pts.push(`${sx},${sy}`) }
  return 'M' + pts.join(' L')
})()
const GARTNER_PATH = splinePath(GARTNER_POINTS, GY_S, GY_O)
const JCURVE_PATH = splinePath(JCURVE_POINTS, JY_S, JY_O)

const ROGERS_C = 'var(--accent)'
const GARTNER_C = 'var(--accent-elev)'
const JCURVE_C = 'var(--accent-forest)'
// Where the industry currently places generative AI as a category: just past the
// bottom of Gartner's Trough of Disillusionment, starting the climb out.
const GENAI_X = 0.19

export default function AdoptionTiming() {
  const [on, setOn] = useState({ rogers: true, gartner: false, jcurve: false })
  const toggle = (k) => (e) => { e.stopPropagation(); setOn((s) => ({ ...s, [k]: !s[k] })) }
  const allThree = on.rogers && on.gartner && on.jcurve

  const pill = (active, c) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)',
    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 14px',
    cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
    border: `1px solid ${active ? c : 'var(--neat)'}`,
    background: active ? `color-mix(in srgb, ${c} 12%, transparent)` : 'var(--surface)',
    color: active ? c : 'var(--ink-faint)',
  })
  const dot = (active, c) => ({ width: 9, height: 9, borderRadius: '50%', background: active ? c : 'var(--neat)', flexShrink: 0 })

  const [tipX, tipY] = toSVG(TIP_X, TIP_Y)
  const axisY = PAD.top + CH

  const caption = allThree
    ? 'Three lenses, one inflection. Where the curves cross is the iPhone moment — when early-adopter advantage tips into mainstream inevitability.'
    : on.gartner && !on.jcurve && !on.rogers ? 'Near the peak of inflated expectations — the trough and the real productivity plateau are still ahead.'
    : on.jcurve && !on.gartner && !on.rogers ? 'Deep in the investment dip. Returns curve upward only after the restructuring pays off.'
    : 'We are still in the early-adopter band. Toggle the lenses and overlay them — the mass-market majority hasn’t moved yet.'

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — Reserve · Q&amp;A</>}
      title={<>Adoption <em>Timing</em></>}
      sheet={<>Reserve · You Are Here<br /><b>Sheet R1</b></>}
      corners={{ tl: 'TIMING CHART', tr: 'THREE LENSES', bl: 'SHEET R1', br: 'overlay all three' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 820 }}>
        {/* lens toggles — each its own colour, independently overlaid */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={pill(on.rogers, ROGERS_C)} onClick={toggle('rogers')}><span style={dot(on.rogers, ROGERS_C)} />Rogers’ Adoption</button>
          <button style={pill(on.gartner, GARTNER_C)} onClick={toggle('gartner')}><span style={dot(on.gartner, GARTNER_C)} />Gartner Hype Cycle</button>
          <button style={pill(on.jcurve, JCURVE_C)} onClick={toggle('jcurve')}><span style={dot(on.jcurve, JCURVE_C)} />Economic J-Curve</button>
        </div>

        <div style={{ width: '100%', border: '1px solid var(--neat)', background: 'var(--map)', padding: 12 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', overflow: 'visible' }}>
            {/* graticule */}
            {[0.25, 0.5, 0.75].map((g) => { const [, gy] = toSVG(0, g); return <line key={g} x1={PAD.left} y1={gy} x2={PAD.left + CW} y2={gy} stroke="var(--grat)" strokeWidth="0.6" /> })}
            <line x1={PAD.left} y1={axisY} x2={PAD.left + CW} y2={axisY} stroke="var(--neat)" strokeWidth="1" />
            <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={axisY} stroke="var(--neat)" strokeWidth="1" />

            {/* Rogers segment dividers + labels (muted — Rogers stays one colour) */}
            {on.rogers && ROGERS_SEGMENTS.map((s) => { const [dx] = toSVG(s.x, 0); return <line key={s.name} x1={dx} y1={PAD.top} x2={dx} y2={axisY} stroke="var(--grat)" strokeWidth="0.6" strokeDasharray="3 4" /> })}
            {on.rogers && ROGERS_SEGMENTS.map((s) => { const [cx] = toSVG(s.x + s.w / 2, 0); return (
              <g key={'lab' + s.name}>
                <text x={cx} y={axisY + 18} textAnchor="middle" className="mtag" fontSize="8.5" fill="var(--ink-soft)">{s.name}</text>
                <text x={cx} y={axisY + 30} textAnchor="middle" className="mtag" fontSize="8" fill="var(--ink-faint)">{s.pct}</text>
              </g>) })}

            {/* J-Curve */}
            {on.jcurve && <>
              <path d={JCURVE_PATH} fill="none" stroke={JCURVE_C} strokeWidth="2.4" strokeLinecap="round" />
              {(() => { const [ex, ey] = toSVG(0.95, jcurveFn(0.95) * JY_S + JY_O); return <text x={ex} y={ey + 16} textAnchor="middle" className="mtag" fontSize="9" fontWeight="700" fill={JCURVE_C}>ROI</text> })()}
            </>}

            {/* Gartner */}
            {on.gartner && <>
              <path d={GARTNER_PATH} fill="none" stroke={GARTNER_C} strokeWidth="2.4" strokeLinecap="round" />
              {(() => { const [px, py] = toSVG(0.08, gartnerFn(0.08) * GY_S + GY_O); return <text x={px} y={py - 9} textAnchor="middle" className="mtag" fontSize="8" fill={GARTNER_C} opacity="0.85">Hype peak</text> })()}
              {(() => { const [px, py] = toSVG(0.69, gartnerFn(0.69) * GY_S + GY_O); return <text x={px} y={py - 9} textAnchor="middle" className="mtag" fontSize="9" fontWeight="700" fill={GARTNER_C}>Gartner</text> })()}
              {/* Generative AI — current category placement, just past the trough bottom */}
              {(() => {
                const gy = gartnerFn(GENAI_X) * GY_S + GY_O
                const [mx, my] = toSVG(GENAI_X, gy)
                return (
                  <g>
                    <line x1={mx} y1={PAD.top + 6} x2={mx} y2={axisY} stroke={GARTNER_C} strokeWidth="1" strokeDasharray="4 3" opacity="0.8" />
                    <circle cx={mx} cy={my} r="5" fill={GARTNER_C} stroke="var(--surface)" strokeWidth="1.5" />
                    <text x={mx} y={PAD.top + 15} textAnchor="middle" className="mtag" fontSize="9" fontWeight="700" fill={GARTNER_C}>GENERATIVE AI</text>
                  </g>
                )
              })()}
            </>}

            {/* Rogers */}
            {on.rogers && <>
              <path d={ROGERS_PATH} fill="none" stroke={ROGERS_C} strokeWidth="2.6" strokeLinecap="round" />
              {(() => { const [px, py] = toSVG(0.5, bell(0.5) * ROG_S + ROG_O); return <text x={px} y={py - 10} textAnchor="middle" className="mtag" fontSize="9" fontWeight="700" fill={ROGERS_C}>Rogers</text> })()}
            </>}

            {/* tipping point — only when all three overlap and cross */}
            {allThree && <>
              <line x1={tipX} y1={PAD.top - 4} x2={tipX} y2={axisY} stroke="var(--ink)" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7" />
              <circle cx={tipX} cy={tipY} r="13" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.45" />
              <path d={`M${tipX} ${tipY - 7} l7 7 l-7 7 l-7 -7 z`} fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.6" />
              <text x={tipX} y={PAD.top - 14} textAnchor="middle" className="mtag" fontSize="9.5" fontWeight="700" fill="var(--ink)">◆ iPhone Moment</text>
              <text x={tipX} y={PAD.top - 3} textAnchor="middle" className="mtag" fontSize="8" fill="var(--ink-soft)">the tipping point</text>
            </>}

            <text x={PAD.left + CW / 2} y={H - 6} textAnchor="middle" className="mtag" fontSize="8.5" letterSpacing="0.14em">TIME →</text>
          </svg>
        </div>

        <p className="lede">{caption}</p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          The iPhone moment hasn’t arrived yet.
        </div>
      </div>
    </SlidePlate>
  )
}
