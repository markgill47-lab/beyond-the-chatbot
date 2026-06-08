import { useState, useCallback } from "react";

const FONT = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const DISPLAY = "'Playfair Display', Georgia, serif";

const C = {
  bg: "#0a0a10",
  surface: "#12121c",
  border: "#1e1e30",
  dim: "#444466",
  text: "#c8c8d8",
  bright: "#e8e8f0",
  gen: "#5a7aaa",
  agent: "#e8a035",
  arrow: "#f0c850",
  overlay: "rgba(5, 5, 10, 0.85)",
};

const SESSIONS = [
  {
    id: "generative",
    name: "Generative Session",
    tagline: "Think it through",
    color: C.gen,
    icon: "◎",
    detail: [
      "This is where the work actually begins. Not with a task, but with a conversation. I use generative chat the way most people use a whiteboard with a brilliant colleague who never gets tired.",
      "Brainstorming. I describe a rough idea and let the conversation pull it into shape. The AI pushes back, asks clarifying questions, suggests angles I hadn't considered. Most of my best work starts as a half-formed thought that becomes clear through dialogue.",
      "Planning. Once the concept is solid, the conversation shifts to structure. What are the components? What's the right sequence? What are the dependencies? This is still conversational, not technical.",
      "Research and validation. I test my assumptions. I ask for sources, challenge the reasoning, check whether the evidence supports the argument. The AI doesn't always get this right, which is why judgment matters. But it's fast, and it surfaces things I would have missed.",
      "The output of a generative session isn't code or a finished product. It's a knowledge base: detailed documentation, requirements, specs, design decisions, and rationale. Everything an agent needs to execute without guessing.",
    ],
  },
  {
    id: "agentic",
    name: "Agentic Session",
    tagline: "Build the thing",
    color: C.agent,
    icon: "⬡",
    detail: [
      "The agentic session starts where the generative session ends. The thinking is done. The plan exists. Now it's time to execute.",
      "I hand the agent a spec, a knowledge base, or a set of requirements produced during the generative phase. The agent reads the material, plans its approach, and starts building. I watch it work.",
      "My role shifts from collaborator to director. I'm looking over the shoulder of a faster, more accurate builder. When it drifts, I redirect. When it makes a choice I disagree with, I say so. When it gets stuck, I provide the context it's missing.",
      "The agent writes code, creates files, runs tests, checks its own work, and iterates. It can stand up an entire project from a single document. What used to take days of manual implementation happens in minutes.",
      "This is the workflow that produced every slide in this presentation. Generative session to think it through. Agentic session to build it. The human value is in the first half. The leverage is in the second.",
    ],
  },
];

