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
  agentAccent: "#e8a035",
  danger: "#c85a5a",
  warn: "#d4944a",
  caution: "#c8b84a",
  safe: "#4aba7a",
  shield: "#5ab8d8",
  overlay: "rgba(5, 5, 10, 0.85)",
};

function LockIcon({ size = 12, color = C.dim, open = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {open ? (
        <>
          <rect x="2" y="8" width="12" height="7" rx="1.5" stroke={color} strokeWidth="1.3" fill={`${color}15`} />
          <path d="M5 8V5a3 3 0 0 1 6 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x="2" y="8" width="12" height="7" rx="1.5" stroke={color} strokeWidth="1.3" fill={`${color}15`} />
          <path d="M5 8V5a3 3 0 0 1 6 0v3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function ShieldIcon({ size = 14, color = C.safe }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" stroke={color} strokeWidth="1.2" fill={`${color}15`} />
      <path d="M5.5 8.5l2 2 3.5-4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const GEN_TIERS = [
  {
    name: "Free Tier",
    price: "$0",
    color: C.danger,
    lockOpen: true,
    items: [
      { text: "Your data may train models", warn: true },
      { text: "Conversations stored indefinitely", warn: true },
      { text: "Documents on vendor servers", warn: true },
      { text: "No data residency controls", warn: true },
    ],
  },
  {
    name: "Premium",
    price: "$20/mo",
    color: C.caution,
    lockOpen: false,
    items: [
      { text: "Data not used for training", warn: false },
      { text: "Still stored on their servers", warn: true },
      { text: "Trust their retention policy", warn: true },
      { text: "Vendor sees your documents", warn: true },
    ],
  },
  {
    name: "Enterprise",
    price: "$$$",
    color: C.warn,
    lockOpen: false,
    items: [
      { text: "SSO, audit logs, compliance", warn: false },
      { text: "Data isolation agreements", warn: false },
      { text: "Still a third-party dependency", warn: true },
      { text: "You trust; you don't control", warn: true },
    ],
  },
];

const AGENT_DEGREES = [
  {
    name: "Direct Access",
    desc: "Agent reads and writes your local files",
    color: C.safe,
    icon: "◎",
    details: [
      "Files never leave your machine",
      "Full project awareness",
      "AI processes data directly",
      "You control the environment",
    ],
    separation: 1,
  },
  {
    name: "API Boundary",
    desc: "Agent calls services with targeted requests",
    color: C.shield,
    icon: "⟷",
    details: [
      "Only specific data fields sent",
      "Encrypted in transit",
      "No bulk document upload",
      "Audit every request",
    ],
    separation: 2,
  },
  {
    name: "Tool Isolation",
    desc: "Agent builds the tool; AI never touches the data",
    color: C.agentAccent,
    icon: "◇",
    details: [
      "Agent writes code, not data",
      "Script processes data locally",
      "Zero AI exposure to content",
      "Maximum separation possible",
    ],
    separation: 3,
  },
];

export default function PrivacyComparison() {
  const [phase, setPhase] = useState(0);
  const [activeTier, setActiveTier] = useState(0);
  const [activeDegree, setActiveDegree] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const advance = useCallback(() => { if (!showDetail) setPhase(p => Math.min(p + 1, 3)); }, [showDetail]);
  const reset = useCallback(() => {
    setPhase(0);
    setActiveTier(0);
    setActiveDegree(0);
    setShowDetail(false);
  }, []);

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
          Who Controls the Data?
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

      <div style={{
        display: "flex",
        gap: 32,
        width: "100%",
        maxWidth: 1000,
        flex: 1,
        minHeight: 0,
      }}>

        {/* LEFT: Generative Privacy */}
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
              You get what you pay for
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
            {/* Tier selector */}
            <div style={{ display: "flex", gap: 6 }}>
              {GEN_TIERS.map((tier, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveTier(i); }}
                  style={{
                    flex: 1,
                    background: activeTier === i ? `${tier.color}15` : C.bg,
                    border: `1px solid ${activeTier === i ? tier.color + "60" : C.border}`,
                    borderRadius: 6,
                    padding: "8px 6px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: activeTier === i ? tier.color : C.dim,
                    fontFamily: FONT,
                  }}>
                    {tier.name}
                  </div>
                  <div style={{
                    fontSize: 9,
                    color: C.dim,
                    marginTop: 2,
                    fontFamily: FONT,
                  }}>
                    {tier.price}
                  </div>
                </button>
              ))}
            </div>

            {/* Active tier detail */}
            {GEN_TIERS.map((tier, ti) => (
              <div key={ti} style={{
                display: activeTier === ti ? "flex" : "none",
                flexDirection: "column",
                gap: 6,
                animation: "fadeIn 0.3s ease",
              }}>
                {/* Privacy meter */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: C.bg,
                  borderRadius: 8,
                  border: `1px solid ${tier.color}30`,
                }}>
                  <LockIcon size={18} color={tier.color} open={tier.lockOpen} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 6,
                      borderRadius: 3,
                      background: C.border,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${(ti + 1) * 33}%`,
                        background: tier.color,
                        borderRadius: 3,
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                    <div style={{
                      fontSize: 8,
                      color: C.dim,
                      marginTop: 3,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}>
                      Privacy Level
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div style={{
                  padding: "8px 10px",
                  background: `${tier.color}06`,
                  borderRadius: 8,
                  border: `1px solid ${tier.color}15`,
                }}>
                  {tier.items.map((item, j) => (
                    <div key={j} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      padding: "5px 0",
                      fontSize: 10.5,
                      lineHeight: 1.4,
                      color: item.warn ? C.text : C.safe,
                      borderBottom: j < tier.items.length - 1 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{
                        fontSize: 10,
                        marginTop: 1,
                        color: item.warn ? C.warn : C.safe,
                        flexShrink: 0,
                      }}>
                        {item.warn ? "⚠" : "✓"}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* Bottom line */}
                <div style={{
                  textAlign: "center",
                  padding: "8px 10px",
                  background: `${C.danger}08`,
                  borderRadius: 8,
                  border: `1px solid ${C.danger}15`,
                }}>
                  <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
                    {ti === 0 && "Your data is the product."}
                    {ti === 1 && "Better policy. Same dependency."}
                    {ti === 2 && "Best available. Still their servers."}
                  </div>
                </div>
              </div>
            ))}

            {/* The core problem */}
            <div style={{
              marginTop: "auto",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1px solid ${C.danger}20`,
              background: `${C.danger}08`,
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.danger,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}>
                The Core Tradeoff
              </div>
              <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
                Every tier requires sending your<br />
                documents to someone else's infrastructure.<br />
                <span style={{ color: C.danger }}>You trust. You don't verify.</span>
              </div>
            </div>
          </div>

          {phase >= 3 && (
            <div style={{ marginTop: 14, ...fadeIn(true, 0.2) }}>
              {[
                "Privacy is a subscription tier",
                "Documents leave your control",
                "Trust their policy, not your audit",
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

        {/* RIGHT: Agentic Privacy */}
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
              Degrees of separation
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
            {/* Degree selector */}
            <div style={{ display: "flex", gap: 6 }}>
              {AGENT_DEGREES.map((deg, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveDegree(i); }}
                  style={{
                    flex: 1,
                    background: activeDegree === i ? `${deg.color}15` : C.bg,
                    border: `1px solid ${activeDegree === i ? deg.color + "60" : C.border}`,
                    borderRadius: 6,
                    padding: "8px 6px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{
                    fontSize: 13,
                    color: activeDegree === i ? deg.color : C.dim,
                    transition: "color 0.3s",
                  }}>
                    {deg.icon}
                  </div>
                  <div style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: activeDegree === i ? deg.color : C.dim,
                    fontFamily: FONT,
                    marginTop: 2,
                  }}>
                    {deg.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Active degree detail */}
            {AGENT_DEGREES.map((deg, di) => (
              <div key={di} style={{
                display: activeDegree === di ? "flex" : "none",
                flexDirection: "column",
                gap: 6,
              }}>
                {/* Separation visualization */}
                <div style={{
                  padding: "12px",
                  background: C.bg,
                  borderRadius: 8,
                  border: `1px solid ${deg.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}>
                  {/* Data */}
                  <div style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: `1px solid ${C.safe}40`,
                    background: `${C.safe}10`,
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.safe,
                    textAlign: "center",
                  }}>
                    YOUR<br />DATA
                  </div>

                  {/* Separation indicator */}
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {Array.from({ length: deg.separation }).map((_, i) => (
                      <div key={i} style={{
                        width: 18,
                        height: 2,
                        background: deg.color,
                        borderRadius: 1,
                        opacity: 0.5 + (i * 0.2),
                      }} />
                    ))}
                  </div>

                  {/* Shield/barrier */}
                  {di >= 1 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}>
                      <ShieldIcon size={16} color={deg.color} />
                      <span style={{ fontSize: 7, color: deg.color, fontWeight: 700 }}>
                        {di === 1 ? "API" : "CODE"}
                      </span>
                    </div>
                  )}

                  {di >= 1 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      {Array.from({ length: 1 }).map((_, i) => (
                        <div key={i} style={{
                          width: 18,
                          height: 2,
                          background: deg.color,
                          borderRadius: 1,
                          opacity: 0.4,
                        }} />
                      ))}
                    </div>
                  )}

                  {/* AI */}
                  <div style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: `1px solid ${C.agentAccent}40`,
                    background: `${C.agentAccent}10`,
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.agentAccent,
                    textAlign: "center",
                    opacity: di === 2 ? 0.35 : 1,
                  }}>
                    AI<br />AGENT
                  </div>
                </div>

                <div style={{ fontSize: 10.5, color: C.text, padding: "4px 8px", lineHeight: 1.5 }}>
                  {deg.desc}
                </div>

                {/* Detail items */}
                <div style={{
                  padding: "8px 10px",
                  background: `${deg.color}06`,
                  borderRadius: 8,
                  border: `1px solid ${deg.color}15`,
                }}>
                  {deg.details.map((item, j) => (
                    <div key={j} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      padding: "5px 0",
                      fontSize: 10.5,
                      lineHeight: 1.4,
                      color: C.text,
                      borderBottom: j < deg.details.length - 1 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{ fontSize: 10, marginTop: 1, color: deg.color, flexShrink: 0 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Bottom context */}
                <div style={{
                  textAlign: "center",
                  padding: "8px 10px",
                  background: `${deg.color}08`,
                  borderRadius: 8,
                  border: `1px solid ${deg.color}15`,
                }}>
                  <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
                    {di === 0 && "Highest capability. Data stays local."}
                    {di === 1 && "Controlled exposure. Only what's needed."}
                    {di === 2 && "AI writes the tool. Never sees the data."}
                  </div>
                </div>
              </div>
            ))}

            {/* The key difference */}
            <div style={{
              marginTop: "auto",
              padding: "10px 12px",
              borderRadius: 8,
              border: `1px solid ${C.safe}20`,
              background: `${C.safe}08`,
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.safe,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}>
                The Core Difference
              </div>
              <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
                You choose the degree of exposure.<br />
                The data doesn't have to leave<br />
                <span style={{ color: C.safe }}>to get the value.</span>
              </div>
            </div>
          </div>

          {phase >= 3 && (
            <div style={{ marginTop: 14, ...fadeIn(true, 0.2) }}>
              {[
                "Privacy is an architecture choice",
                "Documents can stay on your machine",
                "You verify. You control.",
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
              Who Controls the Data?
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 18 }}>Privacy in generative vs. agentic workflows</div>
            {[
              "With generative AI, privacy is a subscription tier. Free accounts may use your data for training. Premium accounts promise they won't, but your documents still live on someone else's servers. Enterprise accounts add compliance controls, but the fundamental dependency remains: you trust their policy. You don't verify it.",
              "Every tier requires sending your documents to someone else's infrastructure. The question isn't whether the provider is trustworthy — it's whether you have any alternative to trusting them.",
              "Agentic AI introduces something generative AI never offered: degrees of separation. At the closest level, the agent works directly in your local files and nothing leaves your machine. At the middle level, targeted API calls send only specific data fields through encrypted channels. At the furthest level, the agent writes a tool that processes the data — the AI itself never touches the content at all.",
              "The shift is architectural. Privacy is no longer a subscription tier. It's a design choice you control.",
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
