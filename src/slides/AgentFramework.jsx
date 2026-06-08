import SlidePlate from '../components/SlidePlate.jsx'

const TRACKS = [190, 380, 570]
const LY = { input: 48, manager: 150, tasks: 252, workers: 352, checkers: 452, report: 556 }
const NW = 150, NH = 44

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.5s ease ${d}s` })

function Node({ x, y, label, sub, color, show, d = 0, w = NW }) {
  return (
    <g style={fade(show, d)}>
      <rect x={x - w / 2} y={y - NH / 2} width={w} height={NH} fill="var(--surface)" stroke={color} strokeWidth="1.5" />
      <circle cx={x - w / 2 + 13} cy={y} r="3.5" fill={color} />
      <text x={x - w / 2 + 24} y={sub ? y - 4 : y + 1} className="mlabel" fontSize="12" fill="var(--ink)" dominantBaseline="middle">{label}</text>
      {sub && <text x={x - w / 2 + 24} y={y + 11} className="mtag" fontSize="8.5" dominantBaseline="middle">{sub}</text>}
    </g>
  )
}

function Line({ x1, y1, x2, y2, show, d = 0, color = 'var(--neat)', dashed }) {
  const cy1 = y1 + (y2 - y1) * 0.4, cy2 = y1 + (y2 - y1) * 0.6
  return <path d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`} fill="none" stroke={color} strokeWidth="1" strokeDasharray={dashed ? '3 4' : 'none'} style={{ ...fade(show, d), transition: `opacity 0.5s ease ${d}s` }} />
}

export default function AgentFramework({ phase }) {
  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>Anatomy of an <em>Agent Framework</em></>}
      sheet={<>Section II · In Practice<br /><b>Plate 06</b></>}
      corners={{ tl: 'EXPEDITION CHART', tr: 'CHAIN OF COMMAND', bl: 'SHEET 06', br: 'SCALE 1:1' }}
      legend={[
        { color: 'var(--accent)', label: 'Manager · plans, delegates' },
        { color: 'var(--accent-forest)', label: 'Workers · execute' },
        { color: 'var(--accent-water)', label: 'Checkers · verify' },
      ]}
    >
      <svg viewBox="0 0 760 610" style={{ width: '100%', maxWidth: 720, height: '100%', maxHeight: '64vh', overflow: 'visible' }}>
        {/* lines */}
        <Line x1={380 - 90} y1={LY.input + NH / 2} x2={380} y2={LY.manager - NH / 2} show={phase >= 1} color="var(--accent-water)" />
        <Line x1={380 + 90} y1={LY.input + NH / 2} x2={380} y2={LY.manager - NH / 2} show={phase >= 1} color="var(--accent-elev)" d={0.1} />
        {TRACKS.map((tx, i) => <Line key={`mt${i}`} x1={380} y1={LY.manager + NH / 2} x2={tx} y2={LY.tasks - NH / 2} show={phase >= 2} color="var(--ink-faint)" d={0.08 * i} />)}
        {TRACKS.map((tx, i) => <Line key={`tw${i}`} x1={tx} y1={LY.tasks + NH / 2} x2={tx} y2={LY.workers - NH / 2} show={phase >= 3} color="var(--accent-forest)" d={0.08 * i} />)}
        {TRACKS.map((tx, i) => <Line key={`wc${i}`} x1={tx} y1={LY.workers + NH / 2} x2={tx} y2={LY.checkers - NH / 2} show={phase >= 4} color="var(--accent-water)" d={0.08 * i} />)}
        {TRACKS.map((tx, i) => <Line key={`cr${i}`} x1={tx} y1={LY.checkers + NH / 2} x2={380} y2={LY.report - 12} show={phase >= 5} color="var(--accent)" dashed d={0.08 * i} />)}
        {/* report → manager return */}
        <path d={`M 380 ${LY.report - 12} C 410 ${LY.report - 60}, 470 ${LY.manager + 60}, 392 ${LY.manager + NH / 2 + 4}`} fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" style={fade(phase >= 5, 0.3)} />

        {/* parallel badge */}
        <g style={fade(phase >= 2, 0.3)}>
          <rect x={380 - 32} y={LY.tasks - NH / 2 - 26} width={64} height={15} fill="var(--surface)" stroke="var(--ink-faint)" strokeWidth="0.8" />
          <text x={380} y={LY.tasks - NH / 2 - 18} textAnchor="middle" dominantBaseline="middle" className="mtag" fontSize="7.5">PARALLEL</text>
        </g>

        {/* nodes */}
        <Node x={380 - 90} y={LY.input} label="Knowledge" sub="Files, data, context" color="var(--accent-water)" show={phase >= 0} w={130} />
        <Node x={380 + 90} y={LY.input} label="Goal" sub="What needs to happen" color="var(--accent-elev)" show={phase >= 0} d={0.12} w={130} />
        <Node x={380} y={LY.manager} label="Manager Agent" sub="Plans and delegates" color="var(--accent)" show={phase >= 1} w={170} />
        {['Data analysis', 'Draft report', 'Build charts'].map((s, i) => <Node key={`t${i}`} x={TRACKS[i]} y={LY.tasks} label={`Task ${i + 1}`} sub={s} color="var(--ink-faint)" show={phase >= 2} d={0.08 * i} />)}
        {['Runs analysis', 'Writes content', 'Generates visuals'].map((s, i) => <Node key={`w${i}`} x={TRACKS[i]} y={LY.workers} label="Worker" sub={s} color="var(--accent-forest)" show={phase >= 3} d={0.08 * i} />)}
        {['Validates numbers', 'Reviews accuracy', 'Checks format'].map((s, i) => <Node key={`c${i}`} x={TRACKS[i]} y={LY.checkers} label="Checker" sub={s} color="var(--accent-water)" show={phase >= 4} d={0.08 * i} />)}

        <g style={fade(phase >= 5)}>
          <rect x={380 - 78} y={LY.report - 13} width={156} height={26} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1" />
          <text x={380} y={LY.report + 1} textAnchor="middle" dominantBaseline="middle" className="mtag" fill="var(--accent)" fontSize="9">REPORT TO MANAGER</text>
        </g>
      </svg>
    </SlidePlate>
  )
}
