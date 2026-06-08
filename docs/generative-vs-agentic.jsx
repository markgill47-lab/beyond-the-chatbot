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
  genGlow: "#5a7aaa30",
  agentAccent: "#e8a035",
  agentGlow: "#e8a03530",
  userBubble: "#1a2a3a",
  aiBubble: "#1a1a2e",
  success: "#4aba7a",
  parallel: "#9a6ad8",
  overlay: "rgba(5, 5, 10, 0.85)",
};

// Generative chat messages - bilateral exchange
const CHAT_MESSAGES = [
  { from: "user", text: "Here's our Q3 revenue data: [pastes 200 rows]. Our target was $2.4M. How did we do by region?" },
  { from: "ai", text: "Based on the data you provided, the Midwest exceeded target by 12% while the West Coast fell short by 8%..." },
  { from: "user", text: "OK now here's the data again plus last year's numbers: [pastes 400 rows]. Compare YoY growth." },
  { from: "ai", text: "Comparing the two datasets you've shared, year-over-year growth was strongest in..." },
  { from: "user", text: "Wait, I think some rows were cut off. Let me paste it again: [re-pastes data]. Also here's the Q2 numbers for context: [pastes 200 more rows]..." },
];

// Agentic workflow nodes
const AGENT_STEPS = [
  { id: "goal", label: "Goal", detail: "Analyze Q3 performance vs targets, compare YoY", icon: "◎" },
  { id: "plan", label: "Plan", detail: "Break into 3 subtasks, identify data sources", icon: "◇" },
  { id: "exec", label: "Execute", detail: "Read files, query databases, run analysis", icon: "⬡", parallel: true },
  { id: "check", label: "Verify", detail: "Cross-check totals, validate assumptions", icon: "◈" },
  { id: "deliver", label: "Deliver", detail: "Report with charts, sources cited, caveats noted", icon: "◉" },
];

const PARALLEL_TASKS = [
  { label: "Read Q3 spreadsheet", status: "done" },
  { label: "Query CRM database", status: "done" },
  { label: "Pull Q2 baseline", status: "done" },
  { label: "Fetch regional targets", status: "done" },
];

const CONTEXT_ITEMS = [
  "Project files",
  "Databases",
  "Prior analysis",
  "Company context",
  "Tool access",
];

