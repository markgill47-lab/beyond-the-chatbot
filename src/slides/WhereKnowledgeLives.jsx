import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const DETAIL = {
  plno: 'Survey Notes · Plate 03', name: 'Where Does the Knowledge Live?', tag: 'Data flow in generative vs. agentic work',
  color: 'var(--accent)', fig: { n: '03', file: 'data-flow_detail.png' },
  body: [
    'In a generative workflow, your data goes somewhere else. You upload files to a cloud project, paste content into a chat, attach documents to a thread. Each upload is a static snapshot — frozen at the moment you sent it. The AI sees fragments, never the complete picture.',
    'The human becomes the integration layer. You read the output, copy it, paste it into your local files, test it, fix what’s wrong, and re-upload for the next round. Every cycle requires manual shuttling. Version drift is constant.',
    'In an agentic workflow, the agent operates directly within your project files. It reads your documents, writes into your codebase, modifies your spreadsheets — locally. When it needs cloud services, data flows through APIs like water through a hose: directed, specific, nothing dumped.',
    'Generative AI works on copies of your knowledge. Agentic AI works inside your knowledge.',
  ],
}

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.55s ease ${d}s` })

const Files = ({ rows }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {rows.map((f, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: f.stale ? 'var(--ink-faint)' : 'var(--ink-soft)' }}>
        <span style={{ color: f.color || 'var(--ink-faint)' }}>▭</span>
        <span style={{ flex: 1, textDecoration: f.stale ? 'line-through' : 'none' }}>{f.name}</span>
        {f.status && <span style={{ fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: f.color || 'var(--ink-faint)' }}>{f.status}</span>}
        {f.ago && <span style={{ fontSize: 8, color: 'var(--ink-faint)' }}>{f.ago}</span>}
      </div>
    ))}
  </div>
)

export default function WhereKnowledgeLives({ phase }) {
  const { openModal } = useApp()
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Where Does the <em>Knowledge</em> Live?</>}
      sheet={<>Section I · The Survey<br /><b>Plate 03</b></>}
      corners={{ tl: 'DATA FLOW', tr: 'TWO TERRITORIES', bl: 'SHEET 03', br: 'SCALE 1:1' }}
      onNotes={() => openModal(DETAIL)}
      notesLabel="What am I looking at?"
    >
      <div className="cmp">
        {/* LEFT — generative */}
        <div className="cmp__col" style={fade(phase >= 0)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent-water)' }}>Generative AI</div>
            <div className="cmp__sub">Data scattered, human-shuttled</div>
          </div>
          <div className="cmp__panel">
            <div className="region">
              <div className="region__label" style={{ color: 'var(--accent-water)' }}>⌂ Your Machine</div>
              <Files rows={[{ name: 'report.docx' }, { name: 'data.xlsx' }, { name: 'notes.md' }, { name: 'budget.csv' }]} />
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-faint)' }}>copy / paste / upload ↓</div>
            <div className="region dashed">
              <div className="region__label">☁ Someone Else’s Server</div>
              <Files rows={[
                { name: 'report_v2.docx', stale: true, status: 'stale', color: 'var(--accent)' },
                { name: 'data (1).xlsx', stale: true, status: 'stale', color: 'var(--accent)' },
                { name: 'notes_final.md' },
                { name: 'budget_old.csv', stale: true, status: 'stale', color: 'var(--accent)' },
              ]} />
              <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 8.5, fontStyle: 'italic', color: 'var(--accent)' }}>Snapshots at time of upload.</div>
            </div>
            <div className="region" style={{ marginTop: 'auto', borderColor: 'var(--accent)' }}>
              <div className="region__label" style={{ color: 'var(--accent)' }}>↻ The Human Loop</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                Read output → copy → paste into file →<br />test → fix → re-upload → repeat
              </div>
            </div>
          </div>
          <div className="cmp__caption" style={fade(phase >= 2, 0.1)}>
            {['Knowledge is static snapshots', 'The human is the integration layer', 'AI advises; you implement', 'Version drift is constant'].map((t, i) => (
              <div className="row" key={i}><span className="mk" style={{ color: 'var(--accent-water)' }}>—</span>{t}</div>
            ))}
          </div>
        </div>

        <div className="cmp__fold" style={fade(phase >= 1)} />

        {/* RIGHT — agentic */}
        <div className="cmp__col" style={fade(phase >= 1)}>
          <div className="cmp__head">
            <div className="cmp__side" style={{ color: 'var(--accent)' }}>Agentic AI</div>
            <div className="cmp__sub">Embedded in the knowledge</div>
          </div>
          <div className="cmp__panel">
            <div className="region" style={{ borderColor: 'var(--accent)' }}>
              <div className="region__label" style={{ color: 'var(--accent)' }}>◎ Your Project — Agent Lives Here</div>
              <Files rows={[
                { name: 'report.docx', status: 'modified', ago: '2m', color: 'var(--accent-forest)' },
                { name: 'data.xlsx', status: 'read', ago: 'now', color: 'var(--ink-faint)' },
                { name: 'analysis.py', status: 'created', ago: '5m', color: 'var(--accent)' },
                { name: 'notes.md', status: 'current', color: 'var(--ink-faint)' },
              ]} />
            </div>
            <div className="region">
              <div className="region__label" style={{ color: 'var(--accent-water)' }}>⟷ API Connections</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                Cloud storage · live database · external services
              </div>
              <div style={{ marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 8.5, fontStyle: 'italic', color: 'var(--accent-water)' }}>Data through a hose — directed, specific, nothing dumped.</div>
            </div>
            <div className="region" style={{ marginTop: 'auto', borderColor: 'var(--accent)' }}>
              <div className="region__label" style={{ color: 'var(--accent)' }}>↻ The Agent Loop</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                Read project state → plan → write files →<br />test → verify → commit → next task
              </div>
            </div>
          </div>
          <div className="cmp__caption" style={fade(phase >= 2, 0.1)}>
            {['Knowledge is live, not snapshots', 'The agent is the integration layer', 'AI executes; you direct', 'Single source of truth'].map((t, i) => (
              <div className="row" key={i}><span className="mk" style={{ color: 'var(--accent)' }}>◆</span>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </SlidePlate>
  )
}
