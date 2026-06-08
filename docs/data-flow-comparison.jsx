import { useState, useEffect, useCallback } from "react";

const FONT = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const DISPLAY = "'Playfair Display', Georgia, serif";

const C = {
  bg: "#0a0a10",
  surface: "#12121c",
  border: "#1e1e30",
  dim: "#444466",
  text: "#c8c8d8",
  bright: "#e8e8f0",
  genAccent: "#5a7aaa",
  genGlow: "#5a7aaa20",
  agentAccent: "#e8a035",
  agentGlow: "#e8a03520",
  cloud: "#3a4a6a",
  file: "#2a3a4a",
  success: "#4aba7a",
  warn: "#c85a5a",
  api: "#5ab8d8",
  overlay: "rgba(5, 5, 10, 0.85)",
};

// Animated dots for data flowing
function FlowDots({ color, vertical = false, reverse = false, active = true, count = 3 }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setFrame(f => f + 1), 600);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div style={{
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      gap: 4,
      alignItems: "center",
      justifyContent: "center",
      padding: vertical ? "4px 0" : "0 4px",
    }}>
      {Array.from({ length: count }).map((_, i) => {
        const idx = reverse ? (count - 1 - i) : i;
        const lit = active && (frame % count) === idx;
        return (
          <div key={i} style={{
            width: 4, height: 4, borderRadius: "50%",
            background: lit ? color : color + "30",
            transition: "background 0.3s",
          }} />
        );
      })}
    </div>
  );
}

function FileIcon({ name, stale, small }) {
  const s = small ? 10 : 12;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: small ? 9 : 10,
      color: stale ? C.warn : C.text,
      opacity: stale ? 0.5 : 0.9,
    }}>
      <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
        <path d="M3 1h7l4 4v10H3V1z" stroke={stale ? C.warn : C.dim} strokeWidth="1.2" fill={C.surface} />
        <path d="M10 1v4h4" stroke={stale ? C.warn : C.dim} strokeWidth="1.2" />
      </svg>
      <span>{name}</span>
      {stale && <span style={{ fontSize: 7, color: C.warn, fontWeight: 700 }}>STALE</span>}
    </div>
  );
}

