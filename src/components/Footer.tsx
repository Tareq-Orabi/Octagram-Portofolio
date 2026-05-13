import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DARK } from "../theme";
import OctagramLogo from "../assets/Images/OctagramLogo.png";

export function Footer({ c }: { c: typeof DARK }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [particles, setParticles] = useState<{ id: number; x: number; rot: number }[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current || Math.random() > 0.15) return;
    const rect = footerRef.current.getBoundingClientRect();
    const id = Math.random(), x = e.clientX - rect.left, rot = Math.random() * 360;
    setParticles(prev => [...prev, { id, x, rot }]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2000);
  };
  return (
    <footer ref={footerRef} onMouseMove={handleMouseMove} style={{ position: "relative", background: c.bg, borderTop: `1px solid ${c.border}`, padding: isMobile ? "40px 20px" : "80px 40px", overflow: "hidden", cursor: "crosshair" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <AnimatePresence>
          {particles.map(p => (
            <motion.div key={p.id} initial={{ y: 20, x: p.x, opacity: 1, scale: 0.5, rotate: p.rot }} animate={{ y: 150, rotate: p.rot + 180, opacity: 0.5, scale: 3 }} transition={{ duration: 0.8, ease: "easeIn" }} style={{ position: "absolute", top: 0 }}>
              <img src={OctagramLogo} alt="" style={{ width: 24, height: 24, filter: `drop-shadow(0 0 8px ${c.orange}66)` }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", justifyContent: isMobile ? "center" : "space-between", alignItems: "center", gap: 28, position: "relative", zIndex: 2, textAlign: isMobile ? "center" : "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={OctagramLogo} alt="Logo" style={{ width: 40, height: 40 }} />
          <div>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 24, letterSpacing: 4, color: c.text, display: "block" }}>OCTAGRAM</span>
            <span style={{ fontFamily: "'DM Mono'", fontSize: 9, color: c.orange, letterSpacing: "0.4em" }}>GRAVITY_ACTIVE</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { n: "Instagram", h: "https://www.instagram.com/octagram.jo" },
          ].map(s => (
            <motion.a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer" whileHover={{ color: c.orange, y: -4 }} transition={{ duration: 0.2 }}
              style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: c.muted, textDecoration: "none" }}>{s.n}</motion.a>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Mono'", fontSize: 10, color: c.muted, opacity: 0.8 }}>© 2026 // ARCHITECTING THE FUTURE</p>
      </div>
    </footer>
  );
}
