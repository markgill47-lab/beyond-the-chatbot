import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const FRAMEWORKS = [
  {
    id: 'openclaw', glyph: '⬡', name: 'OpenClaw', color: 'var(--accent)', audioKey: 'framework_openclaw',
    stats: [['347K', 'GitHub stars'], ['Local-first', 'runtime'], ['Action-oriented', 'automation']],
    tag: 'Local-first runtime · action-oriented',
    body: [
      'OpenClaw is a local-first agent runtime — the framework runs on your machine, not a vendor’s cloud. With 347,000 GitHub stars it is among the most adopted open agent platforms, and its action-oriented design means it doesn’t just chat: it executes.',
      'Local-first changes the security picture. Your data and credentials stay on your hardware; no third-party server holds your context. But the guardrails are yours to set — the runtime will do what you wire it to do.',
      'Action-oriented automation means taking steps in the world — files, shells, APIs, schedules — chained without a human in the loop between them. Powerful for productivity, and exactly the capability that demands careful boundaries.',
      'When an action-capable runtime is this widely adopted, agent infrastructure is no longer experimental. It is deployed at scale by people setting their own limits.',
    ],
  },
  {
    id: 'hermes', glyph: '◈', name: 'Hermes Agent', color: 'var(--accent-water)', audioKey: 'framework_hermes',
    stats: [['224B', 'daily tokens'], ['Episodic', 'memory'], ['Self-improving', 'NousResearch']],
    tag: 'Self-improving via episodic memory',
    body: [
      'Hermes Agent, from NousResearch, is built to improve itself over time through episodic memory — it records what it tried, whether it worked, and carries those lessons into future runs.',
      'It processes roughly 224 billion tokens a day on OpenRouter — a measure of how much real, production traffic now flows through self-improving agent systems, not demos.',
      'Self-improvement via memory is the capability long-horizon autonomy needs — and the one that makes behaviour hardest to predict, because the system you audited yesterday is not exactly the system running today.',
      'Mainstream, self-improving, high-volume agent infrastructure is already here. The security conversation has to catch up to deployment reality.',
    ],
  },
]

export default function AutomatedFrameworks() {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — Reserve · Q&amp;A</>}
      title={<>Automated <em>Frameworks</em></>}
      sheet={<>Reserve · Going Mainstream<br /><b>Sheet R3</b></>}
      corners={{ tl: 'FIELD REPORTS', tr: 'DEPLOYED AT SCALE', bl: 'SHEET R3', br: 'click either report' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
        <div style={{ display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 880 }}>
          {FRAMEWORKS.map((f) => (
            <div key={f.id} className="card" style={{ width: 320, padding: '26px 22px', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); openModal({ ...f, plno: `Field Report · ${f.name}` }) }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = f.color }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--neat)' }}>
              <div className="glyph" style={{ color: f.color }}>{f.glyph}</div>
              <div className="nm" style={{ fontSize: 22 }}>{f.name}</div>
              <div className="tg" style={{ marginBottom: 16 }}>{f.tag}</div>
              <div style={{ display: 'flex', gap: 0, width: '100%', borderTop: '1px solid var(--neat)' }}>
                {f.stats.map(([v, l], i) => (
                  <div key={i} style={{ flex: 1, padding: '10px 4px', borderRight: i < f.stats.length - 1 ? '1px solid var(--neat)' : 'none' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: f.color }}>{v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="lede">
          When agent frameworks go mainstream, democratised infrastructure brings democratised risk.
        </p>
      </div>
    </SlidePlate>
  )
}
