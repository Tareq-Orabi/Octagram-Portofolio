import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { hexRgb } from "../utils/helpers";
import OctagramLogo from "../assets/Images/OctagramLogo.png";
import cyperCity from "../assets/Videos/cyperCity2Gif.gif";
import type { Theme } from "../theme";
import { DARK } from "../theme";

export function HeaderSection({ c, theme, toggle }: { c: typeof DARK; theme: Theme; toggle: () => void }) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [scrolled, setScrolled] = useState(false);
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const rotateX = useTransform(scrollY, [0, 600], [0, -30]);
  const y = useTransform(scrollY, [0, 600], [0, -200]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const NAV_LINKS = ["Home", "About", "Team", "Services", "Skills", "Products", "Contact"];

  const pillStyle: React.CSSProperties = {
    position: "fixed",
    top: scrolled ? 10 : 16,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 300,
    width: "calc(100% - 20px)",
    maxWidth: 1040,
    transition: "top 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s, background 0.4s",
    borderRadius: 999,
    background: scrolled
      ? theme === "dark" ? "rgba(3,7,15,0.88)" : "rgba(255,255,255,0.88)"
      : theme === "dark" ? "rgba(3,7,15,0.4)" : "rgba(255,255,255,0.4)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${scrolled ? c.border : "rgba(255,255,255,0.13)"}`,
    boxShadow: scrolled
      ? `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`
      : "0 4px 24px rgba(0,0,0,0.2)",
    padding: isMobile ? "8px 10px 8px 14px" : "9px 12px 9px 20px",
    display: "flex",
    alignItems: "center",
    gap: 0,
  };

  return (
    <>
      <nav style={pillStyle}>
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0, marginRight: isMobile ? 10 : 18 }}>
          <img src={OctagramLogo} alt="Octagram" style={{ width: isMobile ? 26 : 30, height: isMobile ? 26 : 30 }} />
          {!isMobile && <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: "0.18em", color: c.text, lineHeight: 1, whiteSpace: "nowrap" }}>OCTAGRAM</span>}
        </a>

        <div
          className="oct-nav-links"
          style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 22, flex: 1, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: isMobile ? 9 : 10, letterSpacing: isMobile ? "0.15em" : "0.28em", color: c.muted, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = c.orange)}
              onMouseLeave={e => (e.currentTarget.style.color = c.muted)}
            >{l}</a>
          ))}
        </div>

        <button
          onClick={toggle}
          style={{ background: "transparent", border: `1px solid ${c.border}`, borderRadius: 999, padding: isMobile ? "5px 9px" : "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: c.text, fontFamily: "'DM Mono',monospace", fontSize: 10, transition: "border-color 0.2s, background 0.2s", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8 }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.orange; (e.currentTarget as HTMLButtonElement).style.background = `rgba(${hexRgb(c.orange)},0.08)`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.border; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          <span>{theme === "dark" ? "☀" : "◐"}</span>
          {!isMobile && <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>}
        </button>
      </nav>

      <div style={{ position: "relative", perspective: "2000px", background: theme === "dark" ? "#000" : c.bg, overflow: "hidden" }}>
        <motion.section style={{ position: "relative", zIndex: 10, height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: theme === "dark" ? "#000" : c.bg, opacity, scale, rotateX, y, transformOrigin: "bottom center", willChange: "transform, opacity" }}>
          <div onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMp({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); }} onMouseLeave={() => setMp({ x: 0, y: 0 })} style={{ position: "absolute", inset: 0, zIndex: 0, perspective: 1200 }}>
            <img src={cyperCity} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: theme === "dark" ? 0.6 : 0.8, WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)" }} />
            <motion.svg viewBox="0 0 1400 820" width="100%" style={{ maxWidth: 1400, position: "absolute", left: "50%", top: "50%", x: "-50%", y: "-50%", overflow: "visible", zIndex: 10, pointerEvents: "none" }} animate={{ rotateX: -mp.y * 10, rotateY: mp.x * 15 }} transition={{ type: "spring", stiffness: 40, damping: 20 }}>
              {[{ d: "M80,720 L300,720 L300,695 L560,695", c: c.orange }, { d: "M1320,720 L1100,720 L1100,695 L840,695", c: "#7c3aed" }, { d: "M120,740 L380,740 L380,715 L640,715", c: c.orange }, { d: "M1280,740 L1020,740 L1020,715 L760,715", c: "#7c3aed" }, { d: "M200,770 L450,770 L450,795 L700,795", c: c.orange }, { d: "M1200,770 L950,770 L950,795 L700,795", c: "#ee6617ff" }].map((l, i) => (
                <g key={i}><path d={l.d} fill="none" stroke={l.c} strokeWidth="1" strokeOpacity="0.12" /><path d={l.d} fill="none" stroke={l.c} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="8 60"><animate attributeName="stroke-dashoffset" from="68" to="0" dur={`${1.2 + i * 0.25}s`} repeatCount="indefinite" /></path><circle r="3" fill={l.c}><animateMotion path={l.d} dur={`${1.8 + i * 0.35}s`} repeatCount="indefinite" /></circle></g>
              ))}
            </motion.svg>
          </div>
          <motion.div style={{ zIndex: 20, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: isMobile ? "80px 20px 0" : "80px 0 0" }}>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(44px,8vw,110px)", letterSpacing: "0.04em", color: "#fff", textAlign: "center", maxWidth: 1100, lineHeight: 0.9, margin: "0 auto 28px", textShadow: "0 15px 60px rgba(0,0,0,1)", padding: isMobile ? "0 8px" : 0 }}>
              DESIGNING IMPACT. <span style={{ backgroundImage: `linear-gradient(90deg,${c.orange},#fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ENGINEERING BEAUTY.</span>
            </h1>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.55)", maxWidth: 520, textAlign: "center", lineHeight: 1.85, marginBottom: 44, padding: isMobile ? "0 4px" : 0 }}>We merge architectural precision with advanced neural ecosystems to build software that feels like a premium command center.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#services" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "15px 36px", background: `linear-gradient(135deg,${c.orange},${c.orangeD})`, color: "#fff", textDecoration: "none", borderRadius: 999, fontWeight: 600, boxShadow: `0 0 32px rgba(${hexRgb(c.orange)},0.45)` }}>Start Project</a>
              <a href="#products" style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "15px 36px", border: `1px solid rgba(255,255,255,0.18)`, color: "#fff", textDecoration: "none", borderRadius: 999, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>Products</a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
