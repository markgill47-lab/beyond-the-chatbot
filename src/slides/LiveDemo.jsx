import SlidePlate from '../components/SlidePlate.jsx'

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.6s ease ${d}s` })

export default function LiveDemo({ phase }) {
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Live <em>Demo</em></>}
      sheet={<>Section II · In Practice<br /><b>Plate 08</b></>}
      corners={{ tl: 'FIELD EXPEDITION', tr: 'BUILT BEFORE YOUR EYES', bl: 'SHEET 08', br: 'LIVE' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, maxWidth: 860, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, flexWrap: 'wrap', ...fade(phase >= 0) }}>
          {/* empty folder */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 84, height: 66, border: '1px dashed var(--neat)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'var(--ink-faint)', fontFamily: 'var(--font-display)' }}>▱</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Empty folder</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--accent)' }}>+</span>
          {/* spec.md */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: '18px 22px', border: '1px solid var(--accent)', background: 'var(--surface)', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>spec.md</div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>One file</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--accent)' }}>→</span>
          {/* prompt */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, maxWidth: 250 }}>
            <div style={{ padding: '14px 16px', border: '1px solid var(--neat)', background: 'var(--map)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5, textAlign: 'left' }}>
              “Read the .md file and build what it describes in this folder.”
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>One prompt</span>
          </div>
        </div>

        <p className="lede" style={fade(phase >= 0, 0.2)}>
          An agent reads a spec and builds the interactive Bloom’s / Creation-First tool from scratch —
          right here, while we watch.
        </p>

        <div style={{ borderTop: '1px solid var(--neat)', paddingTop: 22, maxWidth: 620, textAlign: 'center', ...fade(phase >= 1, 0.1) }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>The demo is the argument</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.5, color: 'var(--ink)' }}>
            Creation-first learning is possible <em style={{ color: 'var(--accent)' }}>because</em> AI removes the knowledge prerequisite.
          </p>
        </div>
      </div>
    </SlidePlate>
  )
}
