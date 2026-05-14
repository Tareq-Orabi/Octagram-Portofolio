import { motion } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";
import { MI } from "../MI";
import getInTouchVideo from "../../assets/Images/getInTouch.gif";

export function Contact({ c }: { c: typeof DARK }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section id="contact" style={{ position: "relative", minHeight: "100vh", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "60px 16px" : "80px 40px", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={getInTouchVideo} alt="getInTouchVideo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%,rgba(${hexRgb(c.orange)},0.04),rgba(${hexRgb(c.bg)},0.95))`, pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 0.8, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 960, background: c.bgCard, backdropFilter: "blur(250px)", border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.orange}`, padding: isMobile ? 28 : 72, borderRadius: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <div style={{ width: 40, height: 1, background: c.orange }} /><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>Mission</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(40px,6vw,80px)", color: c.text, letterSpacing: "0.04em", marginBottom: isMobile ? 32 : 56 }}>ESTABLISH TRANSMISSION</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40, marginBottom: 48 }}>
          {[{ l: "IDENTITY_MARK", p: "NAME_VAL", t: "text" }, { l: "SIGNAL_PATH", p: "EMAIL_VAL", t: "email" }].map(f => (
            <div key={f.l}>
              <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.4em", color: c.orange, textTransform: "uppercase", display: "block", marginBottom: 10 }}>{f.l}</label>
              <input type={f.t} placeholder={f.p} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${c.border}`, padding: "12px 0", fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: "0.2em", color: c.text, outline: "none", textTransform: "uppercase" }}
                onFocus={e => (e.target as HTMLInputElement).style.borderBottomColor = c.orange}
                onBlur={e => (e.target as HTMLInputElement).style.borderBottomColor = c.border} />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 56 }}>
          <label style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.4em", color: c.orange, textTransform: "uppercase", display: "block", marginBottom: 10 }}>MISSION_BRIEF</label>
          <textarea rows={3} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${c.border}`, padding: "12px 0", fontFamily: "'DM Mono',monospace", fontSize: 12, color: c.text, outline: "none", resize: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}
            onFocus={e => (e.target as HTMLTextAreaElement).style.borderBottomColor = c.orange}
            onBlur={e => (e.target as HTMLTextAreaElement).style.borderBottomColor = c.border} />
        </div>
        <motion.button whileHover={{ x: 12 }} style={{ display: "flex", alignItems: "center", gap: 20, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${c.orange},${c.orangeD})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px rgba(${hexRgb(c.orange)},0.4)` }}>
            <MI n="send" style={{ color: "#fff", fontSize: 26 }} fill />
          </div>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: c.text }}>Initialize Sequence</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
