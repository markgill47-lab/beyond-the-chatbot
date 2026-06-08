import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

export default function LandingSlide() {
  const { narrationMode, toggleNarration, selfGuided, toggleSelfGuided, nextSlide } = useApp()

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> An Atlas of Agentic AI · MNGIA Thought Leader Summit</>}
      title={<>Beyond the <em>Chatbot</em></>}
      sheet={<>Frontispiece<br /><b>Sheet 00</b></>}
      corners={{ tl: '44°58′N', tr: '094°10′W', bl: 'EDITION I', br: 'SCALE 1:1' }}
    >
      <div style={{ maxWidth: 720, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(15px,2vw,20px)', color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 640 }}>
          Agentic AI, the skills that actually matter, and why the biggest shift hasn't happened yet.
        </p>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', lineHeight: 1.9 }}>
          Mark Gill<br />
          <span style={{ color: 'var(--ink-soft)' }}>Director, AI &amp; Visualization Lab — St. Cloud State University</span>
        </div>

        {/* mode card — self-guided + narration */}
        <div style={{ border: '1px solid var(--neat)', padding: '16px 20px', maxWidth: 500, marginTop: 6 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 8 }}>
            Field Guide · How to View
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 14 }}>
            <b>Self-Guided</b> on: each plate introduces itself and walks you through it, step by step.
            Off: the plates stay quiet for a live speaker, and modals show brief notes.
            <b> Narration</b> controls whether audio plays automatically.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className={`pill${selfGuided ? ' on' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleSelfGuided() }}
            >
              <span className="dot" /> Self-Guided {selfGuided ? 'On' : 'Off'}
            </button>
            <button
              className={`pill${narrationMode ? ' on' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleNarration() }}
            >
              <span className="dot" /> Narration {narrationMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <button
          className="navbtn"
          onClick={nextSlide}
          style={{ marginTop: 4, padding: '12px 22px', fontSize: 12 }}
        >
          Begin the survey <span className="a">→</span>
        </button>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--ink-faint)', marginTop: 4 }}>
          ← / → or the buttons below to navigate · T theme · M index
        </div>
      </div>
    </SlidePlate>
  )
}
