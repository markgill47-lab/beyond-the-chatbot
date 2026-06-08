import { useApp } from '../context/AppContext.jsx'
import SlidePlate from '../components/SlidePlate.jsx'

const CONTENT = {
  llm: {
    plno: 'Marker 01 · Summit', name: 'Language Model', tag: 'The reasoning engine',
    color: 'var(--accent)', fig: { n: '01', file: 'agent_llm.png' },
    body: [
      "At the core of every agent is a large language model — the part most people have already met. It reads natural language, reasons about it, and generates a response.",
      "Inside an agent, the LLM isn't just answering. It's the decision layer: it reads context, weighs options, selects tools, interprets results, and decides what to do next.",
      "The model itself doesn't change. What changes is everything around it.",
    ],
  },
  memory: {
    plno: 'Marker 02', name: 'Memory', tag: 'Persistent context across sessions',
    color: 'var(--accent-water)', fig: { n: '02', file: 'agent_memory.png' },
    body: [
      "A chatbot forgets the moment the conversation ends. An agent remembers — accumulating project context, preferences, past decisions, and lessons learned.",
      "This ranges from conversation history to structured knowledge bases and episodic memory of what was tried and whether it worked.",
      "Memory turns a stateless generator into something that gets better at your specific work the longer you use it.",
    ],
  },
  tools: {
    plno: 'Marker 03', name: 'Tools', tag: 'The ability to act on the world',
    color: 'var(--accent-forest)', fig: { n: '03', file: 'agent_tools.png' },
    body: [
      "Tools are what separate an agent from a chatbot. A chatbot generates text. An agent reads files, writes code, queries databases, calls APIs, runs commands.",
      "Each tool is a capability the agent invokes when its reasoning calls for it — the way a person reaches for the right instrument for the job.",
      "The number and quality of tools directly determines what an agent can accomplish.",
    ],
  },
  planning: {
    plno: 'Marker 04', name: 'Planning', tag: 'Breaking goals into executable steps',
    color: 'var(--accent-water)', fig: { n: '04', file: 'agent_planning.png' },
    body: [
      "Given a complex goal, an agent doesn't do everything at once. The planning layer decomposes it into subtasks, finds dependencies, sequences the work, and tracks progress.",
      "This is what makes multi-step work possible: what happens first, what runs in parallel, what depends on earlier results.",
      "Planning is also where the agent decides when to stop, when to ask for help, and when to reconsider its approach.",
    ],
  },
  shell: {
    plno: 'Region Boundary', name: 'Autonomous Execution', tag: 'The shell that keeps it running',
    color: 'var(--accent)', fig: { n: '05', file: 'agent_autonomy.png' },
    body: [
      "Everything inside makes an agent capable. The autonomous execution shell makes it independent — running continuously, retrying on failure, looping through recurring tasks over long horizons.",
      "Without it, you have a capable assistant that still needs a human to start every action. With it, you have a system that can monitor overnight or run a multi-hour pipeline.",
      "This is also where the risk lives. Autonomy means decisions get made when no one is watching.",
    ],
  },
}

