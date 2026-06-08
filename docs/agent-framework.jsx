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
  knowledge: "#5ab8d8",
  goal: "#e8a035",
  manager: "#f0c850",
  task: "#9a6ad8",
  worker: "#4aba7a",
  checker: "#d87a5a",
  report: "#5a7aaa",
  line: "#3a3a5a",
  lineActive: "#f0c85060",
};

const W = 880;
const H = 680;

// Layer Y positions
const LY = {
  input: 50,
  manager: 150,
  tasks: 260,
  workers: 370,
  checkers: 470,
  report: 570,
};

// Horizontal positions for 3 parallel tracks
const TRACKS = [W * 0.25, W * 0.5, W * 0.75];
const MX = W / 2; // Manager center

// Node dimensions
const NW = 130;
const NH = 44;
const NR = 8;

function FlowNode({ x, y, label, sublabel, color, visible, delay = 0, wide = false }) {
  const w = wide ? 160 : NW;
  return (
    <g style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: `all 0.5s ease ${delay}s`,
    }}>
      {/* Glow */}
      <rect
        x={x - w/2 - 2} y={y - NH/2 - 2}
        width={w + 4} height={NH + 4}
        rx={NR + 2}
        fill={`${color}10`}
      />
      {/* Box */}
      <rect
        x={x - w/2} y={y - NH/2}
        width={w} height={NH}
        rx={NR}
        fill={C.surface}
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Fill tint */}
      <rect
        x={x - w/2} y={y - NH/2}
        width={w} height={NH}
        rx={NR}
        fill={`${color}08`}
      />
      {/* Dot */}
      <circle cx={x - w/2 + 14} cy={y} r="3.5" fill={color} />
      {/* Label */}
      <text
        x={x - w/2 + 24} y={sublabel ? y - 4 : y + 1}
        fill={C.bright}
        fontSize="11"
        fontFamily={FONT}
        fontWeight="700"
        dominantBaseline="middle"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x - w/2 + 24} y={y + 10}
          fill={C.dim}
          fontSize="8.5"
          fontFamily={FONT}
          dominantBaseline="middle"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function FlowLine({ x1, y1, x2, y2, visible, delay = 0, color = C.lineActive, dashed = false, curved = false }) {
  let d;
  if (curved) {
    const cy1 = y1 + (y2 - y1) * 0.3;
    const cy2 = y1 + (y2 - y1) * 0.7;
    d = `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;
  } else {
    d = `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  return (
    <path
      d={d}
      fill="none"
      stroke={visible ? color : C.border}
      strokeWidth={visible ? "1.5" : "0.5"}
      strokeDasharray={dashed ? "4 4" : "none"}
      style={{
        transition: `all 0.5s ease ${delay}s`,
        opacity: visible ? 1 : (dashed ? 0 : 0.15),
      }}
    />
  );
}

function FlowArrow({ x, y, visible, delay = 0, color = C.lineActive, direction = "down" }) {
  const dy = direction === "down" ? 1 : -1;
  return (
    <polygon
      points={`${x},${y + 5 * dy} ${x - 4},${y - 2 * dy} ${x + 4},${y - 2 * dy}`}
      fill={visible ? color : "transparent"}
      style={{
        transition: `all 0.4s ease ${delay}s`,
      }}
    />
  );
}

function ParallelBadge({ x, y, visible, delay = 0 }) {
  return (
    <g style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.4s ease ${delay}s`,
    }}>
      <rect x={x - 28} y={y - 8} width={56} height={16} rx={8} fill={C.task} opacity="0.15" />
      <rect x={x - 28} y={y - 8} width={56} height={16} rx={8} fill="none" stroke={C.task} strokeWidth="0.8" opacity="0.4" />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={C.task} fontSize="7.5" fontFamily={FONT} fontWeight="700" letterSpacing="1">
        PARALLEL
      </text>
    </g>
  );
}

export default function AgentFramework() {
  const [phase, setPhase] = useState(0);
  // 0: title
  // 1: knowledge + goal
  // 2: manager agent
  // 3: tasks fan out
  // 4: worker agents
  // 5: checker agents
  // 6: report back to manager

  const advance = useCallback(() => setPhase(p => Math.min(p + 1, 6)), []);
  const reset = useCallback(() => setPhase(0), []);

  const fadeIn = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transition: `opacity 0.5s ease ${delay}s`,
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
        padding: "24px",
        cursor: "pointer",
        userSelect: "none",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 16, maxWidth: 900 }}>
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
          Anatomy of an Agent Framework
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

      {/* Flowchart SVG */}
      <div style={{ width: "100%", maxWidth: 880 }}>
        <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>

          {/* ---- LINES (drawn first, behind nodes) ---- */}

          {/* Input to Manager lines */}
          <FlowLine x1={MX - 90} y1={LY.input + NH/2} x2={MX} y2={LY.manager - NH/2} visible={phase >= 2} delay={0} color={C.knowledge + "60"} curved />
          <FlowLine x1={MX + 90} y1={LY.input + NH/2} x2={MX} y2={LY.manager - NH/2} visible={phase >= 2} delay={0.1} color={C.goal + "60"} curved />
          <FlowArrow x={MX} y={LY.manager - NH/2 - 2} visible={phase >= 2} delay={0.15} color={C.manager + "80"} />

          {/* Manager to Tasks lines */}
          {TRACKS.map((tx, i) => (
            <g key={`m2t_${i}`}>
              <FlowLine x1={MX} y1={LY.manager + NH/2} x2={tx} y2={LY.tasks - NH/2} visible={phase >= 3} delay={0.1 * i} color={C.task + "50"} curved />
              <FlowArrow x={tx} y={LY.tasks - NH/2 - 2} visible={phase >= 3} delay={0.15 + 0.1 * i} color={C.task + "80"} />
            </g>
          ))}

          {/* Tasks to Workers lines */}
          {TRACKS.map((tx, i) => (
            <g key={`t2w_${i}`}>
              <FlowLine x1={tx} y1={LY.tasks + NH/2} x2={tx} y2={LY.workers - NH/2} visible={phase >= 4} delay={0.1 * i} color={C.worker + "50"} />
              <FlowArrow x={tx} y={LY.workers - NH/2 - 2} visible={phase >= 4} delay={0.15 + 0.1 * i} color={C.worker + "80"} />
            </g>
          ))}

          {/* Workers to Checkers lines */}
          {TRACKS.map((tx, i) => (
            <g key={`w2c_${i}`}>
              <FlowLine x1={tx} y1={LY.workers + NH/2} x2={tx} y2={LY.checkers - NH/2} visible={phase >= 5} delay={0.1 * i} color={C.checker + "50"} />
              <FlowArrow x={tx} y={LY.checkers - NH/2 - 2} visible={phase >= 5} delay={0.15 + 0.1 * i} color={C.checker + "80"} />
            </g>
          ))}

          {/* Checkers back to Manager (curved return lines) */}
          {TRACKS.map((tx, i) => {
            const sideOffset = i === 0 ? -30 : i === 2 ? 30 : 0;
            const endX = i === 1 ? MX : (i === 0 ? MX - 40 : MX + 40);
            return (
              <g key={`c2m_${i}`}>
                <path
                  d={`M ${tx} ${LY.checkers + NH/2} 
                      C ${tx + sideOffset} ${LY.checkers + 60}, 
                        ${endX + sideOffset * 1.5} ${LY.report + 20}, 
                        ${endX} ${LY.report}`}
                  fill="none"
                  stroke={phase >= 6 ? C.report + "50" : C.border}
                  strokeWidth={phase >= 6 ? "1.5" : "0.5"}
                  strokeDasharray="4 4"
                  style={{
                    transition: `all 0.5s ease ${0.1 * i}s`,
                    opacity: phase >= 6 ? 1 : 0.1,
                  }}
                />
                {/* Report convergence line back up to manager */}
                <path
                  d={`M ${endX} ${LY.report} 
                      C ${endX} ${LY.report - 40}, 
                        ${MX} ${LY.manager + NH/2 + 60}, 
                        ${MX} ${LY.manager + NH/2 + 8}`}
                  fill="none"
                  stroke={phase >= 6 ? C.manager + "40" : "transparent"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  style={{
                    transition: `all 0.5s ease ${0.3 + 0.1 * i}s`,
                    opacity: phase >= 6 ? 0.8 : 0,
                  }}
                />
              </g>
            );
          })}

          {/* ---- NODES ---- */}

          {/* Layer 1: Knowledge + Goal */}
          <FlowNode x={MX - 90} y={LY.input} label="Knowledge" sublabel="Files, data, context" color={C.knowledge} visible={phase >= 1} delay={0} />
          <FlowNode x={MX + 90} y={LY.input} label="Goal" sublabel="What needs to happen" color={C.goal} visible={phase >= 1} delay={0.15} />

          {/* Layer 2: Manager Agent */}
          <FlowNode x={MX} y={LY.manager} label="Manager Agent" sublabel="Plans and delegates" color={C.manager} visible={phase >= 2} delay={0} wide />

          {/* Layer 3: Tasks */}
          {["Task 1", "Task 2", "Task 3"].map((label, i) => (
            <FlowNode key={`task_${i}`} x={TRACKS[i]} y={LY.tasks} label={label} sublabel={["Data analysis", "Draft report", "Build charts"][i]} color={C.task} visible={phase >= 3} delay={0.1 * i} />
          ))}

          {/* Parallel badge between tasks */}
          <ParallelBadge x={MX} y={LY.tasks - NH/2 - 14} visible={phase >= 3} delay={0.3} />

          {/* Layer 4: Worker Agents */}
          {["Worker Agent", "Worker Agent", "Worker Agent"].map((label, i) => (
            <FlowNode key={`worker_${i}`} x={TRACKS[i]} y={LY.workers} label={label} sublabel={["Executes analysis", "Writes content", "Generates visuals"][i]} color={C.worker} visible={phase >= 4} delay={0.1 * i} />
          ))}

          {/* Layer 5: Checker Agents */}
          {["Checker Agent", "Checker Agent", "Checker Agent"].map((label, i) => (
            <FlowNode key={`checker_${i}`} x={TRACKS[i]} y={LY.checkers} label={label} sublabel={["Validates numbers", "Reviews accuracy", "Checks formatting"][i]} color={C.checker} visible={phase >= 5} delay={0.1 * i} />
          ))}

          {/* Layer 6: Report back label */}
          <g style={{
            opacity: phase >= 6 ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}>
            <rect x={MX - 70} y={LY.report - 12} width={140} height={24} rx={12} fill={C.report + "15"} stroke={C.report} strokeWidth="1" />
            <text x={MX} y={LY.report + 1} textAnchor="middle" dominantBaseline="middle" fill={C.report} fontSize="9" fontFamily={FONT} fontWeight="700" letterSpacing="1">
              REPORT TO MANAGER
            </text>
          </g>

          {/* Return arrow to manager */}
          <FlowArrow x={MX + 6} y={LY.manager + NH/2 + 3} visible={phase >= 6} delay={0.5} color={C.manager + "80"} direction="up" />

        </svg>
      </div>

      {/* Layer labels */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 14,
        justifyContent: "center",
        marginTop: 8,
        fontSize: 10,
      }}>
        {[
          { label: "Inputs", color: C.knowledge, min: 1 },
          { label: "Planning", color: C.manager, min: 2 },
          { label: "Delegation", color: C.task, min: 3 },
          { label: "Execution", color: C.worker, min: 4 },
          { label: "Verification", color: C.checker, min: 5 },
          { label: "Reporting", color: C.report, min: 6 },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
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
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 10,
        color: C.dim,
      }}>
        <span style={{ opacity: phase > 0 ? 0.6 : 0.2 }}>{phase}/6</span>
        {phase >= 6 && (
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