export default function DataFlowComparison() {
  const [phase, setPhase] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const advance = useCallback(() => { if (!showDetail) setPhase(p => Math.min(p + 1, 3)); }, [showDetail]);
  const reset = useCallback(() => { setPhase(0); setShowDetail(false); }, []);

  const fadeIn = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `all 0.5s ease ${delay}s`,
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
        padding: "32px 24px",
        cursor: "pointer",
        userSelect: "none",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28, maxWidth: 900 }}>
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
          Where Does the Knowledge Live?
        </h1>
        <p style={{
          fontSize: 12,
          color: C.dim,
          marginTop: 8,
          ...fadeIn(phase === 0),
        }}>
          click anywhere to advance
        </p>
        {phase >= 1 && (
          <button onClick={(e) => { e.stopPropagation(); setShowDetail(true); }} style={{
            marginTop: 10, background: "none", border: `1px solid ${C.border}`, color: C.dim,
            padding: "5px 14px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontFamily: FONT, transition: "all 0.3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.bright; e.currentTarget.style.color = C.bright; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
          >What am I looking at?</button>
        )}
      </div>

      {/* Main comparison */}
      <div style={{
        display: "flex",
        gap: 32,
        width: "100%",
        maxWidth: 1000,
        flex: 1,
        minHeight: 0,
      }}>

        {/* LEFT: Generative Data Flow */}
        <div style={{ flex: 1, ...fadeIn(phase >= 1), display: "flex", flexDirection: "column" }}>
          <div style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.genAccent}40`,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.genAccent, letterSpacing: 1 }}>
              Generative AI
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Data scattered, human-shuttled
            </div>
          </div>

          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 16,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            {/* Your machine */}
            <div style={{
              border: `1px solid ${C.genAccent}30`,
              borderRadius: 8,
              padding: 10,
              background: C.bg,
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.genAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}>
                Your Machine
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <FileIcon name="report.docx" />
                <FileIcon name="data.xlsx" />
                <FileIcon name="notes.md" />
                <FileIcon name="budget.csv" />
              </div>
            </div>

            {/* Manual upload arrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "2px 0" }}>
              <span style={{ fontSize: 9, color: C.dim }}>copy / paste / upload</span>
              <FlowDots color={C.genAccent} active={phase >= 1} />
              <span style={{ fontSize: 12, color: C.genAccent }}>↓</span>
            </div>

            {/* Cloud project */}
            <div style={{
              border: `1px dashed ${C.cloud}`,
              borderRadius: 8,
              padding: 10,
              background: `${C.cloud}10`,
              position: "relative",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.cloud,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ fontSize: 12 }}>☁</span>
                Someone Else's Server
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <FileIcon name="report_v2.docx" stale small />
                <FileIcon name="data (1).xlsx" stale small />
                <FileIcon name="notes_final.md" small />
                <FileIcon name="budget_old.csv" stale small />
              </div>
              <div style={{
                marginTop: 8,
                fontSize: 9,
                color: C.warn,
                fontStyle: "italic",
                opacity: 0.7,
              }}>
                Snapshots at time of upload
              </div>
            </div>

            {/* The chat window sees fragments */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "2px 0" }}>
              <span style={{ fontSize: 12, color: C.dim }}>↓</span>
              <span style={{ fontSize: 9, color: C.dim }}>fragments visible to AI</span>
            </div>

            {/* AI view */}
            <div style={{
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: 10,
              background: C.bg,
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.dim,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
              }}>
                What the AI Sees
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                fontSize: 20,
                marginBottom: 4,
              }}>
                <span style={{ opacity: 0.3 }}>📄</span>
                <span style={{ opacity: 0.6 }}>📄</span>
                <span style={{ opacity: 0.15 }}>📄</span>
                <span style={{ opacity: 0.08 }}>📄</span>
              </div>
              <div style={{ fontSize: 9, color: C.warn, fontStyle: "italic" }}>
                Partial. Out of date. No project awareness.
              </div>
            </div>

            {/* Human shuttle loop */}
            <div style={{
              marginTop: 4,
              border: `1px solid ${C.warn}20`,
              borderRadius: 8,
              padding: 8,
              background: `${C.warn}08`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 9, color: C.warn, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                The Human Loop
              </div>
              <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
                Read AI output → Copy response →<br/>
                Paste into local file → Test → Fix →<br/>
                Re-upload → Repeat
              </div>
            </div>
          </div>

          {phase >= 3 && (
            <div style={{ marginTop: 14, ...fadeIn(true, 0.2) }}>
              {[
                "Knowledge is static snapshots",
                "Human is the integration layer",
                "AI advises; you implement",
                "Version drift is constant",
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: 10.5, color: C.dim, padding: "4px 0",
                  display: "flex", alignItems: "center", gap: 8,
                  ...fadeIn(true, 0.1 * i + 0.3),
                }}>
                  <span style={{ color: C.genAccent, fontSize: 8 }}>—</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          width: 1,
          background: `linear-gradient(${C.bg}, ${C.border}, ${C.bg})`,
          ...fadeIn(phase >= 2),
        }} />

        {/* RIGHT: Agentic Data Flow */}
        <div style={{ flex: 1, ...fadeIn(phase >= 2), display: "flex", flexDirection: "column" }}>
          <div style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.agentAccent}40`,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.agentAccent, letterSpacing: 1 }}>
              Agentic AI
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Embedded in the knowledge
            </div>
          </div>

          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 16,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            {/* Project workspace - agent lives here */}
            <div style={{
              border: `1px solid ${C.agentAccent}40`,
              borderRadius: 8,
              padding: 12,
              background: C.agentGlow,
              position: "relative",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.agentAccent,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ fontSize: 12 }}>◎</span>
                Your Project &mdash; Agent Lives Here
              </div>

              {/* Files with live status */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { name: "report.docx", status: "modified", ago: "2m ago" },
                  { name: "data.xlsx", status: "read", ago: "just now" },
                  { name: "analysis.py", status: "created", ago: "5m ago" },
                  { name: "notes.md", status: "current", ago: "" },
                  { name: "budget.csv", status: "read", ago: "just now" },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 10,
                    padding: "3px 6px",
                    borderRadius: 4,
                    background: f.status === "modified" || f.status === "created" ? `${C.success}10` : "transparent",
                  }}>
                    <svg width={11} height={11} viewBox="0 0 16 16" fill="none">
                      <path d="M3 1h7l4 4v10H3V1z" stroke={C.agentAccent} strokeWidth="1.2" fill={C.surface} />
                      <path d="M10 1v4h4" stroke={C.agentAccent} strokeWidth="1.2" />
                    </svg>
                    <span style={{ flex: 1, color: C.bright }}>{f.name}</span>
                    <span style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: f.status === "modified" ? C.success : f.status === "created" ? C.agentAccent : C.dim,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}>
                      {f.status}
                    </span>
                    {f.ago && (
                      <span style={{ fontSize: 8, color: C.dim }}>{f.ago}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* API connections - water through a hose */}
            <div style={{
              border: `1px solid ${C.api}30`,
              borderRadius: 8,
              padding: 10,
              background: `${C.api}08`,
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.api,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{ fontSize: 11 }}>⟷</span>
                API Connections
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  { name: "Cloud Storage", desc: "Sync project files" },
                  { name: "Database", desc: "Query live data" },
                  { name: "External Services", desc: "Targeted requests" },
                ].map((api, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 10,
                  }}>
                    <FlowDots color={C.api} active={phase >= 2} count={2} />
                    <span style={{ color: C.bright, fontWeight: 600 }}>{api.name}</span>
                    <span style={{ color: C.dim, fontSize: 9 }}>{api.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 8,
                fontSize: 9,
                color: C.api,
                fontStyle: "italic",
                opacity: 0.7,
              }}>
                Data flows through APIs like water through a hose.
                <br />Directed. Specific. Nothing dumped.
              </div>
            </div>

            {/* What the agent sees */}
            <div style={{
              border: `1px solid ${C.success}30`,
              borderRadius: 8,
              padding: 10,
              background: `${C.success}08`,
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.success,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
              }}>
                What the Agent Sees
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                fontSize: 20,
                marginBottom: 4,
              }}>
                <span style={{ opacity: 0.9 }}>📄</span>
                <span style={{ opacity: 0.9 }}>📄</span>
                <span style={{ opacity: 0.9 }}>📄</span>
                <span style={{ opacity: 0.9 }}>📄</span>
              </div>
              <div style={{ fontSize: 9, color: C.success, fontStyle: "italic" }}>
                Everything. Current. In context.
              </div>
            </div>

            {/* No human loop */}
            <div style={{
              marginTop: 4,
              border: `1px solid ${C.agentAccent}20`,
              borderRadius: 8,
              padding: 8,
              background: `${C.agentAccent}08`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 9, color: C.agentAccent, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                The Agent Loop
              </div>
              <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
                Read project state → Plan changes →<br/>
                Write files directly → Test → Verify →<br/>
                Commit → Move to next task
              </div>
            </div>
          </div>

          {phase >= 3 && (
            <div style={{ marginTop: 14, ...fadeIn(true, 0.2) }}>
              {[
                "Knowledge is live, not snapshots",
                "Agent is the integration layer",
                "AI executes; you direct",
                "Single source of truth",
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: 10.5, color: C.dim, padding: "4px 0",
                  display: "flex", alignItems: "center", gap: 8,
                  ...fadeIn(true, 0.1 * i + 0.3),
                }}>
                  <span style={{ color: C.agentAccent, fontSize: 8 }}>◆</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        marginTop: 24,
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
      {showDetail && (
        <div onClick={(e) => { e.stopPropagation(); setShowDetail(false); }} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: C.overlay, display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: 24,
        }}>
          <style>{`@keyframes slideInModal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
            padding: "32px 36px", maxWidth: 580, width: "100%",
            animation: "slideInModal 0.35s ease", position: "relative", maxHeight: "85vh", overflowY: "auto",
          }}>
            <button onClick={(e) => { e.stopPropagation(); setShowDetail(false); }} style={{
              position: "absolute", top: 14, right: 16, background: "none", border: "none",
              color: C.dim, fontSize: 18, cursor: "pointer", fontFamily: FONT, padding: "4px 8px",
            }}>×</button>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY, marginBottom: 6 }}>
              Where Does the Knowledge Live?
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 18 }}>Data flow in generative vs. agentic workflows</div>
            {[
              "In a generative workflow, your data goes somewhere else. You upload files to a cloud project, paste content into a chat window, and attach documents to a conversation thread. Each upload is a static snapshot — frozen at the moment you sent it. The AI sees fragments, never the complete picture.",
              "The human becomes the integration layer. You read the AI's output, copy it, paste it into your local files, test it, fix what's wrong, and re-upload for the next round. Every cycle requires manual shuttling of information back and forth. Version drift is constant.",
              "In an agentic workflow, the agent operates directly within your project files. It reads your documents, writes code into your codebase, modifies your spreadsheets — all locally. When it needs cloud services, data flows through APIs like water through a hose: directed, specific, nothing dumped.",
              "The fundamental difference: generative AI works on copies of your knowledge. Agentic AI works inside your knowledge.",
            ].map((para, j) => (
              <div key={j} style={{
                fontSize: 12, color: j === 3 ? C.bright : C.text, lineHeight: 1.75,
                fontWeight: j === 3 ? 600 : 400, marginBottom: 14,
              }}>{para}</div>
            ))}
            <div style={{ height: 2, borderRadius: 1, background: `linear-gradient(to right, ${C.agentAccent}, transparent)` }} />
          </div>
        </div>
      )}
    </div>
  );
}
