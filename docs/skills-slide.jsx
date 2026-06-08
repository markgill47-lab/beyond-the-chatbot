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
};

const SKILLS = [
  {
    name: "Critical Thinking",
    color: "#e8a035",
    icon: "◎",
    tagline: "The right question matters more than the right syntax",
    detail: [
      "An agent can generate a hundred answers. Only a critical thinker knows which question to ask in the first place.",
      "This means evaluating whether the problem has been framed correctly before any work begins. It means recognizing when an agent is confidently solving the wrong problem. It means knowing when to stop and rethink the approach entirely.",
      "Critical thinking was always the most important skill in any profession. Agentic AI just made it impossible to fake.",
    ],
  },
  {
    name: "Judgment",
    color: "#5ab8d8",
    icon: "◇",
    tagline: "Knowing whether the output is good, not just whether it ran",
    detail: [
      "An agent can produce work that is technically correct and completely wrong for the situation. Judgment is the ability to tell the difference.",
      "This is domain-specific and earned through experience. A financial analyst knows when a model's assumptions are unrealistic. A teacher knows when a lesson plan looks polished but won't survive contact with actual students. An engineer knows when a design will pass review but fail in production.",
      "Judgment can't be prompted. It comes from years of knowing what good looks like.",
    ],
  },
  {
    name: "Creativity",
    color: "#9a6ad8",
    icon: "✦",
    tagline: "Seeing possibilities the agent can't imagine on its own",
    detail: [
      "Agents are powerful executors, but they don't wake up with ideas. They don't see a connection between two unrelated projects. They don't have the restless itch to try something no one has tried before.",
      "Creativity in agentic work means imagining what could exist and then directing an agent to help build it. The agent handles the mechanics. You supply the vision.",
      "This is why creation-first learning matters. The most valuable skill isn't knowing how to do the work. It's knowing what work is worth doing.",
    ],
  },
  {
    name: "Experience",
    color: "#4aba7a",
    icon: "◈",
    tagline: "Knowing what matters in your field and where the stakes are",
    detail: [
      "Every domain has knowledge that doesn't appear in any manual. The unwritten rules, the political dynamics, the things that technically should work but never do.",
      "An experienced professional brings pattern recognition that no model has been trained on. They know which corner cases will cause problems. They know when a 90% solution is good enough and when the last 10% is everything.",
      "Experience is the reason a twenty-year teacher using AI for the first time can outperform a computer science graduate who has never stood in front of a classroom.",
    ],
  },
  {
    name: "Communication",
    color: "#d87a5a",
    icon: "⟡",
    tagline: "It doesn't start with a prompt. It starts with a conversation.",
    detail: [
      "Working with an agent is not about writing the perfect prompt. It's about describing what you need clearly enough that a collaborator can execute it. Then watching the work, recognizing when it's drifting, and redirecting.",
      "This is the same skill that makes someone good at leading a team, mentoring a junior colleague, or explaining a project to a stakeholder. You already have it.",
      "The best agent users aren't the most technical people in the room. They're the clearest communicators.",
    ],
  },
];

export default function SkillsSlide() {
  const [visible, setVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  const handleBgClick = useCallback(() => {
    if (activeSkill !== null) return;
    if (!visible) setVisible(true);
  }, [visible, activeSkill]);

  const openSkill = useCallback((i, e) => {
    e.stopPropagation();
    setActiveSkill(i);
  }, []);

  const closeModal = useCallback((e) => {
    e.stopPropagation();
    setActiveSkill(null);
  }, []);

  const fadeIn = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(12px)",
    transition: `all 0.5s ease ${delay}s`,
  });

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

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
          The Skills That Actually Matter
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
            ...fadeIn(true, 0.8),
          }}>
            None of them are technical.
          </p>
        )}
      </div>

      {/* Skills row */}
      <div style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: 1000,
      }}>
        {SKILLS.map((s, i) => (
          <div
            key={i}
            onClick={(e) => visible && openSkill(i, e)}
            style={{
              width: 155,
              background: C.surface,
              border: `1px solid ${s.color}30`,
              borderRadius: 12,
              padding: "24px 16px",
              textAlign: "center",
              cursor: visible ? "pointer" : "default",
              transition: "all 0.3s ease",
              ...fadeIn(visible, 0.1 * i),
            }}
            onMouseEnter={(e) => {
              if (visible) {
                e.currentTarget.style.borderColor = s.color;
                e.currentTarget.style.background = `${s.color}08`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${s.color}30`;
              e.currentTarget.style.background = C.surface;
            }}
          >
            <div style={{ fontSize: 28, color: s.color, marginBottom: 12 }}>
              {s.icon}
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700, color: C.bright,
              marginBottom: 8, lineHeight: 1.3,
            }}>
              {s.name}
            </div>
            <div style={{ fontSize: 9.5, color: C.dim, lineHeight: 1.5 }}>
              {s.tagline}
            </div>
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      {activeSkill !== null && (
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
              border: `1px solid ${skill.color}40`,
              borderRadius: 16,
              padding: "32px 36px",
              maxWidth: 560,
              width: "100%",
              animation: "slideInModal 0.35s ease",
              position: "relative",
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
              <span style={{ fontSize: 32, color: skill.color }}>{skill.icon}</span>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY,
                }}>
                  {skill.name}
                </div>
                <div style={{ fontSize: 11, color: skill.color, marginTop: 2 }}>
                  {skill.tagline}
                </div>
              </div>
            </div>

            {/* Detail */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {skill.detail.map((para, j) => (
                <div key={j} style={{
                  fontSize: 12,
                  color: j === skill.detail.length - 1 ? C.bright : C.text,
                  lineHeight: 1.75,
                  fontWeight: j === skill.detail.length - 1 ? 600 : 400,
                }}>
                  {para}
                </div>
              ))}
            </div>

            {/* Accent bar */}
            <div style={{
              marginTop: 24, height: 2, borderRadius: 1,
              background: `linear-gradient(to right, ${skill.color}, transparent)`,
            }} />
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div style={{ marginTop: 48, fontSize: 10, color: C.dim }}>
        {visible && activeSkill === null && (
          <span style={fadeIn(true, 1)}>click any skill to explore</span>
        )}
      </div>
    </div>
  );
}
