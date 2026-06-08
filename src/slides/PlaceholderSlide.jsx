import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

export default function PlaceholderSlide() {
  const { position } = useApp()
  const s = position.current
  const num = String(position.index + 1).padStart(2, '0')
  const sheetLabel = position.list === 'reserve' ? `R${position.index + 1}` : num

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={s.title}
      sheet={<>Section {s.section}<br /><b>Sheet {sheetLabel}</b></>}
      corners={{ tl: 'UNSURVEYED', tr: s.section, bl: `SHEET ${sheetLabel}`, br: 'DRAFT' }}
    >
      <div className="placeholder">
        <div className="ph-mark">▲</div>
        <div className="ph-tag">Plate awaiting survey</div>
        <div className="ph-note">
          This slide will be ported into the Atlas from<br />
          <span style={{ color: 'var(--accent)' }}>{s.from}</span>
        </div>
      </div>
    </SlidePlate>
  )
}