export default function WorkflowSlide() {
  const [visible, setVisible] = useState(false);
  const [activeSession, setActiveSession] = useState(null);

  const handleBgClick = useCallback(() => {
    if (activeSession !== null) return;
    if (!visible) setVisible(true);
  }, [visible, activeSession]);

  const openSession = useCallback((i, e) => {
    e.stopPropagation();
    setActiveSession(i);
  }, []);

  const closeModal = useCallback((e) => {
    e.stopPropagation();
    setActiveSession(null);
  }, []);

  const fadeIn = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(12px)",
    transition: `all 0.5s ease ${delay}s`,
  });

  const session = activeSession !== null ? SESSIONS[activeSession] : null;

  return (
    <div
      onClick={handleBgClick}
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: FONT,
        color: C.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        cursor: !visible ? "pointer" : "default",
        userSelect: "none",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{
          fontFamily: DISPLAY,
          fontSize: 14,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: C.dim,
          marginBottom: 12,
        }}>
          Beyond the Chatbot
        </div>
        <h1 style={{
          fontFamily: DISPLAY,
          fontSize: 30,
          fontWeight: 400,
          color: C.bright,
          margin: 0,
          lineHeight: 1.3,
        }}>
          How I Actually Work
        </h1>
        {!visible && (
          <p style={{ fontSize: 12, color: C.dim, marginTop: 10 }}>
            click anywhere to advance
          </p>
        )}
      </div>

      {/* Two elements with arrow */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 800,
      }}>

        {/* Generative Session */}
        <div
          onClick={(e) => visible && openSession(0, e)}
          style={{
            width: 240,
            background: C.surface,
            border: `1px solid ${C.gen}30`,
            borderRadius: 16,
            padding: "36px 24px",
            textAlign: "center",
            cursor: visible ? "pointer" : "default",
            transition: "all 0.3s ease",
            ...fadeIn(visible, 0),
          }}
          onMouseEnter={(e) => {
            if (visible) {
              e.currentTarget.style.borderColor = C.gen;
              e.currentTarget.style.background = `${C.gen}08`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${C.gen}30`;
            e.currentTarget.style.background = C.surface;
          }}
        >
          <div style={{ fontSize: 36, color: C.gen, marginBottom: 16 }}>◎</div>
          <div style={{
            fontSize: 16, fontWeight: 700, color: C.bright,
            marginBottom: 8,
          }}>
            Generative Session
          </div>
          <div style={{ fontSize: 11, color: C.gen, marginBottom: 12 }}>
            Think it through
          </div>
          <div style={{
            fontSize: 9.5, color: C.dim, lineHeight: 1.6,
          }}>
            Brainstorm, plan, research, validate, document
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          ...fadeIn(visible, 0.3),
        }}>
          <svg width="80" height="24" viewBox="0 0 80 24">
            <defs>
              <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.gen} />
                <stop offset="100%" stopColor={C.agent} />
              </linearGradient>
            </defs>
            <line x1="0" y1="12" x2="64" y2="12" stroke="url(#arrowGrad)" strokeWidth="2" />
            <polygon points="64,6 78,12 64,18" fill={C.agent} />
          </svg>
          <div style={{
            fontSize: 8,
            color: C.dim,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}>
            Spec + Knowledge
          </div>
        </div>

        {/* Agentic Session */}
        <div
          onClick={(e) => visible && openSession(1, e)}
          style={{
            width: 240,
            background: C.surface,
            border: `1px solid ${C.agent}30`,
            borderRadius: 16,
            padding: "36px 24px",
            textAlign: "center",
            cursor: visible ? "pointer" : "default",
            transition: "all 0.3s ease",
            ...fadeIn(visible, 0.15),
          }}
          onMouseEnter={(e) => {
            if (visible) {
              e.currentTarget.style.borderColor = C.agent;
              e.currentTarget.style.background = `${C.agent}08`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${C.agent}30`;
            e.currentTarget.style.background = C.surface;
          }}
        >
          <div style={{ fontSize: 36, color: C.agent, marginBottom: 16 }}>⬡</div>
          <div style={{
            fontSize: 16, fontWeight: 700, color: C.bright,
            marginBottom: 8,
          }}>
            Agentic Session
          </div>
          <div style={{ fontSize: 11, color: C.agent, marginBottom: 12 }}>
            Build the thing
          </div>
          <div style={{
            fontSize: 9.5, color: C.dim, lineHeight: 1.6,
          }}>
            Execute, create, test, verify, deliver
          </div>
        </div>
      </div>

      {/* Subtitle */}
      {visible && (
        <div style={{
          marginTop: 40,
          textAlign: "center",
          ...fadeIn(true, 0.6),
        }}>
          <div style={{
            fontSize: 12,
            color: C.text,
            lineHeight: 1.7,
          }}>
            The human value is in the first half. The leverage is in the second.
          </div>
        </div>
      )}

      {/* Modal */}
      {activeSession !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: C.overlay,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 24,
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
              border: `1px solid ${session.color}40`,
              borderRadius: 16,
              padding: "32px 36px",
              maxWidth: 580,
              width: "100%",
              animation: "slideInModal 0.35s ease",
              position: "relative",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            {/* Close */}
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

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 32, color: session.color }}>{session.icon}</span>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY,
                }}>
                  {session.name}
                </div>
                <div style={{ fontSize: 11, color: session.color, marginTop: 2 }}>
                  {session.tagline}
                </div>
              </div>
            </div>

            {/* Detail */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {session.detail.map((para, j) => (
                <div key={j} style={{
                  fontSize: 12,
                  color: j === session.detail.length - 1 ? C.bright : C.text,
                  lineHeight: 1.75,
                  fontWeight: j === session.detail.length - 1 ? 600 : 400,
                }}>
                  {para}
                </div>
              ))}
            </div>

            {/* Accent bar */}
            <div style={{
              marginTop: 24, height: 2, borderRadius: 1,
              background: `linear-gradient(to right, ${session.color}, transparent)`,
            }} />
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div style={{ marginTop: 48, fontSize: 10, color: C.dim }}>
        {visible && activeSession === null && (
          <span style={fadeIn(true, 1)}>click either session to explore</span>
        )}
      </div>
    </div>
  );
}
