import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";
import { MI } from "../MI";
import { CyberTraffic } from "../About/CyberTraffic";
import { SERVICES_DATA, HexCell } from "./HexCell";

const HEX_POSITIONS = [
  { cx: 50, cy: 50 },       // center
  { cx: 50, cy: 18 },       // top
  { cx: 78, cy: 34 },       // top-right
  { cx: 78, cy: 66 },       // bottom-right
  { cx: 50, cy: 82 },       // bottom
  { cx: 22, cy: 66 },       // bottom-left
];
const SVC_POS = [1, 2, 3, 4, 5, 0];

export function ServicesMachine({ c }: { c: typeof DARK }) {
  const [activeSvc, setActiveSvc] = useState<any>(SERVICES_DATA[0]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isLight = !c.bg.startsWith("#050");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contentY = useSpring(rawY, { stiffness: 60, damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 60, damping: 25 });

  const radarRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = radarRef.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const S = 500; cv.width = S; cv.height = S;
    const cx = S / 2, cy = S / 2;
    let angle = 0, raf = 0;
    const blips: { x: number; y: number; age: number; col: string }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      for (let r = 60; r <= 220; r += 55) {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hexRgb(c.orange)},${isLight ? 0.12 : 0.07})`; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${hexRgb(c.orange)},${isLight ? 0.1 : 0.05})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 230, cy); ctx.lineTo(cx + 230, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 230); ctx.lineTo(cx, cy + 230); ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 220);
      sweepGrad.addColorStop(0, `rgba(${hexRgb(c.orange)},${isLight ? 0.25 : 0.15})`);
      sweepGrad.addColorStop(1, `rgba(${hexRgb(c.orange)},0)`);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 220, -0.05, Math.PI * 0.5);
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      if (Math.random() > 0.97) {
        const r = 50 + Math.random() * 160, a = Math.random() * Math.PI * 2;
        blips.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, age: 0, col: Math.random() > 0.5 ? c.orange : c.teal });
      }
      blips.forEach((b, i) => {
        b.age++;
        const alpha = Math.max(0, 1 - b.age / 60);
        ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = b.col; ctx.globalAlpha = alpha; ctx.fill();
        ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = b.col; ctx.globalAlpha = alpha * 0.3; ctx.fill();
        ctx.globalAlpha = 1;
        if (b.age > 60) blips.splice(i, 1);
      });

      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(220, 0);
      ctx.strokeStyle = c.orange; ctx.lineWidth = 1.5; ctx.globalAlpha = isLight ? 0.6 : 0.4; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();

      angle += 0.018;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [c]);

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
  ];

  const mappedServices = SERVICES_DATA.map((s, i) => ({
    ...s,
    pos: HEX_POSITIONS[SVC_POS[i]],
    isCenter: SVC_POS[i] === 0,
  }));

  return (
    <motion.section ref={sectionRef} id="services" style={{
      y: contentY,
      opacity: springOpacity,
      position: "relative", zIndex: 20, minHeight: "100vh",
      background: !isLight ? `linear-gradient(180deg, #010c18 0%, #020e20 18%, ${c.bg} 55%)` : c.bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "60px 16px" : "100px 40px",
      borderRadius: "24px 24px 0 0",
      boxShadow: !isLight ? `0 -50px 100px rgba(0,0,0,0.9), 0 -1px 0 ${c.border}` : `0 -50px 100px rgba(243,242,242,1), 0 -1px 0 ${c.border}`,
      overflow: "hidden",
    }}>
      <CyberTraffic c={c} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <div style={{ width: 40, height: 1, background: c.orange }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>Capabilities</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(44px,7vw,100px)", color: c.text, letterSpacing: "0.04em", marginBottom: 8, textAlign: "center" }}>COMMAND GRID</h2>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: isLight ? "rgba(10,14,26,0.5)" : c.muted, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: isMobile ? 32 : 50 }}>Hover nodes to inspect each capability</p>

        <div style={{
          position: "relative",
          width: "100%", maxWidth: 1200,
          background: isLight ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.015)",
          backdropFilter: "blur(30px)",
          border: `1px solid ${c.border}`,
          borderRadius: 24,
          padding: isMobile ? "30px 16px" : "50px 50px",
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: "center", justifyContent: "center",
          gap: isMobile ? 40 : 60,
          boxShadow: isLight ? "0 40px 80px rgba(0,0,0,0.05)" : "0 40px 100px rgba(0,0,0,0.5)",
          marginTop: 20
        }}>

          <div style={{
            width: isMobile ? "100%" : 360,
            height: isMobile ? "auto" : 400,
            background: isLight ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.3)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${isLight ? (
              activeSvc.col === "#00ffe7" ? "#00998a"
                : activeSvc.col === "#fbbf24" ? "#d97706"
                  : activeSvc.col === "#a78bfa" ? "#6d28d9"
                    : activeSvc.col === "#34d399" ? "#059669"
                      : activeSvc.col === "#ff6b1a" ? "#c2410c"
                        : activeSvc.col === "#f43f5e" ? "#be123c"
                          : activeSvc.col
            ) : activeSvc.col}`,
            padding: "32px",
            display: "flex", flexDirection: "column",
            transition: "all 0.4s",
            position: "relative",
            overflow: "hidden",
            borderRadius: 12,
            boxShadow: isLight ? "0 15px 40px rgba(0,0,0,0.06)" : "0 10px 30px rgba(0,0,0,0.1)"
          }}>
            <div style={{ position: "absolute", top: 12, right: 12, fontFamily: "'DM Mono'", fontSize: 8, color: c.muted, letterSpacing: 2, opacity: 0.5 }}>{activeSvc.id}</div>
            <motion.div key={activeSvc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {(() => {
                const displayCol = isLight ? (
                  activeSvc.col === "#00ffe7" ? "#00998a"
                    : activeSvc.col === "#fbbf24" ? "#d97706"
                      : activeSvc.col === "#a78bfa" ? "#6d28d9"
                        : activeSvc.col === "#34d399" ? "#059669"
                          : activeSvc.col === "#ff6b1a" ? "#c2410c"
                            : activeSvc.col === "#f43f5e" ? "#be123c"
                              : activeSvc.col
                ) : activeSvc.col;
                return (
                  <>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: `rgba(${hexRgb(displayCol)},0.12)`,
                      border: `1px solid ${displayCol}${isLight ? '88' : '55'}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 20, color: displayCol,
                    }}>
                      <MI n={activeSvc.icon} style={{ fontSize: 22 }} fill />
                    </div>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: c.text, letterSpacing: "0.04em", marginBottom: 12, lineHeight: 1 }}>{activeSvc.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: isLight ? "rgba(10,14,26,0.8)" : "rgba(232,234,246,0.5)", lineHeight: 1.6, marginBottom: 24, fontWeight: isLight ? 500 : 400 }}>{activeSvc.desc}</p>

                    <div style={{ marginTop: "auto", display: "flex", gap: 6 }}>
                      {[1, 2, 3].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: displayCol, opacity: 1 - i * 0.25 }} />)}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>

          <div style={{ position: "relative", width: isMobile ? "100%" : 520, height: isMobile ? 440 : 520, flexShrink: 0 }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map(([a, b], i) => {
                const pa = HEX_POSITIONS[a], pb = HEX_POSITIONS[b];
                return (
                  <g key={i}>
                    <line x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy}
                      stroke={c.orange} strokeWidth="0.2" strokeOpacity={isLight ? "0.15" : "0.08"} strokeDasharray="2 4" />
                    <line x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy}
                      stroke={c.orange} strokeWidth="0.4" strokeOpacity="0.3" strokeDasharray="1 25">
                      <animate attributeName="stroke-dashoffset" from="26" to="0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                    </line>
                  </g>
                );
              })}
            </svg>

            {mappedServices.map((s, _i) => (
              <HexCell key={s.id} service={s} posX={s.pos.cx} posY={s.pos.cy} isCenter={s.isCenter} c={c} isLight={isLight} onHover={setActiveSvc} />
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 80, width: "100%", maxWidth: 1100,
          position: "relative", padding: "1px 0",
          background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`
        }}>
          <div style={{
            overflow: "hidden", whiteSpace: "nowrap", padding: "20px 0",
            maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)"
          }}>
            <div style={{ display: "flex", gap: 30, animation: "ticker 30s linear infinite", width: "max-content" }}>
              {[...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA].map((s, i) => {
                const accent = isLight ? (
                  s.col === "#00ffe7" ? "#00998a"
                    : s.col === "#fbbf24" ? "#d97706"
                      : s.col === "#a78bfa" ? "#6d28d9"
                        : s.col === "#34d399" ? "#059669"
                          : s.col === "#ff6b1a" ? "#c2410c"
                            : s.col === "#f43f5e" ? "#be123c"
                              : s.col
                ) : s.col;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${c.border}`,
                    padding: "8px 20px",
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: 4, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 4, height: 4, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, animation: "blink 1.5s infinite" }} />
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: c.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.label}</span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: accent, opacity: 0.6 }}>READY</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
