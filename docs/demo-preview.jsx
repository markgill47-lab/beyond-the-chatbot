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
  bloom: "#5a7aaa",
  create: "#e8a035",
  assess: "#5ab8d8",
  reflect: "#9a6ad8",
  refine: "#4aba7a",
  warn: "#c85a5a",
  demo: "#f0c850",
};

const BLOOM_LEVELS = [
  { label: "Create", w: 0.35 },
  { label: "Evaluate", w: 0.45 },
  { label: "Analyze", w: 0.55 },
  { label: "Apply", w: 0.65 },
  { label: "Understand", w: 0.75 },
  { label: "Remember", w: 0.88 },
];

const CYCLE_STAGES = [
  { label: "Create", color: C.create, angle: -90, desc: "Start by making something" },
  { label: "Assess", color: C.assess, angle: 0, desc: "Evaluate what you made" },
  { label: "Reflect", color: C.reflect, angle: 90, desc: "Understand why it works" },
  { label: "Refine", color: C.refine, angle: 180, desc: "Improve through iteration" },
];

const EXPANDED_PREVIEW = [
  { cat: "What the learner does", icon: "◎" },
  { cat: "What AI enables", icon: "⟷" },
  { cat: "What the instructor does", icon: "◇" },
  { cat: "What evidence emerges", icon: "◈" },
];

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export default function DemoPreview() {
  const [phase, setPhase] = useState(0);
  // 0: title
  // 1: Bloom's pyramid
  // 2: Creation-first cycle
  // 3: Expanded categories preview
  // 4: Demo setup reveal

  const advance = useCallback(() => setPhase(p => Math.min(p + 1, 4)), []);
  const reset = useCallback(() => setPhase(0), []);

  const fadeIn = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `all 0.5s ease ${delay}s`,
  });

  const cycleCX = 170;
  const cycleCY = 140;
  const cycleR = 85;

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
        cursor: "pointer",
        userSelect: "none",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24, maxWidth: 900 }}>
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
          {phase < 4 ? "Rethinking the Taxonomy" : "Live Demo"}
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

      {/* Main content area */}
      <div style={{
        display: "flex",
        gap: 32,
        width: "100%",
        maxWidth: 1000,
        flex: 1,
        minHeight: 0,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>

        {/* LEFT: Bloom's Pyramid */}
        <div style={{
          flex: "1 1 340px",
          maxWidth: 440,
          ...fadeIn(phase >= 1),
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: 14,
            paddingBottom: 10,
            borderBottom: `1px solid ${C.bloom}40`,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.bloom, letterSpacing: 1 }}>
              Bloom's Taxonomy
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Hierarchy. Bottom up. Creation is the capstone.
            </div>
          </div>

          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}>
            {BLOOM_LEVELS.map((level, i) => {
              const width = `${level.w * 100}%`;
              const intensity = 0.3 + (1 - i / BLOOM_LEVELS.length) * 0.7;
              return (
                <div
                  key={i}
                  style={{
                    width,
                    padding: "9px 0",
                    background: `${C.bloom}${Math.round(intensity * 20).toString(16).padStart(2, '0')}`,
                    border: `1px solid ${C.bloom}${Math.round(intensity * 50).toString(16).padStart(2, '0')}`,
                    borderRadius: 4,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: i === 0 ? C.bright : C.text,
                    ...fadeIn(phase >= 1, 0.08 * i),
                  }}
                >
                  {level.label}
                </div>
              );
            })}

            {/* Arrow on side */}
            <div style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 9,
              color: C.dim,
              ...fadeIn(phase >= 1, 0.5),
            }}>
              <span style={{ color: C.bloom }}>↑</span>
              <span>Higher-order thinking</span>
              <span style={{ color: C.dim, margin: "0 4px" }}>|</span>
              <span>Lower-order thinking</span>
              <span style={{ color: C.bloom }}>↓</span>
            </div>
          </div>

          {/* Bloom's critique */}
          {phase >= 2 && (
            <div style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${C.warn}20`,
              background: `${C.warn}06`,
              ...fadeIn(true, 0.3),
            }}>
              <div style={{ fontSize: 10, color: C.warn, lineHeight: 1.6 }}>
                Assumes learning is linear. Creation lives at the top, gated behind five prerequisite stages. Memorization is the foundation.
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Creation-First Cycle */}
        <div style={{
          flex: "1 1 340px",
          maxWidth: 440,
          ...fadeIn(phase >= 2),
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: 14,
            paddingBottom: 10,
            borderBottom: `1px solid ${C.create}40`,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.create, letterSpacing: 1 }}>
              Creation-First
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Cycle. No hierarchy. Every stage equal.
            </div>
          </div>

          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 290,
            position: "relative",
          }}>
            <svg viewBox="0 0 340 280" width="100%" style={{ maxWidth: 340 }}>
              {/* Cycle ring */}
              <circle
                cx={cycleCX} cy={cycleCY} r={cycleR}
                fill="none"
                stroke={C.border}
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />

              {/* Direction arrows on ring */}
              {CYCLE_STAGES.map((stage, i) => {
                const midAngle = stage.angle + 45;
                const [ax, ay] = polar(cycleCX, cycleCY, cycleR, midAngle);
                const tangent = (midAngle + 90) * Math.PI / 180;
                return (
                  <circle
                    key={`arrow_${i}`}
                    cx={ax} cy={ay} r="2"
                    fill={stage.color}
                    opacity="0.5"
                  />
                );
              })}

              {/* Stage nodes */}
              {CYCLE_STAGES.map((stage, i) => {
                const [x, y] = polar(cycleCX, cycleCY, cycleR, stage.angle);
                const [lx, ly] = polar(cycleCX, cycleCY, cycleR + 32, stage.angle);
                return (
                  <g key={`stage_${i}`} style={fadeIn(phase >= 2, 0.15 * i)}>
                    <circle cx={x} cy={y} r="26" fill={C.surface} stroke={stage.color} strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="26" fill={`${stage.color}10`} />
                    <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={stage.color} fontSize="10" fontFamily={FONT} fontWeight="700">
                      {stage.label}
                    </text>
                  </g>
                );
              })}

              {/* Center text */}
              <text x={cycleCX} y={cycleCY - 4} textAnchor="middle" fill={C.dim} fontSize="8" fontFamily={FONT} letterSpacing="1.5">
                NO
              </text>
              <text x={cycleCX} y={cycleCY + 8} textAnchor="middle" fill={C.dim} fontSize="8" fontFamily={FONT} letterSpacing="1.5">
                HIERARCHY
              </text>

              {/* Descriptions */}
              {CYCLE_STAGES.map((stage, i) => {
                const isLeft = stage.angle > 90 || stage.angle < -90;
                const isTop = stage.angle < 0;
                const tx = stage.angle === -90 ? cycleCX : stage.angle === 90 ? cycleCX : stage.angle === 0 ? cycleCX + cycleR + 40 : cycleCX - cycleR - 40;
                const ty = stage.angle === -90 ? cycleCY - cycleR - 22 : stage.angle === 90 ? cycleCY + cycleR + 22 : cycleCY;
                const anchor = stage.angle === 0 ? "start" : stage.angle === 180 ? "end" : "middle";
                return (
                  <text key={`desc_${i}`} x={tx} y={ty} textAnchor={anchor} dominantBaseline="middle" fill={C.dim} fontSize="8.5" fontFamily={FONT} style={fadeIn(phase >= 2, 0.3 + 0.1 * i)}>
                    {stage.desc}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Creation-first rationale */}
          {phase >= 2 && (
            <div style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 8,
              border: `1px solid ${C.create}20`,
              background: `${C.create}06`,
              ...fadeIn(true, 0.5),
            }}>
              <div style={{ fontSize: 10, color: C.create, lineHeight: 1.6 }}>
                AI eliminates the knowledge prerequisite. Learners can create on day one, and the learning happens through the cycle of making, evaluating, reflecting, and improving.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded categories preview */}
      {phase >= 3 && (
        <div style={{
          width: "100%",
          maxWidth: 1000,
          marginTop: 24,
          ...fadeIn(true, 0.2),
        }}>
          <div style={{
            fontSize: 11,
            color: C.dim,
            textAlign: "center",
            marginBottom: 12,
            letterSpacing: 1,
          }}>
            Click any stage to explore:
          </div>
          <div style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            {EXPANDED_PREVIEW.map((item, i) => (
              <div key={i} style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                ...fadeIn(true, 0.1 * i + 0.3),
              }}>
                <span style={{ fontSize: 14, color: C.create }}>{item.icon}</span>
                <span style={{ fontSize: 10, color: C.text }}>{item.cat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo setup reveal */}
      {phase >= 4 && (
        <div style={{
          width: "100%",
          maxWidth: 700,
          marginTop: 28,
          ...fadeIn(true, 0.2),
        }}>
          <div style={{
            background: C.surface,
            border: `1px solid ${C.demo}30`,
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              color: C.demo,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 14,
            }}>
              Live Demo
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginBottom: 16,
              flexWrap: "wrap",
            }}>
              {/* Empty folder */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}>
                <div style={{
                  width: 56, height: 46,
                  border: `1px dashed ${C.border}`,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: C.dim,
                }}>
                  📁
                </div>
                <span style={{ fontSize: 9, color: C.dim }}>Empty folder</span>
              </div>

              <span style={{ fontSize: 18, color: C.demo }}>+</span>

              {/* Single .md file */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}>
                <div style={{
                  padding: "10px 16px",
                  border: `1px solid ${C.demo}40`,
                  borderRadius: 6,
                  background: `${C.demo}10`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.demo,
                }}>
                  spec.md
                </div>
                <span style={{ fontSize: 9, color: C.dim }}>One file</span>
              </div>

              <span style={{ fontSize: 18, color: C.demo }}>→</span>

              {/* Single prompt */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                maxWidth: 220,
              }}>
                <div style={{
                  padding: "10px 14px",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  background: C.bg,
                  fontSize: 10,
                  color: C.bright,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  textAlign: "left",
                }}>
                  "Read the .md file and build what it describes in this folder"
                </div>
                <span style={{ fontSize: 9, color: C.dim }}>One prompt</span>
              </div>
            </div>

            <div style={{
              fontSize: 11,
              color: C.text,
              lineHeight: 1.6,
              maxWidth: 500,
              margin: "0 auto",
            }}>
              An AI agent will read a spec and build this interactive tool from scratch, right here, while we watch.
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 10,
        color: C.dim,
      }}>
        <span style={{ opacity: phase > 0 ? 0.6 : 0.2 }}>{phase}/4</span>
        {phase >= 4 && (
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
