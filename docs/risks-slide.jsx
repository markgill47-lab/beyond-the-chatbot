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
  overlay: "rgba(5, 5, 10, 0.85)",
  warn1: "#d4944a",
  warn2: "#c85a5a",
  warn3: "#a83a5a",
};

const RISKS = [
  {
    name: "Institutional Self-Harm",
    color: C.warn1,
    icon: "◎",
    tagline: "The agent did exactly what it was told. That was the problem.",
    detail: [
      "This isn't a story about rogue AI. It's a story about negligence. An institution deploys an agent with access to sensitive records, a poorly curated knowledge base, and instructions that were written in an afternoon. The agent does something technically within its directive that causes real damage.",
      "Agents inherit the quality of their instructions. Vague intent produces unpredictable behavior. An agent told to 'improve efficiency in student communications' might do things that are efficient and catastrophic at the same time, because no one defined what efficiency meant in context.",
      "Too much access is the quiet risk. An agent given broad permissions to speed up deployment can reach data it was never meant to touch. Not because it decided to, but because no one drew the boundary. The agent doesn't know what's sensitive. It only knows what it can reach.",
      "The institutions most at risk are the ones moving fastest. The pressure to deploy AI before competitors, before the next budget cycle, before the board meeting, is exactly the pressure that produces underthought instructions and unchecked access.",
      "This is a governance problem, not a technology problem. And most institutions don't have governance frameworks for systems that can act autonomously.",
    ],
  },
  {
    name: "Competence Without Wisdom",
    color: C.warn2,
    icon: "◇",
    tagline: "Effective without being competent. Capable without understanding.",
    detail: [
      "The generative AI risk conversation is about faking outputs. Someone submits an AI-written essay, an AI-generated image, a report they didn't actually write. That's a problem of authenticity.",
      "The agentic risk is different. It's not about faking an output. It's about faking a capability. Someone can now orchestrate complex, multi-step operations in domains they don't understand. They can build software without understanding software. They can manage data pipelines without understanding data.",
      "The danger isn't that the work is fake. The work is real. The danger is that the person directing it can't tell when something is going wrong. They lack the domain knowledge to recognize a subtle error, a bad assumption, a security flaw, or an ethical boundary.",
      "This is the inversion of the skills slide. Critical thinking, judgment, and experience are what make someone good at directing an agent. Without them, a person can still direct an agent. They'll just be confidently wrong in ways that are harder to detect because the output looks professional.",
      "Every domain is about to encounter people who can produce expert-level artifacts without expert-level understanding. Education, engineering, finance, medicine, law. The outputs will look right. The judgment behind them may not be there.",
    ],
  },
  {
    name: "Democratized Threat Capability",
    color: C.warn3,
    icon: "⬡",
    tagline: "A world with pretty good supervillains.",
    detail: [
      "Nation-states and well-funded organizations have always had access to sophisticated tools for surveillance, manipulation, and disruption. That's not new. What's new is the barrier to entry.",
      "The same communication skill that makes a teacher effective with an agent makes a bad actor effective with one too. Describe what you want clearly enough, provide the right context, and an agent will help you execute. The skill that matters isn't technical. It's intent and clarity of direction.",
      "This means the threat landscape shifts from a small number of highly capable actors to a large number of moderately capable ones. Not criminal masterminds. Not state-sponsored hackers. Just people who are pretty good at describing what they want to happen.",
      "Pretty good is the operative phrase. They won't be elite. They won't build novel zero-day exploits. But they'll be able to orchestrate social engineering at scale, generate convincing disinformation campaigns, automate fraud workflows, and coordinate actions that previously required teams of specialists.",
      "This is the risk that the current conversation about deepfakes and academic integrity does not begin to cover. We're preparing for the wrong threat. The challenge isn't spotting a fake image. It's defending against coordinated, semi-autonomous operations directed by people who couldn't have done this a year ago.",
    ],
  },
];

