import SlidePlate from '../components/SlidePlate.jsx'

// Closing plate for the live talk — the hand-off to Q&A and the reserve plates.
// No narration; skipped entirely in Self-Guided (kiosk) mode via the registry flag.
export default function ThankYou() {
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Thank <em>You</em></>}
      sheet={<>End of Survey<br /><b>Plate 13</b></>}
      corners={{ tl: '44°58′N', tr: '094°10′W', bl: 'EDITION I', br: 'OPEN FLOOR' }}
      qr
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, textAlign: 'center', maxWidth: 700 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(34px, 6vw, 56px)', lineHeight: 1.05, color: 'var(--accent)' }}>
          Questions?
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 560 }}>
          The map ends here, but the territory keeps moving. Let’s talk about what
          this looks like in your work — and where you think the next plate gets drawn.
        </p>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', lineHeight: 1.9 }}>
          Mark Gill<br />
          <span style={{ color: 'var(--ink-soft)' }}>Director, AI &amp; Visualization Lab — St. Cloud State University</span>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', borderTop: '1px solid var(--neat)', paddingTop: 16, marginTop: 4 }}>
          Reserve plates available · open the <b style={{ color: 'var(--ink-soft)' }}>☰ Index</b> for adoption timing, automated frameworks, emergence world, and more
        </div>
      </div>
    </SlidePlate>
  )
}
