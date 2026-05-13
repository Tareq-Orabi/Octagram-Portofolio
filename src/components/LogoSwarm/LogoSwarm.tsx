import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";

import jsLogo from "../../assets/Logos/javascript.svg";
import javaLogo from "../../assets/Logos/java.svg";
import tsLogo from "../../assets/Logos/typescript.svg";
import reactLogoDark from "../../assets/Logos/React_dark.svg";
import reactLogoLight from "../../assets/Logos/React_light.svg";
import nodejsLogo from "../../assets/Logos/nodejs.svg";
import pythonLogo from "../../assets/Logos/python.svg";
import dockerLogo from "../../assets/Logos/docker.svg";
import dotNET from "../../assets/Logos/dotnet.svg";
import tailwindLogo from "../../assets/Logos/tailwindcss.svg";
import figmaLogo from "../../assets/Logos/figma.svg";
import threejsLogo from "../../assets/Logos/threejs.svg";
import postgresqlLogo from "../../assets/Logos/postgresql.svg";
import nextjsLogo from "../../assets/Logos/nextjs_icon_dark.svg";
import n8n from "../../assets/Logos/n8n.svg";

const TOOLS = [
  { logo: jsLogo, name: "JavaScript", abbr: "JS", color: "#f7df1e", tc: "#000" },
  { logo: tsLogo, name: "TypeScript", abbr: "TS", color: "#3178c6", tc: "#fff" },
  { logo: reactLogoLight, logoDark: reactLogoDark, name: "React", abbr: "Re", color: "#61dafb", tc: "#001" },
  { logo: nodejsLogo, name: "Node.js", abbr: "No", color: "#68a063", tc: "#fff" },
  { logo: pythonLogo, name: "Python", abbr: "Py", color: "#3776ab", tc: "#fff" },
  { logo: javaLogo, name: "Java", abbr: "Jv", color: "#f89820", tc: "#fff" },
  { logo: dotNET, name: ".NET", abbr: ".N", color: "#512bd4", tc: "#fff" },
  { logo: dockerLogo, name: "Docker", abbr: "Dk", color: "#2496ed", tc: "#fff" },
  { logo: tailwindLogo, name: "Tailwind", abbr: "Tw", color: "#38bdf8", tc: "#001" },
  { logo: figmaLogo, name: "Figma", abbr: "Fi", color: "#a259ff", tc: "#fff" },
  { logo: threejsLogo, name: "Three.js", abbr: "3J", color: "#ffffff", tc: "#000" },
  { logo: postgresqlLogo, name: "PostgreSQL", abbr: "Pg", color: "#336791", tc: "#fff" },
  { logo: nextjsLogo, name: "Next.js", abbr: "Nx", color: "#000000", tc: "#fff" },
  { logo: n8n, name: "n8n", abbr: "n8n", color: "#000000", tc: "#fff" },
];