export default function RisksSlide() {
  const [visible, setVisible] = useState(false);
  const [activeRisk, setActiveRisk] = useState(null);

  const handleBgClick = useCallback(() => {
    if (activeRisk !== null) return;
    if (!visible) setVisible(true);
  }, [visible, activeRisk]);

  const openRisk = useCallback((i, e) => {
    e.stopPropagation();
    setActiveRisk(i);
  }, []);

  const closeModal = useCallback((e) => {
    e.stopPropagation();
    setActiveRisk(null);
  }, []);

  const fadeIn = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(12px)",
    transition: `all 0.5s ease ${delay}s`,
  });

  const risk = activeRisk !== null ? RISKS[activeRisk] : null;

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
      <div style={{ textAlign: "center", marginBottom: 48 }}>
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
          Agentic Risk Is Different
        </h1>
        {!visible && (
          <p style={{ fontSize: 12, color: C.dim, marginTop: 10 }}>
            click anywhere to advance
          </p>
        )}
        {visible && (
          <p style={{
            fontSize: 12,
            color: C.dim,
            marginTop: 10,
            ...fadeIn(true, 0.6),
          }}>
            Agents solve some generative risks. They introduce others.
          </p>
        )}
      </div>

      {/* Risk cards with escalation arrow */}
      <div style={{
        display: "flex",
        alignItems: "stretch",
        gap: 20,
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 960,
      }}>
        {RISKS.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              onClick={(e) => visible && openRisk(i, e)}
              style={{
                width: 250,
                background: C.surface,
                border: `1px solid ${r.color}30`,
                borderRadius: 14,
                padding: "28px 20px",
                textAlign: "center",
                cursor: visible ? "pointer" : "default",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...fadeIn(visible, 0.12 * i),
              }}
              onMouseEnter={(e) => {
                if (visible) {
                  e.currentTarget.style.borderColor = r.color;
                  e.currentTarget.style.background = `${r.color}08`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${r.color}30`;
                e.currentTarget.style.background = C.surface;
              }}
            >
              {/* Severity indicator */}
              <div style={{
                display: "flex",
                gap: 4,
                marginBottom: 16,
              }}>
                {Array.from({ length: i + 1 }).map((_, j) => (
                  <div key={j} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: r.color,
                    opacity: 0.7,
                  }} />
                ))}
                {Array.from({ length: 3 - (i + 1) }).map((_, j) => (
                  <div key={j} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: C.border,
                  }} />
                ))}
              </div>

              <div style={{ fontSize: 28, color: r.color, marginBottom: 14 }}>
                {r.icon}
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: C.bright,
                marginBottom: 10, lineHeight: 1.3,
              }}>
                {r.name}
              </div>
              <div style={{
                fontSize: 9.5, color: C.dim, lineHeight: 1.6,
                fontStyle: "italic",
              }}>
                {r.tagline}
              </div>
            </div>

            {/* Escalation arrow between cards */}
            {i < RISKS.length - 1 && (
              <div style={{
                ...fadeIn(visible, 0.3),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}>
                <svg width="28" height="16" viewBox="0 0 28 16">
                  <line x1="0" y1="8" x2="18" y2="8" stroke={C.border} strokeWidth="1.5" />
                  <polygon points="18,3 28,8 18,13" fill={C.border} />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <div style={{ marginTop: 48, fontSize: 10, color: C.dim }}>
        {visible && activeRisk === null && (
          <span style={fadeIn(true, 1)}>click any risk to explore</span>
        )}
      </div>

      {/* Modal */}
      {activeRisk !== null && (
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
              border: `1px solid ${risk.color}40`,
              borderRadius: 16,
              padding: "32px 36px",
              maxWidth: 600,
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
              <span style={{ fontSize: 32, color: risk.color }}>{risk.icon}</span>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY,
                }}>
                  {risk.name}
                </div>
                <div style={{ fontSize: 11, color: risk.color, marginTop: 2, fontStyle: "italic" }}>
                  {risk.tagline}
                </div>
              </div>
            </div>

            {/* Detail */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {risk.detail.map((para, j) => (
                <div key={j} style={{
                  fontSize: 12,
                  color: j === risk.detail.length - 1 ? C.bright : C.text,
                  lineHeight: 1.75,
                  fontWeight: j === risk.detail.length - 1 ? 600 : 400,
                }}>
                  {para}
                </div>
              ))}
            </div>

            {/* Accent bar */}
            <div style={{
              marginTop: 24, height: 2, borderRadius: 1,
              background: `linear-gradient(to right, ${risk.color}, transparent)`,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
