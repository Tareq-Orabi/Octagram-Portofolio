import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DARK } from "../../theme";
import { TEAM_DATA, MemberCard } from "./MemberCard";

export function TeamSection({ c }: { c: typeof DARK }) {
  const isDark = c.bg.startsWith("#050");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="team" ref={ref} style={{ position: "relative", minHeight: "100vh", background: c.bg, overflow: "hidden", padding: isMobile ? "80px 20px 100px" : "140px 40px 160px" }}>
      <motion.div style={{ y: bgY, position: "absolute", inset: "-20%", backgroundImage: `linear-gradient(${c.gridLine} 1px,transparent 1px),linear-gradient(90deg,${c.gridLine} 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(120px,18vw,260px)", color: isDark ? "rgba(255,107,26,0.03)" : "rgba(0,0,0,0.04)", letterSpacing: "0.08em", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>THE TEAM</div>
      <div style={{ position: "absolute", left: 40, top: "20%", width: 1, height: "60%", background: `linear-gradient(to bottom, transparent, ${c.orange}, transparent)`, opacity: 0.2 }}>
        {[0, 25, 50, 75, 100].map(pct => (
          <div key={pct} style={{ position: "absolute", top: `${pct}%`, left: -3, width: 7, height: 7, borderRadius: "50%", background: c.orange, transform: "translateY(-50%)", opacity: 0.6 }} />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", marginBottom: isMobile ? 40 : 80, gap: isMobile ? 20 : 0 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: c.orange }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>The Crew</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(52px,7vw,100px)", color: c.text, letterSpacing: "0.04em", lineHeight: 0.9 }}>
              MINDS<br />
              <span style={{ backgroundImage: `linear-gradient(90deg,${c.orange},${isDark ? c.teal : c.tealD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>BEHIND</span><br />
              THE MACHINE.
            </h2>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right", maxWidth: 300 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: c.muted, letterSpacing: "0.15em", lineHeight: 1.8 }}>A cross-disciplinary team of engineers, designers, and strategists operating at the frontier of software and AI.</p>
            <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", border: `1px solid ${c.border}`, background: c.bgCard, backdropFilter: "blur(10px)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", animation: "blink 2s infinite" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#34d399", letterSpacing: "0.3em" }}>ALL SYSTEMS ACTIVE</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "24px 32px" }}>
          {TEAM_DATA.map((m, i) => <MemberCard key={m.name} m={m} index={i} c={c} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }}
          style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 24, justifyContent: "center" }}>
          <div style={{ height: 1, flex: 1, maxWidth: 200, background: `linear-gradient(to right, transparent, ${c.border})` }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: c.muted, letterSpacing: "0.4em", textTransform: "uppercase" }}>crew that built Octagram</span>
          <div style={{ height: 1, flex: 1, maxWidth: 200, background: `linear-gradient(to left, transparent, ${c.border})` }} />
        </motion.div>
      </div>
    </section>
  );
}
