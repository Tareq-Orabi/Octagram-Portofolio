import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";

const ABOUT_LINES = [
  { delay: 0.2, prefix: "SYS", text: "OCTAGRAM_OS v4.2.0 — INITIALIZING..." },
  { delay: 0.6, prefix: "TEAM", text: "Syncing core member nodes: 6 engineers online" },
  { delay: 1.0, prefix: "AI", text: "Neural inference engines: READY" },
  { delay: 1.4, prefix: "SYNC", text: "Collaborative workspace: ESTABLISHED" },
  { delay: 1.8, prefix: "SVC", text: "Full-stack development • AI Solutions • UI/UX" },
  { delay: 2.2, prefix: "LOG", text: "10+ projects delivered — High-performance culture" },
  { delay: 2.6, prefix: "OK", text: "OCTAGRAM TEAM is ready. Awaiting your command." },
];

const ABOUT_STATS = [
  { val: "06", label: "Core Members" },
  { val: "10+", label: "Projects Done" },
  { val: "05+", label: "Products" },
  { val: "02+", label: "Years Exp" },
];

export function AboutSection({ c }: { c: typeof DARK }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.2"] });
  const triggered = useRef(false);
  const [visible, setVisible] = useState(false);
  const isDark = c.bg.startsWith("#050");

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => {
      if (v > 0.3 && !triggered.current) { triggered.current = true; setVisible(true); }
    });
    return unsub;
  }, [scrollYProgress]);

  const cvRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = cvRef.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight;
    const cols = Math.floor(cv.width / 20);
    const drops = Array.from({ length: cols }, () => Math.random() * cv.height);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = isDark ? "rgba(5,12,26,0.05)" : "rgba(255, 248, 240, 0.06)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = isDark ? `rgba(${hexRgb(c.orange)},0.18)` : `rgba(${hexRgb(c.tealD)})`;
      ctx.font = "13px 'DM Mono',monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 20, y);
        if (y > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 18;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [c]);

  return (
    <section id="about" ref={ref} style={{ position: "relative", minHeight: "100vh", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: isMobile ? "80px 20px" : "120px 40px" }}>
      <canvas ref={cvRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.5 }} />

      {!isMobile && <div style={{ position: "absolute", top: "10%", right: "5%", width: 320, height: 320, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid rgba(${hexRgb(c.orange)},0.2)`, animation: "spin 18s linear infinite" }} />
        <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: `1px dashed rgba(${hexRgb(c.teal)},0.15)`, animation: "spin 12s linear infinite reverse" }} />
        <div style={{ position: "absolute", inset: 50, borderRadius: "50%", border: `1px solid rgba(${hexRgb(c.orange)},0.1)`, animation: "spin 8s linear infinite" }} />
        {[0, 60, 120, 180, 240, 300].map((_deg, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, marginTop: -4, marginLeft: -4, borderRadius: "50%", background: i % 2 === 0 ? c.orange : c.teal, boxShadow: `0 0 10px ${i % 2 === 0 ? c.orange : c.teal}`, "--r": "140px", animation: `orbitA ${5 + i * 0.5}s linear infinite`, animationDelay: `${-i * 0.8}s` } as any} />
        ))}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, rgba(${hexRgb(c.orange)},0.4), transparent)`, animation: "holoPulse 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50%", background: c.orange, boxShadow: `0 0 20px ${c.orange}, 0 0 40px rgba(${hexRgb(c.orange)},0.4)` }} />
      </div>}

      {!isMobile && <div style={{ position: "absolute", bottom: "8%", left: "3%", width: 200, height: 200, pointerEvents: "none", opacity: 0.6 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid rgba(${hexRgb(c.teal)},0.3)`, animation: "spin 22s linear infinite reverse" }} />
        <div style={{ position: "absolute", inset: 30, borderRadius: "50%", border: `1px dashed rgba(${hexRgb(c.orange)},0.2)`, animation: "spin 14s linear infinite" }} />
        {[0, 90, 180, 270].map((_deg, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, marginTop: -3, marginLeft: -3, borderRadius: "50%", background: c.teal, "--r": "90px", animation: `orbitB ${6 + i}s linear infinite`, animationDelay: `${-i * 1.5}s` } as any} />
        ))}
      </div>}

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, width: "100%", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: c.orange }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.5em", color: c.orange, textTransform: "uppercase" }}>About</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(48px,6vw,86px)", color: c.text, letterSpacing: "0.04em", lineHeight: 0.92, marginBottom: 40 }}>
            WE BUILD<br />
            <span style={{ backgroundImage: `linear-gradient(90deg,${c.orange},${isDark ? '#fbbf24' : '#b45309'})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              FUTURES.
            </span>
          </h2>

          <div style={{ background: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", border: `1px solid ${c.border}`, borderTop: `2px solid ${c.orange}`, borderRadius: 4, overflow: "hidden", fontFamily: "'DM Mono',monospace" }}>
            <div style={{ padding: "10px 16px", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              {["#f43f5e", "#fbbf24", "#34d399"].map(col => <div key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />)}
              <span style={{ marginLeft: 8, fontSize: 10, color: c.muted, letterSpacing: "0.2em" }}>OCTAGRAM_TERMINAL — v4.2.0</span>
            </div>
            <div style={{ padding: "20px 20px 24px" }}>
              {ABOUT_LINES.map((line, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: line.delay, duration: 0.4 }}
                  style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: line.prefix === "OK" ? "#34d399" : line.prefix === "SYS" ? c.orange : line.prefix === "AI" ? c.teal : c.muted, fontSize: 10, letterSpacing: "0.2em", minWidth: 32, paddingTop: 1 }}>
                    [{line.prefix}]
                  </span>
                  <span style={{ color: line.prefix === "OK" ? "#34d399" : isDark ? "rgba(232,234,246,0.85)" : "rgba(10,14,26,0.8)", fontSize: 11, letterSpacing: "0.05em", lineHeight: 1.5 }}>
                    {line.text}
                    {i === ABOUT_LINES.length - 1 && (
                      <span style={{ display: "inline-block", width: 8, height: 14, background: c.orange, marginLeft: 4, verticalAlign: "middle", animation: "cursorBlink 1.1s infinite" }} />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, color: isDark ? "rgba(232,234,246,0.65)" : "rgba(10,14,26,0.85)", lineHeight: 1.9, marginBottom: 52 }}>
            Octagram is a software &amp; AI development team born at the intersection of architectural precision and cutting-edge neural systems. We don't just build software — we architect ecosystems that scale, perform, and inspire.
            <br /><br />
            From distributed AI runtimes to pixel-perfect design systems, every product we ship is a statement: that technology can be both relentlessly functional and breathtakingly beautiful.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 2 }}>
            {ABOUT_STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: "28px 24px", background: "c.bgCard", backdropFilter: "blur(12px)", border: `1px solid ${c.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: i % 2 === 0 ? c.orange : c.teal }} />
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, color: i % 2 === 0 ? c.orange : c.teal, letterSpacing: "0.02em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: c.muted, letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? c.orange : c.teal}, transparent)`, animation: "memberScan 3s linear infinite", animationDelay: `${i * 0.75}s` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
