import { useState, useEffect, useCallback, useRef } from "react";

const FONT = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const DISPLAY = "'Playfair Display', Georgia, serif";

const C = {
  bg: "#0a0a10",
  surface: "#12121c",
  border: "#1e1e30",
  dim: "#444466",
  text: "#c8c8d8",
  bright: "#e8e8f0",
  llm: "#f0c850",
  memory: "#5ab8d8",
  tools: "#4aba7a",
  planning: "#9a6ad8",
  autonomy: "#e8a035",
  overlay: "rgba(5, 5, 10, 0.85)",
};

const CX = 300;
const CY = 260;

const COMPONENTS = [
  {
    id: "llm",
    name: "Language Model",
    color: C.llm,
    tagline: "The reasoning engine",
    detail: [
      "At the core of every agent is a large language model. This is the part most people have already interacted with — the system that reads natural language, reasons about it, and generates a response.",
      "But inside an agent, the LLM isn't just answering questions. It's the decision-making layer. It reads context, evaluates options, selects tools, interprets results, and decides what to do next.",
      "The model itself doesn't change. What changes is everything around it.",
    ],
  },
  {
    id: "memory",
    name: "Memory",
    color: C.memory,
    tagline: "Persistent context across sessions",
    detail: [
      "A chatbot forgets everything the moment the conversation ends. An agent remembers. Memory gives an agent the ability to accumulate knowledge over time — project context, user preferences, past decisions, and lessons learned.",
      "This can range from simple conversation history to structured knowledge bases, relationship tracking, and episodic memory that records what the agent tried and whether it worked.",
      "Memory is what turns a stateless text generator into something that gets better at your specific work the longer you use it.",
    ],
  },
  {
    id: "tools",
    name: "Tools",
    color: C.tools,
    tagline: "The ability to act on the world",
    detail: [
      "Tools are what separate an agent from a chatbot. A chatbot can only generate text. An agent can read files, write code, search the web, query databases, call APIs, execute shell commands, and interact with external services.",
      "Each tool is a capability the agent can invoke when its reasoning determines it's needed. The agent doesn't use every tool on every task — it selects the right tools for the situation, the same way a person reaches for different instruments depending on the job.",
      "The number and quality of available tools directly determines what an agent can accomplish. More tools, more capability.",
    ],
  },
  {
    id: "planning",
    name: "Planning",
    color: C.planning,
    tagline: "Breaking goals into executable steps",
    detail: [
      "When you give an agent a complex goal, it doesn't try to do everything at once. The planning layer decomposes the goal into subtasks, identifies dependencies, determines the right sequence, and tracks progress.",
      "This is what makes agents capable of multi-step work. Instead of one prompt producing one response, the agent reasons through an entire workflow: what needs to happen first, what can run in parallel, what depends on earlier results.",
      "Planning is also where the agent decides when to stop, when to ask for help, and when to reconsider its approach. It's the difference between executing blindly and working intentionally.",
    ],
  },
  {
    id: "autonomy",
    name: "Autonomous Execution",
    color: C.autonomy,
    tagline: "The shell that keeps it running",
    detail: [
      "Everything inside — the model, memory, tools, and planning — is what makes an agent capable. The autonomous execution shell is what makes it independent. This is the outer layer that allows an agent to run continuously, retry on failure, loop through recurring tasks, and operate over long time horizons.",
      "Without this shell, you have a very capable assistant that still requires a human to initiate every action. With it, you have a system that can monitor a database overnight, process incoming emails on a schedule, run a multi-hour build pipeline, or manage a workflow that spans days.",
      "This is also where the risk lives. Autonomy means the agent is making decisions when no one is watching. The quality of its instructions, the boundaries of its access, and the clarity of its goals become the only guardrails.",
    ],
  },
];

