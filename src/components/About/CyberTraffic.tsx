import { useEffect, useRef } from "react";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";

export function CyberTraffic({ c }: { c: typeof DARK }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let pts: any[] = [], pkts: any[] = [], lines: any[] = [];
    const init = () => {
      const p = cv.parentElement;
      cv.width = p ? p.offsetWidth : window.innerWidth;
      cv.height = p ? p.offsetHeight : window.innerHeight;
      pts = Array.from({ length: 160 }, () => {
        const x = Math.random() * cv.width, y = Math.random() * cv.height;
        return { x, y, bx: x, by: y, sz: Math.random() * 2.2 + 0.4, d: Math.random() * 22 + 4, col: c.particle[Math.floor(Math.random() * 3)] };
      });
      lines = [];
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(pts[i].bx - pts[j].bx, pts[i].by - pts[j].by); if (d < 130) lines.push({ a: i, b: j, d }); }
      pkts = Array.from({ length: 20 }, () => ({ ai: Math.floor(Math.random() * pts.length), bi: Math.floor(Math.random() * pts.length), t: Math.random(), speed: 0.003 + Math.random() * 0.006, col: Math.random() > 0.5 ? c.orange : c.teal }));
    };
    let raf = 0;
    const isL = !c.bg.startsWith("#050");
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const mx = mouse.current.x, my = mouse.current.y;
      pts.forEach(p => { const dx = mx - p.x, dy = my - p.y, dist = Math.hypot(dx, dy), md = 160; if (dist < md && dist > 0.1) { const f = (md - dist) / md; p.x -= (dx / dist) * f * p.d; p.y -= (dy / dist) * f * p.d; } else { p.x += (p.bx - p.x) * 0.07; p.y += (p.by - p.y) * 0.07; } });
      lines.forEach(l => { const a = pts[l.a], b = pts[l.b]; ctx.strokeStyle = `rgba(${hexRgb(c.orange)},${(1 - l.d / 130) * (isL ? 0.42 : 0.13)})`; ctx.lineWidth = isL ? 1 : 0.5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      pkts.forEach(pk => { pk.t += pk.speed; if (pk.t > 1) { pk.ai = pk.bi; pk.bi = Math.floor(Math.random() * pts.length); pk.t = 0; } const a = pts[pk.ai], b = pts[pk.bi]; const x = a.x + (b.x - a.x) * pk.t, y = a.y + (b.y - a.y) * pk.t; ctx.fillStyle = pk.col; ctx.beginPath(); ctx.arc(x, y, isL ? 4 : 3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = isL ? 0.45 : 0.15; ctx.beginPath(); ctx.arc(x, y, isL ? 10 : 7, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
      pts.forEach(p => { ctx.globalAlpha = isL ? 0.9 : 1; ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x, p.y, isL ? p.sz * 1.5 : p.sz, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
      raf = requestAnimationFrame(draw);
    };
    init(); draw();
    const onM = (e: MouseEvent) => { const r = cv.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener("mousemove", onM);
    window.addEventListener("resize", () => { cancelAnimationFrame(raf); init(); draw(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onM); };
  }, [c]);
  return <canvas ref={ref} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
