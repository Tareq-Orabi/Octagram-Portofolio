import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";

export const TEAM_DATA = [
  { name: "Tareq Orabi", role: "Founder & CEO", tag: "ARCH_LEAD", col: "#ff6b1a", initials: "TO", bio: "Founder and software engineer leading product strategy and technical direction. Focused on building scalable systems and guiding teams from concept to production.", x: 0 },
  { name: "Mazen Abu_Tahoun", role: "Founder & Front-end Lead", tag: "NEURAL_OPS", col: "#00ffe7", initials: "MA", bio: "Leads front-end development with a focus on performance, scalability, and clean UI architecture. Delivers consistent and user-friendly interfaces across products.", x: 1 },
  { name: "Zaid Abu_Hammour", role: "AI Lead", tag: "PRISM_CORE", col: "#a78bfa", initials: "ZA", bio: "Leads the development of AI agents and automation systems, designing intelligent workflows that improve efficiency and extend product capabilities.", x: 2 },
  { name: "Zaid Al_Taih", role: "Backend Lead", tag: "GRID_DELTA", col: "#0cc52b", initials: "ZT", bio: "Leads backend engineering, architecting scalable systems and ensuring high reliability, performance, and long-term maintainability across the platform.", x: 3 },
  { name: "Mohammad Ghabash", role: "Backend Developer", tag: "GRID_B", col: "#fbbf24", initials: "MG", bio: "Backend developer building scalable APIs and ensuring efficient data handling across systems.", x: 4 },
  { name: "Karam Khualdeh", role: "Backend Developer", tag: "GRID_B", col: "#f43f5e", initials: "KK", bio: "Contributes to backend development and deployment processes, maintaining stable and reliable production environments.", x: 5 }
];

export function MemberCard({ m, index, c }: { m: typeof TEAM_DATA[0]; index: number; c: typeof DARK }) {
  const [hovered, setHovered] = useState(false);
  const isDark = c.bg.startsWith("#050");
  const isEven = index % 2 === 0;
  const cvRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    const cx = cv.width / 2, cy = cv.height / 2;
    const particles = Array.from({ length: 28 }, (_, i) => ({
      angle: (i / 28) * Math.PI * 2,
      r: 90 + Math.random() * 60,
      speed: (Math.random() * 0.015 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
      sz: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.6 + 0.3,
    }));
    let currentAlpha = 0;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      currentAlpha = hovered ? Math.min(1, currentAlpha + 0.08) : Math.max(0, currentAlpha - 0.06);
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r;
        ctx.globalAlpha = p.opacity * currentAlpha;
        ctx.fillStyle = m.col;
        ctx.beginPath(); ctx.arc(px, py, p.sz, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = p.opacity * currentAlpha * 0.2;
        ctx.beginPath(); ctx.arc(px, py, p.sz * 3, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 0.12 * currentAlpha;
      ctx.strokeStyle = m.col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 1;
      if (currentAlpha > 0 || hovered) animRef.current = requestAnimationFrame(draw);
    };
    cancelAnimationFrame(animRef.current); draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, m.col]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 + index * 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", marginTop: isEven ? 0 : 60, cursor: "pointer" }}
    >
      <canvas ref={cvRef} style={{ position: "absolute", inset: "-60px", width: "calc(100% + 120px)", height: "calc(100% + 120px)", pointerEvents: "none", zIndex: 0 }} />
      <motion.div
        animate={{ y: hovered ? -8 : 0, boxShadow: hovered ? `0 40px 80px rgba(${hexRgb(m.col)},0.25), 0 0 0 1px ${m.col}44` : `0 4px 20px rgba(0,0,0,0.2)` }}
        transition={{ duration: 0.3 }}
        style={{ position: "relative", zIndex: 1, background: isDark ? "rgba(5,12,26,0.85)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", border: `1px solid ${c.border}`, borderTop: `3px solid ${m.col}`, padding: "36px 32px", overflow: "hidden" }}
      >
        {hovered && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${m.col},transparent)`, animation: "memberScan 1.8s linear infinite", zIndex: 10 }} />}
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "absolute", inset: 0, background: `${isDark ? `rgba(${hexRgb(m.col)},0.03)` : `rgba(${hexRgb(c.bg)})`}`, animation: "glitch 4s steps(1) infinite", zIndex: 0, pointerEvents: "none" }} />
          )}
        </AnimatePresence>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24, position: "relative", zIndex: 2 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `rgba(${hexRgb(m.col)},0.1)`, border: `2px solid ${m.col}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: m.col, letterSpacing: 2 }}>{m.initials}</div>
            <div style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#34d399", border: `2px solid ${isDark ? c.bg : "#fff"}`, animation: "holoPulse 2s infinite" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.35em", color: m.col, textTransform: "uppercase", marginBottom: 5 }}>{m.tag}</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: c.text, letterSpacing: "0.04em", lineHeight: 1 }}>{m.name}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: c.muted, marginTop: 4 }}>{m.role}</div>
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: isDark ? "rgba(232,234,246,0.55)" : "rgba(10,14,26,0.55)", lineHeight: 1.7, position: "relative", zIndex: 2, marginBottom: 20 }}>{m.bio}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3].map(b => (
              <motion.div key={b} animate={{ scale: hovered ? [1, 1.6, 1] : 1, opacity: hovered ? 1 : 0.3 }} transition={{ delay: b * 0.08, duration: 0.3 }}
                style={{ width: 5, height: 5, borderRadius: 1, background: m.col }} />
            ))}
          </div>
          <motion.div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "#34d399", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            STATUS: ACTIVE
          </motion.div>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: `2px solid ${m.col}66`, borderRight: `2px solid ${m.col}66`, zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: `2px solid ${m.col}66`, borderLeft: `2px solid ${m.col}66`, zIndex: 2 }} />
      </motion.div>
    </motion.div>
  );
}
