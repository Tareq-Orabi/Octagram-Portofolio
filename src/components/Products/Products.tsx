import { motion } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";
import { MI } from "../MI";

const PRODUCTS_DATA = [
  { id: "01", name: "Clinic System", tag: "Healthcare Management", desc: "A comprehensive healthcare platform streamlining patient management, appointment scheduling, and automated clinical workflows for modern medical practices.", icon: "medical_services", col: "#ff6b1a", accent: "#fbbf24" },
  { id: "02", name: "Al-Aufoq School", tag: "Educational Ecosystem", desc: "An integrated educational management system designed to empower educators and administrators with real-time student performance tracking and smart resource allocation.", icon: "school", col: "#00ffe7", accent: "#14b8a6" },
  { id: "03", name: "Think", tag: "AI Strategy & Design", desc: "Our flagship AI-driven consulting framework that bridges the gap between architectural complexity and human-centric design for high-performance software ecosystems.", icon: "psychology", col: "#a78bfa", accent: "#8b5cf6" },
];

function ProductCard({ product: p, index: i, c, isMobile }: any) {
  const isDark = !c.bg.startsWith("#f");
  const isEven = i % 2 === 0;
  const side = isMobile ? "center" : (isEven ? "left" : "right");

  return (
    <div style={{
      display: "flex",
      justifyContent: side === "left" ? "flex-start" : side === "right" ? "flex-end" : "center",
      width: "100%",
      position: "relative",
      padding: isMobile ? "0" : "40px 0"
    }}>
      {!isMobile && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "calc(50% - 100px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "50%",
            left: side === "right" ? "50%" : "auto",
            right: side === "left" ? "50%" : "auto",
            height: 2,
            background: `linear-gradient(${side === "left" ? "to left" : "to right"}, ${c.orange}, transparent)`,
            zIndex: 0,
            transform: "translateY(-50%)",
            pointerEvents: "none"
          }}
        >
          <div style={{
            position: "absolute",
            [side === "left" ? "right" : "left"]: -4,
            top: -3,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: c.orange,
            boxShadow: `0 0 10px ${c.orange}`
          }} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -100 : side === "right" ? 100 : 0, y: isMobile ? 50 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: isMobile ? "100%" : "calc(50% - 60px)",
          position: "relative",
          zIndex: 10
        }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          background: isDark ? "#080808" : "#ffffff",
          border: `1px solid ${c.border}`,
          borderTop: `4px solid ${p.col}`,
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(${hexRgb(p.col)},0.08)`,
        }}>
          <div style={{ padding: isMobile ? "28px" : "48px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.col, boxShadow: `0 0 8px ${p.col}`, animation: "blink 2s infinite" }} />
                <span style={{ fontFamily: "'DM Mono'", fontSize: 10, color: c.muted, letterSpacing: 2 }}>{p.tag}</span>
              </div>
              <span style={{ fontFamily: "'DM Mono'", fontSize: 10, color: c.muted }}>[ 0{i + 1} ]</span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: isMobile ? 42 : 64, color: isDark ? "#fff" : "#0a0e1a", lineHeight: 0.9, marginBottom: 20 }}>{p.name}</h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: isMobile ? 14 : 16, color: isDark ? "#999" : "#555", lineHeight: 1.7, marginBottom: "auto" }}>{p.desc}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexDirection: isMobile ? "column" : "row" }}>
              <button style={{ background: isDark ? "#fff" : "#0a0e1a", color: isDark ? "#000" : "#fff", fontWeight: 700, padding: "14px 28px", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono'", fontSize: 11 }}>VIEW PROJECT</button>
              <button style={{ background: "rgba(255,255,255,0.05)", color: isDark ? "#fff" : "#0a0e1a", padding: "14px 28px", border: `1px solid ${c.border}`, borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono'", fontSize: 11 }}>DOCS</button>
            </div>
          </div>

          {!isMobile && (
            <div style={{ position: "relative", background: isDark ? "#0c0c0c" : "#f8f8ff", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${c.border}` }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: `radial-gradient(${p.col} 1px,transparent 1px)`, backgroundSize: "30px 30px" }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: "relative", zIndex: 2 }}
              >
                <MI n={p.icon} style={{ color: p.col, fontSize: 120, filter: `drop-shadow(0 0 30px ${p.col}44)` }} fill />
              </motion.div>
              <div style={{ position: "absolute", bottom: -10, right: 10, fontFamily: "'Bebas Neue'", fontSize: 160, color: isDark ? "#fff" : "#000", opacity: 0.02, pointerEvents: "none" }}>{p.id}</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Products({ c }: { c: typeof DARK }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <section id="products" style={{ position: "relative", padding: isMobile ? "80px 20px" : "160px 40px", background: c.bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, transparent, ${c.orange} 10%, ${c.orange} 90%, transparent)`, opacity: 0.2, transform: "translateX(-50%)", zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 60 : 120 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: c.orange }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>The Ecosystem</span>
            <div style={{ width: 40, height: 1, background: c.orange }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px, 8vw, 120px)", color: c.text, letterSpacing: "0.04em", lineHeight: 0.9 }}>
            OUR <span style={{ color: c.orange }}>PRODUCTS</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 80 : 40 }}>
          {PRODUCTS_DATA.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} c={c} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
