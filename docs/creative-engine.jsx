import { useState, useEffect, useRef, useCallback } from "react";

const FONT = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const DISPLAY = "'Playfair Display', Georgia, serif";

const C = {
  bg: "#0a0a10",
  surface: "#12121c",
  border: "#1e1e30",
  dim: "#444466",
  text: "#c8c8d8",
  bright: "#e8e8f0",
  core: "#f0c850",
  coreGlow: "#f0c850",
  intent: "#e8a035",
  generate: "#5ab8d8",
  review: "#9a6ad8",
  present: "#4aba7a",
  output: "#5a7aaa",
  arrow: "#e8a03580",
  arrowReturn: "#5ab8d880",
  overlay: "rgba(5, 5, 10, 0.85)",
};

const MODAL_CONTENT = {
  human: {
    name: "The Human at the Center",
    color: "#f0c850",
    tagline: "Judgment, creativity, initiative",
    detail: [
      "Every output begins with a human decision. The engine doesn't start itself. Someone has to define the intent — what are we making, why does it matter, and what does good look like.",
      "The human curates the knowledge that feeds the system. Not everything the AI can access is relevant, accurate, or appropriate. Selecting, organizing, and validating the inputs is a skill that determines the quality of everything downstream.",
      "And at every stage of the cycle, human judgment is the checkpoint. The AI can generate, but only a human can decide whether the output serves the purpose. This is where experience, domain knowledge, and taste become the most valuable assets in the workflow.",
      "The engine amplifies human capability. It does not replace human responsibility.",
    ],
  },
  Intent: {
    name: "Intent",
    color: "#e8a035",
    tagline: "Define what you're making and why",
    detail: [
      "Intent is where creation begins. Before anything is generated, someone has to articulate what needs to exist. Not a prompt — a purpose. What problem does this solve? Who is it for? What should it accomplish?",
      "Clear intent is the single biggest predictor of output quality. A vague intent produces scattered results. A precise intent — with constraints, audience, format, and success criteria — gives the engine everything it needs to produce something useful on the first pass.",
      "This is also where most people underinvest. They jump straight to generation and wonder why the output feels generic. The time spent defining intent is never wasted. It's the highest-leverage moment in the entire cycle.",
    ],
  },
  Generate: {
    name: "Generate",
    color: "#5ab8d8",
    tagline: "Produce the first version",
    detail: [
      "Generation is the stage most people associate with AI. This is where the system takes the defined intent and produces something: a draft, a design, a dataset, a piece of code, an image, a musical sketch.",
      "In an agentic workflow, generation isn't just the AI responding to a single prompt. The agent may plan the work, select tools, execute across multiple steps, and assemble a complete first version autonomously.",
      "The key shift is understanding that generation is not the end. It's the beginning of a cycle. The first output is raw material, not a finished product. The value comes from what happens next.",
    ],
  },
  Review: {
    name: "Review",
    color: "#9a6ad8",
    tagline: "Evaluate against the original intent",
    detail: [
      "Review is where human judgment re-enters the cycle. Does this output match the intent? Is it accurate? Is it good enough? Does it serve the audience? These are questions only a human with domain knowledge can answer.",
      "The AI can assist with review — checking for consistency, flagging potential issues, comparing against criteria. But the final judgment call requires the kind of contextual understanding that comes from experience, not computation.",
      "Review is also where the cycle gets its power. Each review produces specific, actionable feedback that feeds directly back into the next generation pass. The output improves not through luck but through informed iteration.",
    ],
  },
  Present: {
    name: "Present",
    color: "#4aba7a",
    tagline: "Deliver and gather feedback",
    detail: [
      "Presentation is the moment the work meets its audience. This could be publishing a document, shipping software, presenting to stakeholders, sharing a design, or releasing a track. The output leaves the cycle and enters the world.",
      "But presentation is not the end — it's a feedback mechanism. The audience reaction, the real-world performance, the questions people ask, the things that break — all of this becomes input for the next cycle.",
      "This is what makes the engine recursive rather than linear. Every presentation generates new information that refines the intent, improves the generation, and sharpens the review for the next iteration.",
    ],
  },
};