export default function GenerativeVsAgentic() {
  const [phase, setPhase] = useState(0);
  // Phase 0: Title only
  // Phase 1: Show generative side
  // Phase 2: Show agentic side
  // Phase 3: Show the contrast callouts
  
  const [chatVisible, setChatVisible] = useState(0);
  const [agentStep, setAgentStep] = useState(0);
  const [showContext, setShowContext] = useState(false);
  const [showParallel, setShowParallel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Auto-animate chat messages when generative phase is active
  useEffect(() => {
    if (phase >= 1 && chatVisible < CHAT_MESSAGES.length) {
      const t = setTimeout(() => setChatVisible(v => v + 1), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, chatVisible]);

  // Auto-animate agent steps when agentic phase is active
  useEffect(() => {
    if (phase >= 2 && agentStep < AGENT_STEPS.length) {
      const t = setTimeout(() => {
        setAgentStep(v => v + 1);
        if (agentStep === 1) setTimeout(() => setShowContext(true), 400);
        if (agentStep === 2) setTimeout(() => setShowParallel(true), 400);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, agentStep]);

  const advance = useCallback(() => {
    if (showDetail) return;
    setPhase(p => Math.min(p + 1, 3));
  }, [showDetail]);

  const reset = useCallback(() => {
    setPhase(0);
    setChatVisible(0);
    setAgentStep(0);
    setShowContext(false);
    setShowParallel(false);
  }, []);

  const fadeIn = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `all 0.5s ease ${delay}s`,
  });

  return (
    <div
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
      onClick={advance}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32, maxWidth: 900 }}>
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
          fontSize: 32,
          fontWeight: 400,
          color: C.bright,
          margin: 0,
          lineHeight: 1.3,
        }}>
          Generative <span style={{ color: C.dim }}>vs.</span> Agentic
        </h1>
        <p style={{
          fontSize: 12,
          color: C.dim,
          marginTop: 10,
          ...fadeIn(phase === 0),
        }}>
          click anywhere to advance
        </p>
        {phase >= 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
            style={{
              marginTop: 10,
              background: "none",
              border: `1px solid ${C.border}`,
              color: C.dim,
              padding: "5px 14px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 10,
              fontFamily: FONT,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.bright; e.currentTarget.style.color = C.bright; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
          >
            What am I looking at?
          </button>
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
        
        {/* LEFT: Generative AI */}
        <div style={{
          flex: 1,
          ...fadeIn(phase >= 1),
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Column header */}
          <div style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.genAccent}40`,
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.genAccent,
              letterSpacing: 1,
            }}>
              Generative AI
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Bilateral exchange
            </div>
          </div>

          {/* Chat container */}
          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 16,
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Chat header bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
              paddingBottom: 10,
              borderBottom: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: C.genAccent,
              }} />
              <span style={{ fontSize: 11, color: C.dim }}>Chat Interface</span>
            </div>

            {/* Messages */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CHAT_MESSAGES.map((msg, i) => (
                <div key={i} style={{
                  ...fadeIn(i < chatVisible, i * 0.05),
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    background: msg.from === "user" ? C.userBubble : C.aiBubble,
                    border: `1px solid ${msg.from === "user" ? C.genAccent + "30" : C.border}`,
                    borderRadius: msg.from === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                    padding: "8px 12px",
                    maxWidth: "88%",
                    fontSize: 10.5,
                    lineHeight: 1.5,
                    color: msg.from === "user" ? C.bright : C.text,
                  }}>
                    <div style={{
                      fontSize: 9,
                      color: msg.from === "user" ? C.genAccent : C.dim,
                      marginBottom: 3,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}>
                      {msg.from === "user" ? "You" : "AI"}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Fade-out gradient at bottom */}
            {chatVisible >= CHAT_MESSAGES.length && phase >= 1 && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
                background: `linear-gradient(transparent, ${C.surface})`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 10,
                ...fadeIn(true, 0.5),
              }}>
                <span style={{
                  fontSize: 10,
                  color: C.genAccent,
                  fontStyle: "italic",
                  opacity: 0.7,
                }}>
                  ...paste it again, with more context this time...
                </span>
              </div>
            )}
          </div>

          {/* Generative limitations */}
          {phase >= 3 && (
            <div style={{
              marginTop: 14,
              ...fadeIn(true, 0.2),
            }}>
              {[
                "User provides all context",
                "Knowledge resets each exchange",
                "Single response per turn",
                "Can't act, only advise",
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: 10.5,
                  color: C.dim,
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
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

        {/* RIGHT: Agentic AI */}
        <div style={{
          flex: 1,
          ...fadeIn(phase >= 2),
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Column header */}
          <div style={{
            textAlign: "center",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${C.agentAccent}40`,
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.agentAccent,
              letterSpacing: 1,
            }}>
              Agentic AI
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
              Orchestrated autonomy
            </div>
          </div>

          {/* Agent system */}
          <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 16,
            flex: 1,
            overflow: "hidden",
          }}>
            {/* Pipeline steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {AGENT_STEPS.map((step, i) => {
                const active = i < agentStep;
                const current = i === agentStep - 1;
                return (
                  <div key={step.id}>
                    {/* Step row */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: current ? C.agentGlow : "transparent",
                      border: `1px solid ${active ? C.agentAccent + "40" : C.border}`,
                      ...fadeIn(active, 0),
                      transition: "all 0.4s ease",
                    }}>
                      <span style={{
                        fontSize: 16,
                        color: active ? C.agentAccent : C.dim,
                        width: 22,
                        textAlign: "center",
                        transition: "color 0.3s",
                      }}>
                        {step.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: active ? C.bright : C.dim,
                          transition: "color 0.3s",
                        }}>
                          {step.label}
                        </div>
                        <div style={{
                          fontSize: 10,
                          color: active ? C.text : C.dim,
                          marginTop: 1,
                          transition: "color 0.3s",
                        }}>
                          {step.detail}
                        </div>
                      </div>
                      {active && (
                        <div style={{
                          fontSize: 9,
                          color: C.success,
                          fontWeight: 700,
                          opacity: current ? 0.5 : 1,
                        }}>
                          {current ? "RUNNING" : "DONE"}
                        </div>
                      )}
                    </div>

                    {/* Parallel tasks expansion */}
                    {step.parallel && showParallel && (
                      <div style={{
                        marginLeft: 42,
                        marginTop: 4,
                        marginBottom: 4,
                        ...fadeIn(true, 0.2),
                      }}>
                        <div style={{
                          fontSize: 9,
                          color: C.parallel,
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}>
                          Parallel Execution
                        </div>
                        {PARALLEL_TASKS.map((task, j) => (
                          <div key={j} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "2px 0",
                            fontSize: 9.5,
                            color: C.text,
                            ...fadeIn(true, 0.1 * j + 0.3),
                          }}>
                            <span style={{ color: C.success, fontSize: 10 }}>✓</span>
                            {task.label}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Connector line between steps */}
                    {i < AGENT_STEPS.length - 1 && (
                      <div style={{
                        marginLeft: 20,
                        height: step.parallel && showParallel ? 4 : 4,
                        borderLeft: `1px solid ${active ? C.agentAccent + "40" : C.border}`,
                        transition: "border-color 0.3s",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Context layer */}
            {showContext && (
              <div style={{
                marginTop: 14,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px dashed ${C.agentAccent}30`,
                background: `${C.agentAccent}08`,
                ...fadeIn(true, 0.2),
              }}>
                <div style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.agentAccent,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}>
                  Persistent Context Layer
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {CONTEXT_ITEMS.map((item, i) => (
                    <span key={i} style={{
                      fontSize: 9.5,
                      color: C.text,
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: 4,
                      padding: "3px 8px",
                      ...fadeIn(true, 0.1 * i + 0.3),
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agentic capabilities */}
          {phase >= 3 && (
            <div style={{
              marginTop: 14,
              ...fadeIn(true, 0.2),
            }}>
              {[
                "Agent holds the context",
                "Plans before executing",
                "Parallelizes subtasks",
                "Checks its own work",
              ].map((item, i) => (
                <div key={i} style={{
                  fontSize: 10.5,
                  color: C.dim,
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
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

      {/* Bottom nav hint */}
      <div style={{
        marginTop: 24,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 10,
        color: C.dim,
      }}>
        <span style={{ opacity: phase > 0 ? 0.6 : 0.2 }}>
          {phase}/3
        </span>
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
      {/* Detail modal */}
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
              color: C.dim, fontSize: 18, cursor: "pointer", fontFamily: FONT, padding: "4px 8px", borderRadius: 4,
            }}>×</button>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.bright, fontFamily: DISPLAY, marginBottom: 6 }}>
              Generative vs. Agentic AI
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 18 }}>The fundamental architectural shift</div>
            {[
              "Most people experience AI as a conversation. You type a prompt, the AI responds, you refine, it responds again. This is generative AI — a bilateral exchange where every interaction starts fresh and the human provides all the context.",
              "The left side of this slide shows that pattern. Notice how the user has to re-paste data, re-explain context, and manually shuttle every piece of information into the chat window. The AI only knows what you tell it in that moment.",
              "The right side shows what changes with agentic AI. The system receives a goal, not a prompt. It plans the work, breaks it into subtasks, executes them in parallel, verifies its own output, and delivers a complete result. The context persists. The tools are real. The workflow is autonomous.",
              "The difference isn't just speed — it's architecture. Generative AI is a conversation. Agentic AI is a collaborator with its own ability to plan, act, and check its work.",
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
