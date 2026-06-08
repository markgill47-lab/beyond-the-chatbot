import SlidePlate from '../components/SlidePlate.jsx'

const BLOOM = [
  { label: 'Create', w: 42 },
  { label: 'Evaluate', w: 52 },
  { label: 'Analyse', w: 62 },
  { label: 'Apply', w: 72 },
  { label: 'Understand', w: 82 },
  { label: 'Remember', w: 92 },
]

const CYCLE = [
  { label: 'Create', color: 'var(--accent-elev)', angle: -90, d: 'Start by making something' },
  { label: 'Assess', color: 'var(--accent-water)', angle: 0, d: 'Evaluate what you made' },
  { label: 'Reflect', color: 'var(--accent)', angle: 90, d: 'Understand why it works' },
  { label: 'Refine', color: 'var(--accent-forest)', angle: 180, d: 'Improve through iteration' },
]

const PREVIEW = [
  ['◎', 'What the learner does'],
  ['⟷', 'What AI enables'],
  ['◇', 'What the instructor does'],
  ['◈', 'What evidence emerges'],
]

const CCX = 150, CCY = 130, CR = 84
const polar = (r, deg) => [CCX + r * Math.cos((deg * Math.PI) / 180), CCY + r * Math.sin((deg * Math.PI) / 180)]
const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.55s ease ${d}s` })

export default function RethinkingTaxonomy({ phase }) {
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Rethinking the <em>Taxonomy</em></>}
      sheet={<>Section II · In Practice<br /><b>Plate 07</b></>}
      corners={{ tl: 'ELEVATION vs. CYCLE', tr: 'TWO MODELS', bl: 'SHEET 07', br: 'sets up the demo' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%', maxWidth: 1000, height: '100%' }}>
        <div className="cmp" style={{ flex: 1 }}>
          {/* LEFT — Bloom elevation */}
          <div className="cmp__col" style={fade(phase >= 0)}>
            <div className="cmp__head">
              <div className="cmp__side" style={{ color: 'var(--accent-water)' }}>Bloom’s Taxonomy</div>
              <div className="cmp__sub">Hierarchy · creation is the capstone</div>
            </div>
            <div className="cmp__panel" style={{ alignItems: 'center', gap: 4 }}>
              {BLOOM.map((b, i) => (
                <div key={i} style={{
                  width: `${b.w}%`, padding: '8px 0', textAlign: 'center', border: '1px solid var(--accent-water)',
                  background: 'var(--accent-water)', color: 'var(--surface)',
                  opacity: 0.4 + (1 - i / BLOOM.length) * 0.6,
                  fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em',
                  ...fade(phase >= 0, 0.06 * i),
                }}>{b.label}</div>
              ))}
              <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>
                ↑ higher-order &nbsp;·&nbsp; lower-order ↓
              </div>
            </div>
            <div className="region" style={{ marginTop: 12, borderColor: 'var(--accent)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--accent)', lineHeight: 1.6 }}>
                Assumes learning is linear. Creation sits at the top, gated behind five prerequisite strata.
              </div>
            </div>
          </div>

          <div className="cmp__fold" style={fade(phase >= 1)} />

          {/* RIGHT — Creation-First cycle */}
          <div className="cmp__col" style={fade(phase >= 1)}>
            <div className="cmp__head">
              <div className="cmp__side" style={{ color: 'var(--accent)' }}>Creation-First</div>
              <div className="cmp__sub">Cycle · no hierarchy · every stage equal</div>
            </div>
            <div className="cmp__panel" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 300 260" style={{ width: '100%', maxWidth: 300 }}>
                <circle cx={CCX} cy={CCY} r={CR} fill="none" stroke="var(--neat)" strokeWidth="1.5" strokeDasharray="5 4" />
                {CYCLE.map((s, i) => {
                  const [x, y] = polar(CR, s.angle)
                  const tx = s.angle === 0 ? CCX + CR + 8 : s.angle === 180 ? CCX - CR - 8 : CCX
                  const ty = s.angle === -90 ? CCY - CR - 18 : s.angle === 90 ? CCY + CR + 18 : CCY
                  const anchor = s.angle === 0 ? 'start' : s.angle === 180 ? 'end' : 'middle'
                  return (
                    <g key={i} style={fade(phase >= 1, 0.12 * i)}>
                      <circle cx={x} cy={y} r="25" fill="var(--surface)" stroke={s.color} strokeWidth="1.6" />
                      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" className="mlabel" fontSize="11" fill={s.color}>{s.label}</text>
                      <text x={tx} y={ty} textAnchor={anchor} dominantBaseline="middle" className="mtag" fontSize="7.5">{s.d}</text>
                    </g>
                  )
                })}
                <text x={CCX} y={CCY - 3} textAnchor="middle" className="mtag" fontSize="8" letterSpacing="1.5">NO</text>
                <text x={CCX} y={CCY + 9} textAnchor="middle" className="mtag" fontSize="8" letterSpacing="1.5">HIERARCHY</text>
              </svg>
            </div>
            <div className="region" style={{ marginTop: 12, borderColor: 'var(--accent)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--accent)', lineHeight: 1.6 }}>
                AI removes the knowledge prerequisite. Learners create on day one; learning happens through the cycle.
              </div>
            </div>
          </div>
        </div>

        {/* framework preview */}
        <div style={fade(phase >= 2, 0.1)}>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 10 }}>
            Each stage opens a four-column framework — built live in the next plate
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {PREVIEW.map(([ic, t], i) => (
              <div key={i} style={{ border: '1px solid var(--neat)', background: 'var(--surface)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, ...fade(phase >= 2, 0.08 * i + 0.1) }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 16 }}>{ic}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-soft)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlidePlate>
  )
}