// Layout positions for the ring components
const RING_R = 110;
const RING_ITEMS = [
  { id: "memory", angle: -30 },
  { id: "tools", angle: 90 },
  { id: "planning", angle: 210 },
];

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export default function WhatIsAnAgent() {
  const [phase, setPhase] = useState(0);
  // 0: title
  // 1: LLM core
  // 2: Memory, Tools, Planning ring
  // 3: Autonomous shell wraps everything
  const [activeComponent, setActiveComponent] = useState(null);

  const advance = useCallback(() => {
    if (activeComponent !== null) return;
    setPhase(p => Math.min(p + 1, 3));
  }, [activeComponent]);

  const reset = useCallback(() => {
    setPhase(0);
    setActiveComponent(null);
  }, []);

  const openComponent = useCallback((id, e) => {
    e.stopPropagation();
    const comp = COMPONENTS.find(c => c.id === id);
    if (comp) setActiveComponent(comp);
  }, []);

  const closeModal = useCallback((e) => {
    e.stopPropagation();
    setActiveComponent(null);
  }, []);

  const fadeIn = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transition: `opacity 0.5s ease ${delay}s`,
  });

  const uid = useRef(`agent_${Math.random().toString(36).slice(2, 8)}`).current;

  const ringPositions = RING_ITEMS.map(item => {
    const [x, y] = polar(CX, CY, RING_R, item.angle);
    const comp = COMPONENTS.find(c => c.id === item.id);
    return { ...item, x, y, ...comp };
  });

  return (
    <div
      onClick={advance}
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: FONT,
        color: C.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 24px",
        cursor: phase < 3 ? "pointer" : "default",
        userSelect: "none",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          fontFamily: DISPLAY, fontSize: 14, letterSpacing: 4,
          textTransform: "uppercase", color: C.dim, marginBottom: 12,
        }}>
          Beyond the Chatbot
        </div>
        <h1 style={{
          fontFamily: DISPLAY, fontSize: 30, fontWeight: 400,
          color: C.bright, margin: 0, lineHeight: 1.3,
        }}>
          What Is an Agent?
        </h1>
        {phase === 0 && (
          <p style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>click anywhere to advance</p>
        )}
      </div>

      {/* Diagram */}
      <div style={{ width: "100%", maxWidth: 600 }}>
        <svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
          <defs>
            <radialGradient id={`${uid}_coreGlow`}>
              <stop offset="0%" stopColor={C.llm} stopOpacity="0.4" />
              <stop offset="50%" stopColor={C.llm} stopOpacity="0.08" />
              <stop offset="100%" stopColor={C.llm} stopOpacity="0" />
            </radialGradient>
            <style>{`
              @keyframes ${uid}_shellPulse {
                0%, 100% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -40; }
              }
              @keyframes ${uid}_corePulse {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.7; }
              }
            `}</style>
          </defs>

          {/* Phase 3: Autonomous shell */}
          {phase >= 3 && (
            <g style={fadeIn(true, 0.2)}>
              {/* Shell background */}
              <rect
                x={CX - 210} y={CY - 200}
                width={420} height={400}
                rx={24}
                fill={`${C.autonomy}04`}
                stroke={C.autonomy}
                strokeWidth="2"
                strokeDasharray="8 4"
                style={{
                  animation: `${uid}_shellPulse 3s linear infinite`,
                }}
              />
              {/* Shell label top */}
              <text
                x={CX} y={CY - 180}
                textAnchor="middle" fill={C.autonomy}
                fontSize="10" fontFamily={FONT} fontWeight="700"
                letterSpacing="2"
              >
                AUTONOMOUS EXECUTION SHELL
              </text>
              {/* Shell corner labels */}
              {[
                { label: "Loops", x: CX - 185, y: CY - 160 },
                { label: "Retries", x: CX + 185, y: CY - 160 },
                { label: "Scheduling", x: CX - 185, y: CY + 185 },
                { label: "Long-horizon", x: CX + 185, y: CY + 185 },
              ].map((item, i) => (
                <text
                  key={i}
                  x={item.x} y={item.y}
                  textAnchor="middle" fill={C.autonomy}
                  fontSize="8" fontFamily={FONT}
                  opacity="0.5"
                >
                  {item.label}
                </text>
              ))}
            </g>
          )}

          {/* Phase 2: Connection lines from core to ring components */}
          {phase >= 2 && ringPositions.map((item, i) => (
            <line
              key={`line_${i}`}
              x1={CX} y1={CY}
              x2={item.x} y2={item.y}
              stroke={C.border}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={fadeIn(true, 0.1 * i)}
            />
          ))}

          {/* Phase 2: Ring components */}
          {phase >= 2 && ringPositions.map((item, i) => {
            const labelOffset = 52;
            const [lx, ly] = polar(CX, CY, RING_R + labelOffset, item.angle);
            const textAnchor = lx < CX - 30 ? "end" : lx > CX + 30 ? "start" : "middle";
            return (
              <g
                key={`ring_${i}`}
                style={{ cursor: "pointer", ...fadeIn(true, 0.15 * i + 0.1) }}
                onClick={(e) => openComponent(item.id, e)}
              >
                <circle cx={item.x} cy={item.y} r="38" fill={C.surface} stroke={item.color} strokeWidth="1.5" />
                <circle cx={item.x} cy={item.y} r="38" fill={`${item.color}08`} />
                <text
                  x={item.x} y={item.y + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={item.color} fontSize="10" fontFamily={FONT} fontWeight="700"
                >
                  {item.name}
                </text>
                {/* External label */}
                <text
                  x={lx} y={ly}
                  textAnchor={textAnchor} dominantBaseline="middle"
                  fill={C.dim} fontSize="9" fontFamily={FONT}
                >
                  {item.tagline}
                </text>
              </g>
            );
          })}

          {/* Phase 1: Core LLM glow */}
          {phase >= 1 && (
            <circle
              cx={CX} cy={CY} r="80"
              fill={`url(#${uid}_coreGlow)`}
              style={{ animation: `${uid}_corePulse 3s ease-in-out infinite` }}
            />
          )}

          {/* Phase 1: Core LLM */}
          {phase >= 1 && (
            <g
              style={{ cursor: "pointer", ...fadeIn(true, 0) }}
              onClick={(e) => openComponent("llm", e)}
            >
              <circle cx={CX} cy={CY} r="48" fill={C.surface} stroke={C.llm} strokeWidth="2" />
              <circle cx={CX} cy={CY} r="48" fill={`${C.llm}10`} />
              <circle cx={CX} cy={CY} r="8" fill={C.llm} opacity="0.6" />
              <text
                x={CX} y={CY + 24}
                textAnchor="middle" fill={C.llm}
                fontSize="9" fontFamily={FONT} fontWeight="700"
                letterSpacing="1"
              >
                LLM
              </text>
            </g>
          )}

          {/* Phase 3: Clickable shell label */}
          {phase >= 3 && (
            <g
              style={{ cursor: "pointer" }}
              onClick={(e) => openComponent("autonomy", e)}
            >
              <rect
                x={CX - 80} y={CY + 205}
                width={160} height={28}
                rx={14}
                fill={`${C.autonomy}12`}
                stroke={C.autonomy}
                strokeWidth="1"
              />
              <text
                x={CX} y={CY + 220}
                textAnchor="middle" dominantBaseline="middle"
                fill={C.autonomy} fontSize="9" fontFamily={FONT} fontWeight="700"
              >
                Click to explore
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Phase labels */}
      <div style={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
        marginTop: 4,
        fontSize: 10,
      }}>
        {[
          { label: "Reasoning", color: C.llm, min: 1 },
          { label: "Capabilities", color: C.tools, min: 2 },
          { label: "Autonomy", color: C.autonomy, min: 3 },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 5,
            opacity: phase >= item.min ? 1 : 0.2,
            transition: "opacity 0.4s ease",
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: phase >= item.min ? item.color : C.border,
              transition: "background 0.4s ease",
            }} />
            <span style={{ color: phase >= item.min ? C.dim : C.border }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        marginTop: 16,
        display: "flex", alignItems: "center", gap: 16,
        fontSize: 10, color: C.dim,
      }}>
        <span style={{ opacity: phase > 0 ? 0.6 : 0.2 }}>{phase}/3</span>
        {phase >= 3 && (
          <span style={fadeIn(true, 0.5)}>click any component to explore</span>
        )}
        {phase >= 3 && (
          <button
            onClick={(e) => { e.stopPropagation(); reset(); }}
            style={{
              background: "none", border: `1px solid ${C.border}`,
              color: C.dim, padding: "4px 12px", borderRadius: 4,
              cursor: "pointer", fontSize: 10, fontFamily: FONT,
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Modal */}
      {activeComponent && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: C.overlay,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, padding: 24,
            animation: "fadeInOverlay 0.3s ease",
          }}
        >
          <style>{`
            @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideInModal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.surface,
              border: `1px solid ${activeComponent.color}40`,
              borderRadius: 16,
              padding: "32px 36px",
              maxWidth: 560, width: "100%",
              animation: "slideInModal 0.35s ease",
              position: "relative",
              maxHeight: "85vh", overflowY: "auto",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: 14, right: 16,
                background: "none", border: "none", color: C.dim,
                fontSize: 18, cursor: "pointer", fontFamily: FONT,
                padding: "4px 8px", borderRadius: 4,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.bright}
              onMouseLeave={(e) => e.currentTarget.style.color = C.dim}
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                border: `2px solid ${activeComponent.color}`,
                background: `${activeComponent.color}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: activeComponent.color,
                }} />
              </div>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY,
                }}>
                  {activeComponent.name}
                </div>
                <div style={{ fontSize: 11, color: activeComponent.color, marginTop: 2 }}>
                  {activeComponent.tagline}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {activeComponent.detail.map((para, j) => (
                <div key={j} style={{
                  fontSize: 12,
                  color: j === activeComponent.detail.length - 1 ? C.bright : C.text,
                  lineHeight: 1.75,
                  fontWeight: j === activeComponent.detail.length - 1 ? 600 : 400,
                }}>
                  {para}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24, height: 2, borderRadius: 1,
              background: `linear-gradient(to right, ${activeComponent.color}, transparent)`,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