const CX = 350;
const CY = 350;
const INNER_R = 105;
const OUTER_R = 270;

const CYCLE_NODES = [
  { label: "Intent", color: C.intent, angle: -90 },
  { label: "Generate", color: C.generate, angle: 0 },
  { label: "Review", color: C.review, angle: 90 },
  { label: "Present", color: C.present, angle: 180 },
];

const OUTPUTS = [
  { label: "Documents", icon: "📄" },
  { label: "Video", icon: "🎬" },
  { label: "Imagery", icon: "🖼" },
  { label: "Music", icon: "🎵" },
  { label: "Software", icon: "⟨/⟩" },
  { label: "Presentations", icon: "📊" },
  { label: "Databases", icon: "⬡" },
  { label: "3D Models", icon: "◇" },
  { label: "Spreadsheets", icon: "▦" },
];

function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export default function CreativeEngine() {
  const [phase, setPhase] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const advance = useCallback(() => {
    if (activeModal) return;
    setPhase(p => Math.min(p + 1, 3));
  }, [activeModal]);
  const reset = useCallback(() => { setPhase(0); setActiveModal(null); }, []);

  const openModal = useCallback((id, e) => {
    e.stopPropagation();
    if (MODAL_CONTENT[id]) setActiveModal(MODAL_CONTENT[id]);
  }, []);

  const closeModal = useCallback((e) => {
    e.stopPropagation();
    setActiveModal(null);
  }, []);

  const fadeIn = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transition: `opacity 0.6s ease ${delay}s`,
  });

  // Compute positions
  const cyclePositions = CYCLE_NODES.map(n => {
    const [x, y] = polar(CX, CY, INNER_R, n.angle);
    return { ...n, x, y };
  });

  const outputPositions = OUTPUTS.map((o, i) => {
    const angle = (i * 360) / OUTPUTS.length - 90;
    const [x, y] = polar(CX, CY, OUTER_R, angle);
    return { ...o, x, y, angle };
  });

  // Build the cycle path (circle connecting the 4 nodes)
  const cyclePathD = `M ${cyclePositions[0].x} ${cyclePositions[0].y} A ${INNER_R} ${INNER_R} 0 1 1 ${cyclePositions[0].x - 0.01} ${cyclePositions[0].y}`;

  // SVG unique IDs
  const uid = useRef(`eng_${Math.random().toString(36).slice(2, 8)}`).current;

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
        padding: "24px",
        cursor: "pointer",
        userSelect: "none",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 12, maxWidth: 900 }}>
        <div style={{
          fontFamily: DISPLAY,
          fontSize: 14,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: C.dim,
          marginBottom: 10,
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
          The Creative Engine
        </h1>
        <p style={{
          fontSize: 12,
          color: C.dim,
          marginTop: 6,
          ...fadeIn(phase === 0),
        }}>
          click anywhere to advance
        </p>
      </div>

      {/* Engine SVG */}
      <div style={{
        width: "100%",
        maxWidth: 700,
        aspectRatio: "1",
        position: "relative",
      }}>
        <svg
          viewBox="0 0 700 700"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            {/* Core glow */}
            <radialGradient id={`${uid}_coreGlow`}>
              <stop offset="0%" stopColor={C.coreGlow} stopOpacity="0.6" />
              <stop offset="40%" stopColor={C.coreGlow} stopOpacity="0.15" />
              <stop offset="100%" stopColor={C.coreGlow} stopOpacity="0" />
            </radialGradient>

            {/* Ambient glow for cycle ring */}
            <radialGradient id={`${uid}_ringGlow`}>
              <stop offset="0%" stopColor={C.coreGlow} stopOpacity="0" />
              <stop offset="60%" stopColor={C.coreGlow} stopOpacity="0.04" />
              <stop offset="80%" stopColor={C.coreGlow} stopOpacity="0.02" />
              <stop offset="100%" stopColor={C.coreGlow} stopOpacity="0" />
            </radialGradient>

            {/* Arrow markers */}
            <marker id={`${uid}_arrowOut`} markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0,0 6,2.5 0,5" fill={C.arrow} />
            </marker>
            <marker id={`${uid}_arrowIn`} markerWidth="6" markerHeight="5" refX="1" refY="2.5" orient="auto">
              <polygon points="6,0 0,2.5 6,5" fill={C.arrowReturn} />
            </marker>

            {/* Cycle orbit path for animated dots */}
            <path
              id={`${uid}_orbitPath`}
              d={`M ${cyclePositions[0].x} ${cyclePositions[0].y} A ${INNER_R} ${INNER_R} 0 1 1 ${cyclePositions[0].x - 0.01} ${cyclePositions[0].y}`}
              fill="none"
            />

            {/* Outward flow animation */}
            <style>{`
              @keyframes ${uid}_pulse {
                0%, 100% { opacity: 0.5; r: 16; }
                50% { opacity: 0.9; r: 20; }
              }
              @keyframes ${uid}_coreBreath {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.8; }
              }
              @keyframes ${uid}_orbitDot {
                0% { offset-distance: 0%; }
                100% { offset-distance: 100%; }
              }
              @keyframes ${uid}_flowOut {
                0% { offset-distance: 0%; opacity: 0; }
                10% { opacity: 1; }
                85% { opacity: 1; }
                100% { offset-distance: 100%; opacity: 0; }
              }
              @keyframes ${uid}_flowIn {
                0% { offset-distance: 100%; opacity: 0; }
                10% { opacity: 0.7; }
                85% { opacity: 0.7; }
                100% { offset-distance: 0%; opacity: 0; }
              }
              @keyframes ${uid}_nodeAppear {
                0% { opacity: 0; transform: scale(0.5); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>

            {/* Flow paths from center to each output */}
            {outputPositions.map((o, i) => {
              const mx = CX + (o.x - CX) * 0.5;
              const my = CY + (o.y - CY) * 0.5;
              const offset = (i % 2 === 0 ? 1 : -1) * 25;
              return (
                <path
                  key={`path_${i}`}
                  id={`${uid}_flowPath_${i}`}
                  d={`M ${CX} ${CY} Q ${mx + offset} ${my - offset} ${o.x} ${o.y}`}
                  fill="none"
                />
              );
            })}
          </defs>

          {/* Background ring glow */}
          {phase >= 1 && (
            <circle cx={CX} cy={CY} r={200} fill={`url(#${uid}_ringGlow)`} style={fadeIn(true, 0.3)} />
          )}

          {/* Cycle ring track */}
          {phase >= 1 && (
            <circle
              cx={CX} cy={CY} r={INNER_R}
              fill="none"
              stroke={C.border}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={fadeIn(true, 0.2)}
            />
          )}

          {/* Animated orbit dots on cycle ring */}
          {phase >= 1 && [0, 1, 2].map(i => (
            <circle
              key={`orbit_${i}`}
              r="3"
              fill={C.coreGlow}
              opacity="0.7"
              style={{
                offsetPath: `path("M ${cyclePositions[0].x} ${cyclePositions[0].y} A ${INNER_R} ${INNER_R} 0 1 1 ${cyclePositions[0].x - 0.01} ${cyclePositions[0].y}")`,
                animation: `${uid}_orbitDot 4s linear infinite`,
                animationDelay: `${i * 1.33}s`,
              }}
            />
          ))}

          {/* Cycle node connection arcs */}
          {phase >= 1 && cyclePositions.map((node, i) => {
            const next = cyclePositions[(i + 1) % 4];
            const midAngle = (node.angle + next.angle + (next.angle < node.angle ? 360 : 0)) / 2;
            return (
              <line
                key={`conn_${i}`}
                x1={node.x} y1={node.y}
                x2={next.x} y2={next.y}
                stroke={C.border}
                strokeWidth="1"
                strokeDasharray="3 3"
                style={fadeIn(true, 0.3 + i * 0.1)}
              />
            );
          })}

          {/* Cycle nodes */}
          {phase >= 1 && cyclePositions.map((node, i) => (
            <g key={`node_${i}`} style={{ ...fadeIn(true, 0.2 + i * 0.15), cursor: phase >= 1 ? "pointer" : "default" }} onClick={(e) => openModal(node.label, e)}>
              <circle
                cx={node.x} cy={node.y} r="28"
                fill={C.surface}
                stroke={node.color}
                strokeWidth="1.5"
              />
              <circle
                cx={node.x} cy={node.y} r="28"
                fill={`${node.color}10`}
              />
              <text
                x={node.x} y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color}
                fontSize="9.5"
                fontFamily={FONT}
                fontWeight="700"
              >
                {node.label}
              </text>
              {/* Direction arrow hint */}
              {(() => {
                const next = cyclePositions[(i + 1) % 4];
                const dx = next.x - node.x;
                const dy = next.y - node.y;
                const len = Math.sqrt(dx*dx + dy*dy);
                const ax = node.x + (dx/len) * 38;
                const ay = node.y + (dy/len) * 38;
                return (
                  <circle cx={ax} cy={ay} r="2" fill={node.color} opacity="0.5" />
                );
              })()}
            </g>
          ))}

          {/* Core glow */}
          {phase >= 1 && (
            <circle
              cx={CX} cy={CY} r="60"
              fill={`url(#${uid}_coreGlow)`}
              style={{
                animation: `${uid}_coreBreath 3s ease-in-out infinite`,
              }}
            />
          )}

          {/* Core center */}
          {phase >= 1 && (
            <g style={{ ...fadeIn(true, 0), cursor: "pointer" }} onClick={(e) => openModal("human", e)}>
              <circle cx={CX} cy={CY} r="18" fill={C.surface} stroke={C.core} strokeWidth="2" />
              <circle cx={CX} cy={CY} r="18" fill={`${C.core}20`} />
              <circle
                cx={CX} cy={CY} r="6"
                fill={C.core}
                style={{
                  animation: `${uid}_pulse 2.5s ease-in-out infinite`,
                }}
              />
            </g>
          )}

          {/* Core label */}
          {phase >= 1 && (
            <text
              x={CX} y={CY + 38}
              textAnchor="middle"
              fill={C.core}
              fontSize="8"
              fontFamily={FONT}
              fontWeight="700"
              letterSpacing="2"
              style={fadeIn(true, 0.5)}
            >
              HUMAN
            </text>
          )}

          {/* Flow paths (visible lines from center to outputs) */}
          {phase >= 3 && outputPositions.map((o, i) => {
            const mx = CX + (o.x - CX) * 0.5;
            const my = CY + (o.y - CY) * 0.5;
            const offset = (i % 2 === 0 ? 1 : -1) * 25;
            return (
              <path
                key={`flowline_${i}`}
                d={`M ${CX} ${CY} Q ${mx + offset} ${my - offset} ${o.x} ${o.y}`}
                fill="none"
                stroke={C.border}
                strokeWidth="0.5"
                strokeDasharray="2 4"
                style={fadeIn(true, 0.1 * i)}
              />
            );
          })}

          {/* Animated flow dots - outward */}
          {phase >= 3 && outputPositions.map((o, i) => {
            const mx = CX + (o.x - CX) * 0.5;
            const my = CY + (o.y - CY) * 0.5;
            const offset = (i % 2 === 0 ? 1 : -1) * 25;
            const pathD = `M ${CX} ${CY} Q ${mx + offset} ${my - offset} ${o.x} ${o.y}`;
            return [0, 1].map(j => (
              <circle
                key={`flowdot_out_${i}_${j}`}
                r="2.5"
                fill={C.core}
                style={{
                  offsetPath: `path("${pathD}")`,
                  animation: `${uid}_flowOut ${3 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3 + j * 1.5}s`,
                }}
              />
            ));
          })}

          {/* Animated flow dots - inward (return) */}
          {phase >= 3 && outputPositions.map((o, i) => {
            const mx = CX + (o.x - CX) * 0.5;
            const my = CY + (o.y - CY) * 0.5;
            const offset = (i % 2 === 0 ? 1 : -1) * 25;
            // Slightly different curve for return path
            const retOffset = -offset;
            const pathD = `M ${CX} ${CY} Q ${mx + retOffset} ${my - retOffset} ${o.x} ${o.y}`;
            return (
              <circle
                key={`flowdot_in_${i}`}
                r="2"
                fill={C.arrowReturn}
                opacity="0.8"
                style={{
                  offsetPath: `path("${pathD}")`,
                  animation: `${uid}_flowIn ${4 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4 + 1}s`,
                }}
              />
            );
          })}

          {/* Output nodes */}
          {phase >= 2 && outputPositions.map((o, i) => {
            // Label positioning
            const labelAngle = (i * 360) / OUTPUTS.length - 90;
            const [lx, ly] = polar(CX, CY, OUTER_R + 28, labelAngle);
            const textAnchor = lx < CX - 20 ? "end" : lx > CX + 20 ? "start" : "middle";

            return (
              <g key={`output_${i}`} style={fadeIn(true, 0.08 * i)}>
                {/* Node circle */}
                <circle
                  cx={o.x} cy={o.y} r="22"
                  fill={C.surface}
                  stroke={C.output}
                  strokeWidth="1"
                />
                <circle
                  cx={o.x} cy={o.y} r="22"
                  fill={`${C.output}08`}
                />
                {/* Icon */}
                <text
                  x={o.x} y={o.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                >
                  {o.icon}
                </text>
                {/* Label */}
                <text
                  x={lx} y={ly}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fill={C.dim}
                  fontSize="9"
                  fontFamily={FONT}
                  fontWeight="600"
                >
                  {o.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom legend */}
      {phase >= 1 && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          marginTop: 8,
          fontSize: 10,
          ...fadeIn(true, 0.5),
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.core }} />
            <span style={{ color: C.dim }}>Human Judgment, Creativity, Initiative</span>
          </div>
          {phase >= 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 20, height: 2, background: C.border, borderRadius: 1 }}>
                <div style={{ width: 6, height: 2, background: C.coreGlow, borderRadius: 1 }} />
              </div>
              <span style={{ color: C.dim }}>Recursive Cycle</span>
            </div>
          )}
          {phase >= 3 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.core }} />
                <span style={{ color: C.dim }}>Creation Flow</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.arrowReturn }} />
                <span style={{ color: C.dim }}>Feedback Flow</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Click hint */}
      {phase >= 1 && !activeModal && (
        <div style={{ fontSize: 10, color: C.dim, marginTop: 4, opacity: 0.6 }}>
          click any element to explore
        </div>
      )}

      {/* Modal */}
      {activeModal && (
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
              border: `1px solid ${activeModal.color}40`,
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
                border: `2px solid ${activeModal.color}`,
                background: `${activeModal.color}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: activeModal.color }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY }}>
                  {activeModal.name}
                </div>
                <div style={{ fontSize: 11, color: activeModal.color, marginTop: 2 }}>
                  {activeModal.tagline}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {activeModal.detail.map((para, j) => (
                <div key={j} style={{
                  fontSize: 12,
                  color: j === activeModal.detail.length - 1 ? C.bright : C.text,
                  lineHeight: 1.75,
                  fontWeight: j === activeModal.detail.length - 1 ? 600 : 400,
                }}>
                  {para}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24, height: 2, borderRadius: 1,
              background: `linear-gradient(to right, ${activeModal.color}, transparent)`,
            }} />
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 10,
        color: C.dim,
      }}>
        <span style={{ opacity: phase > 0 ? 0.6 : 0.2 }}>{phase}/3</span>
        {phase >= 3 && (
          <button
            onClick={(e) => { e.stopPropagation(); reset(); }}
            style={{
              background: "none",
              border: `1px solid ${C.border}`,
              color: C.dim,
              padding: "4px 12px",
              borderRadius: 4,
              cursor: "pointer",
              fontSize: 10,
              fontFamily: FONT,
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
