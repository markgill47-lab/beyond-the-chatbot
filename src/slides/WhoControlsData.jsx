import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const TIERS = [
  { name: 'Free', price: '$0', meter: 33, bottom: 'Your data is the product.',
    items: [['warn', 'Your data may train models'], ['warn', 'Conversations stored indefinitely'], ['warn', 'Documents on vendor servers'], ['warn', 'No data-residency controls']] },
  { name: 'Premium', price: '$20/mo', meter: 66, bottom: 'Better policy. Same dependency.',
    items: [['ok', 'Data not used for training'], ['warn', 'Still stored on their servers'], ['warn', 'Trust their retention policy'], ['warn', 'Vendor sees your documents']] },
  { name: 'Enterprise', price: '$$$', meter: 100, bottom: 'Best available. Still their servers.',
    items: [['ok', 'SSO, audit logs, compliance'], ['ok', 'Data-isolation agreements'], ['warn', 'Still a third-party dependency'], ['warn', 'You trust; you don’t control']] },
]

const DEGREES = [
  { name: 'Direct', icon: '◎', sep: 1, fade: false, bottom: 'Highest capability. Data stays local.',
    items: ['Files never leave your machine', 'Full project awareness', 'AI processes data directly', 'You control the environment'] },
  { name: 'API', icon: '⟷', sep: 2, fade: false, bottom: 'Controlled exposure. Only what’s needed.',
    items: ['Only specific fields sent', 'Encrypted in transit', 'No bulk document upload', 'Audit every request'] },
  { name: 'Tool Isolation', icon: '◇', sep: 3, fade: true, bottom: 'AI writes the tool. Never sees the data.',
    items: ['Agent writes code, not data', 'Script processes data locally', 'Zero AI exposure to content', 'Maximum separation possible'] },
]

const DETAIL = {
  plno: 'Survey Notes · Plate 04', name: 'Who Controls the Data?', tag: 'Privacy in generative vs. agentic work',
  color: 'var(--accent)', fig: { n: '04', file: 'privacy_detail.png' },
  body: [
    'With generative AI, privacy is a subscription tier. Free accounts may use your data for training. Premium promises they won’t, but your documents still live on someone else’s servers. Enterprise adds compliance controls, but the dependency remains: you trust their policy. You don’t verify it.',
    'Every tier requires sending your documents to someone else’s infrastructure. The question isn’t whether the provider is trustworthy — it’s whether you have any alternative to trusting them.',
    'Agentic AI introduces degrees of separation. At the closest, the agent works in your local files and nothing leaves. In the middle, targeted API calls send only specific fields. At the furthest, the agent writes a tool that processes the data — the AI never touches the content at all.',
    'Privacy is no longer a subscription tier. It’s a design choice you control.',
  ],
}

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.55s ease ${d}s` })

export default function WhoControlsData({ phase }) {
  const { openModal } = useApp()
  const [tier, setTier] = useState(0)
  const [deg, setDeg] = useState(0)
  const T = TIERS[tier], D = DEGREES[deg]

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Who <em>Controls</em> the Data?</>}
      sheet={<>Section I · The Survey<br /><b>Plate 04</b></>}
      corners={{ tl: 'PRIVACY', tr: 'TWO TERRITORIES', bl: 'SHEET 04', br: 'SCALE 1:1' }}
      onNotes={() => openModal(DETAIL)}
      notesLabel="What am I looking at?"
    >
      <div className="cmp">
        {/* LEFT — generative tiers */}
        <div className="cmp__col" style={fade(phase >= 0)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent-water)' }}>Generative AI</div>
            <div className="cmp__sub">You get what you pay for</div>
          </div>
          <div className="cmp__panel">
            <div className="seg">
              {TIERS.map((t, i) => (
                <button key={i} className={tier === i ? 'on' : ''} onClick={(e) => { e.stopPropagation(); setTier(i) }}>
                  {t.name}<span className="pr">{t.price}</span>
                </button>
              ))}
            </div>
            <div className="region">
              <div className="region__label">Privacy level</div>
              <div style={{ height: 6, border: '1px solid var(--neat)' }}>
                <div style={{ height: '100%', width: `${T.meter}%`, background: 'var(--accent)', transition: 'width 0.4s ease' }} />
              </div>
            </div>
            <div className="region">
              {T.items.map(([k, t], i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontFamily: 'var(--font-mono)', fontSize: 10, color: k === 'ok' ? 'var(--accent-forest)' : 'var(--ink-soft)' }}>
                  <span style={{ color: k === 'ok' ? 'var(--accent-forest)' : 'var(--accent)' }}>{k === 'ok' ? '✓' : '△'}</span>{t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontStyle: 'italic', color: 'var(--accent)', paddingTop: 6 }}>{T.bottom}</div>
          </div>
        </div>

        <div className="cmp__fold" style={fade(phase >= 1)} />

        {/* RIGHT — agentic degrees */}
        <div className="cmp__col" style={fade(phase >= 1)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent)' }}>Agentic AI</div>
            <div className="cmp__sub">Degrees of separation</div>
          </div>
          <div className="cmp__panel">
            <div className="seg">
              {DEGREES.map((d, i) => (
                <button key={i} className={deg === i ? 'on' : ''} onClick={(e) => { e.stopPropagation(); setDeg(i) }}>
                  <span style={{ fontSize: 13 }}>{d.icon}</span><span className="pr">{d.name}</span>
                </button>
              ))}
            </div>
            <div className="region" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 11px' }}>
              <span style={{ border: '1px solid var(--accent-forest)', color: 'var(--accent-forest)', fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, padding: '6px 8px', textAlign: 'center' }}>YOUR<br />DATA</span>
              <span style={{ display: 'flex', gap: 3 }}>{Array.from({ length: D.sep }).map((_, i) => <span key={i} style={{ width: 16, height: 2, background: 'var(--accent)', opacity: 0.4 + i * 0.25 }} />)}</span>
              {deg >= 1 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--accent)', fontWeight: 700 }}>⛉<br />{deg === 1 ? 'API' : 'CODE'}</span>}
              {deg >= 1 && <span style={{ width: 16, height: 2, background: 'var(--accent)', opacity: 0.4 }} />}
              <span style={{ border: '1px solid var(--accent)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, padding: '6px 8px', textAlign: 'center', opacity: D.fade ? 0.35 : 1 }}>AI<br />AGENT</span>
            </div>
            <div className="region">
              {D.items.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-soft)' }}>
                  <span style={{ color: 'var(--accent)' }}>✓</span>{t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontStyle: 'italic', color: 'var(--accent)', paddingTop: 6 }}>{D.bottom}</div>
          </div>
        </div>
      </div>
    </SlidePlate>
  )
}