const rev = (show, delay = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.55s ease ${delay}s` })

export default function WhatIsAnAgent({ phase }) {
  const { openModal } = useApp()
  const click = (id) => (e) => { e.stopPropagation(); openModal(CONTENT[id]) }

  return (
    <SlidePlate
      eyebrow={<><b>◆</b> Beyond the Chatbot — An Atlas of Agentic AI</>}
      title={<>What Is an <em>Agent?</em></>}
      sheet={<>Section I · The Survey<br /><b>Plate 01</b></>}
      corners={{ tl: '44°58′N', tr: '094°10′W', bl: 'SHEET 01', br: 'SCALE 1:1' }}
      legend={[
        { color: 'var(--accent)', label: 'Reasoning core' },
        { color: 'var(--accent-water)', label: 'Memory / Planning' },
        { color: 'var(--accent-forest)', label: 'Tools' },
        { dashed: true, label: 'Shell boundary' },
      ]}
      north
    >
      <svg viewBox="0 0 680 380" style={{ width: '100%', maxWidth: 680, height: '100%', maxHeight: '52vh', overflow: 'visible' }}>
        {/* region boundary / shell */}
        <g style={rev(phase >= 2)} className="node" onClick={click('shell')}>
          <rect x="44" y="34" width="592" height="312" fill="none" stroke="var(--neat)" strokeWidth="1.5" strokeDasharray="9 4 2 4" className="marker" />
          <text x="340" y="26" textAnchor="middle" className="mtag" fill="var(--accent)">REGION BOUNDARY · AUTONOMOUS EXECUTION SHELL</text>
        </g>

        {/* contour rings around the core peak */}
        <g fill="none" stroke="var(--accent-elev)" opacity="0.55" style={rev(phase >= 1, 0.1)}>
          <circle cx="340" cy="196" r="120" strokeDasharray="2 6" />
          <circle cx="340" cy="196" r="92" />
          <circle cx="340" cy="196" r="64" strokeDasharray="2 6" />
        </g>

        {/* connectors */}
        <g stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="1 5" style={rev(phase >= 1, 0.15)}>
          <line x1="340" y1="196" x2="170" y2="120" />
          <line x1="340" y1="196" x2="510" y2="120" />
          <line x1="340" y1="196" x2="340" y2="300" />
        </g>

        {/* settlement markers */}
        <g className="node" onClick={click('memory')} style={rev(phase >= 1, 0.2)}>
          <circle className="marker" cx="170" cy="120" r="30" fill="var(--surface)" stroke="var(--accent-water)" strokeWidth="1.6" />
          <circle className="pin" cx="170" cy="120" r="3.5" fill="var(--accent-water)" />
          <text x="170" y="117" textAnchor="middle" className="mlabel" fontSize="13" fill="var(--accent-water)">Memory</text>
          <text x="170" y="76" textAnchor="middle" className="mtag">persistent context</text>
        </g>
        <g className="node" onClick={click('tools')} style={rev(phase >= 1, 0.3)}>
          <circle className="marker" cx="510" cy="120" r="30" fill="var(--surface)" stroke="var(--accent-forest)" strokeWidth="1.6" />
          <circle className="pin" cx="510" cy="120" r="3.5" fill="var(--accent-forest)" />
          <text x="510" y="117" textAnchor="middle" className="mlabel" fontSize="13" fill="var(--accent-forest)">Tools</text>
          <text x="510" y="76" textAnchor="middle" className="mtag">act on the world</text>
        </g>
        <g className="node" onClick={click('planning')} style={rev(phase >= 1, 0.4)}>
          <circle className="marker" cx="340" cy="300" r="30" fill="var(--surface)" stroke="var(--accent-water)" strokeWidth="1.6" />
          <circle className="pin" cx="340" cy="300" r="3.5" fill="var(--accent-water)" />
          <text x="340" y="297" textAnchor="middle" className="mlabel" fontSize="12" fill="var(--accent-water)">Planning</text>
          <text x="340" y="346" textAnchor="middle" className="mtag">decompose goals</text>
        </g>

        {/* the summit / reasoning core */}
        <g className="node" onClick={click('llm')} style={rev(phase >= 0)}>
          <circle className="marker" cx="340" cy="196" r="40" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <path d="M340 178 l11 20 h-22 z" fill="var(--accent)" />
          <text x="340" y="216" textAnchor="middle" className="mlabel" fontSize="14" fill="var(--accent)">LLM</text>
          <text x="340" y="150" textAnchor="middle" className="mtag" fill="var(--accent)">reasoning core ▲ summit</text>
        </g>

        {/* hint */}
        <text x="340" y="368" textAnchor="middle" className="mtag" style={rev(phase >= 3, 0.2)}>click any marker to survey it</text>
      </svg>
    </SlidePlate>
  )
}