export function LogoSwarm({ c }: { c: typeof DARK }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cvRef = useRef<HTMLCanvasElement>(null);
  const mpRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(0);
  const onM = useCallback((e: React.MouseEvent) => { mpRef.current = { x: e.clientX, y: e.clientY }; }, []);

  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const W = cv.offsetWidth, H = cv.offsetHeight;
    cv.width = W; cv.height = H;
    const images = TOOLS.map(t => { const img = new Image(); const src = (c.bg.startsWith("#050") && t.logoDark) ? t.logoDark : t.logo; if (src) img.src = src; return img; });
    const dots = Array.from({ length: 80 }, (_, i) => { const bx = (Math.random() * 0.88 + 0.06) * W, by = (Math.random() * 0.88 + 0.06) * H; return { x: bx, y: by, bx, by, sz: 13 + Math.random() * 9, phase: Math.random() * Math.PI * 2, freq: 0.22 + Math.random() * 0.4, aY: 10 + Math.random() * 14, aX: 5 + Math.random() * 8, li: i % TOOLS.length, glow: 0 }; });
    const REPEL = 155;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.016;
      const mx = mpRef.current.x, my = mpRef.current.y;
      const isLight = !c.bg.startsWith("#050");
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) { const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y); if (d < 145) { ctx.strokeStyle = `rgba(${hexRgb(c.orange)},${(1 - d / 145) * (isLight ? 0.35 : 0.14) * Math.max(dots[i].glow, dots[j].glow, 0.35)})`; ctx.lineWidth = isLight ? 1 : 0.6; ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke(); } }
      dots.forEach(d => {
        const wY = Math.sin(t * d.freq + d.phase) * d.aY, wX = Math.cos(t * d.freq * 0.6 + d.phase) * d.aX;
        let tx = d.bx + wX, ty = d.by + wY;
        const ddx = tx - mx, ddy = ty - my, dist = Math.hypot(ddx, ddy), prx = Math.max(0, 1 - dist / REPEL);
        if (dist < REPEL && dist > 0.1) { const f = prx * 85; tx += (ddx / dist) * f; ty += (ddy / dist) * f; }
        d.x += (tx - d.x) * 0.1; d.y += (ty - d.y) * 0.1;
        d.glow = prx > 0.2 ? Math.min(1, d.glow + 0.07) : Math.max(0, d.glow - 0.04);
        const tool = TOOLS[d.li], sz = (1.6 + prx * 0.9) * d.sz * 0.52, alpha = 0.28 + prx * 0.72;
        if (d.glow > 0) { const gr = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, sz * 3.2); const rgb = hexRgb(tool.color === "#000000" ? "#888888" : tool.color); gr.addColorStop(0, `rgba(${rgb},${(isLight ? 0.45 : 0.28) * d.glow})`); gr.addColorStop(1, `rgba(${rgb},0)`); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(d.x, d.y, sz * 3.2, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = isLight ? Math.min(1, alpha + 0.3) : alpha;
        ctx.fillStyle = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.03)";
        ctx.strokeStyle = `rgba(${hexRgb(tool.color)},${isLight ? 0.8 : 0.4})`;
        ctx.lineWidth = isLight ? 1.5 : 1;
        ctx.beginPath(); (ctx as any).roundRect(d.x - sz, d.y - sz, sz * 2, sz * 2, sz * 0.28); ctx.fill(); ctx.stroke();
        const img = images[d.li];
        if (img && img.complete && img.naturalWidth > 0) { const pad = sz * 0.35; ctx.drawImage(img, d.x - sz + pad, d.y - sz + pad, sz * 2 - pad * 2, sz * 2 - pad * 2); } else { ctx.fillStyle = tool.tc === "#000" ? "#000" : "#fff"; ctx.font = `bold ${sz * 0.82}px 'DM Mono',monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(tool.abbr, d.x, d.y + sz * 0.05); }
        ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [c]);

  return (
    <section id="skills" onMouseMove={onM} onMouseLeave={() => { mpRef.current = { x: -9999, y: -9999 }; }} style={{ position: "relative", minHeight: "100vh", background: c.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "60px 16px" : "100px 40px", overflow: "hidden" }}>
      <canvas ref={cvRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(${hexRgb(c.bg)},0.55) 60%, rgba(${hexRgb(c.bg)},0.95) 100%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <div style={{ width: 40, height: 1, background: c.orange }} /><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>Intelligence</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(44px,7vw,100px)", color: c.text, letterSpacing: "0.04em", marginBottom: 10 }}>TOOLS WE USE</h2>
        <div style={{ perspective: 1500, padding: "60px 0", display: "flex", justifyContent: "center", overflow: "visible" }}>
          <motion.div animate={{ rotateZ: [-22, -28, -22] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,100px)" : "repeat(5,120px)", gap: isMobile ? "20px" : "35px", transform: "rotateX(60deg) rotateZ(-25deg)", transformStyle: "preserve-3d" }}>
            {TOOLS.map((t, i) => {
              const logoSrc = (c.bg.startsWith("#050") && t.logoDark) ? t.logoDark : t.logo;
              return (
                <motion.div key={t.name} animate={{ z: [0, Math.random() * 50 + 30, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }} style={{ position: "relative", width: isMobile ? 100 : 120, height: isMobile ? 100 : 120, background: c.bgCard, backdropFilter: "blur(10px)", boxShadow: `-1px 1px 0 ${c.border},-2px 2px 0 ${c.border},-3px 3px 0 ${c.border},-4px 4px 0 ${c.border},-5px 5px 0 ${c.border},-6px 6px 0 ${c.border},-15px 15px 30px rgba(0,0,0,0.9),0 0 40px ${t.color}33`, borderTop: `2px solid ${t.color}`, borderLeft: `2px solid ${t.color}`, borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, transformStyle: "preserve-3d" }}>
                  <motion.div animate={{ z: [10, 30, 10] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }} style={{ width: 44, height: 44, filter: `drop-shadow(0 15px 10px rgba(0,0,0,0.6))` }}>
                    {logoSrc ? <img src={logoSrc} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ color: t.tc, fontFamily: "'DM Mono',monospace", fontSize: 20, fontWeight: 700 }}>{t.abbr}</span>}
                  </motion.div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 11, color: c.text, textTransform: "uppercase", letterSpacing: "0.05em", transform: "translateZ(5px)" }}>{t.name}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div style={{ marginTop: 52, overflow: "hidden", borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: "11px 0" }}>
          <div style={{ display: "flex", gap: 44, animation: "ticker 18s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
            {[...TOOLS, ...TOOLS].map((t, i) => {
              const isLight = !c.bg.startsWith("#050");
              const tc = !isLight ? t.color : t.color === "#0ff" ? "#008b8b" : t.color === "#fbbf24" ? "#d97706" : t.color === "#a78bfa" ? "#7c3aed" : t.color === "#34d399" ? "#059669" : t.color === "#ff6b1a" ? "#c2410c" : t.color === "#f43f5e" ? "#be123c" : t.color === "#ffffff" ? "#000000" : t.color === "#f7df1e" ? "#b4a000" : t.color === "#61dafb" ? "#008bba" : t.color === "#38bdf8" ? "#0284c7" : t.color;
              return <span key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: isLight ? 12 : 10, letterSpacing: "0.3em", color: tc === "#000000" && !isLight ? c.muted : tc, textTransform: "uppercase", opacity: isLight ? 0.9 : 0.65, fontWeight: isLight ? 700 : 500 }}>// {t.name}</span>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
