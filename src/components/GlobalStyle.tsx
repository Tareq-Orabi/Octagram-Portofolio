import { useEffect } from "react";
import { DARK } from "../theme";

export function GlobalStyle({ c }: { c: typeof DARK }) {
  useEffect(() => {
    const s = document.createElement("style");
    s.id = "oct-global";
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      html,body,#root,.layout-wrapper{overflow:visible!important;height:auto!important;}
      ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:${c.bg};}::-webkit-scrollbar-thumb{background:${c.orange};border-radius:2px;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0.15}}
      @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes gearSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes gearSpinR{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
      @keyframes scanPulse{0%{top:0%}100%{top:100%}}
      @keyframes typewriter{from{width:0}to{width:100%}}
      @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes orbitA{from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)}}
      @keyframes orbitB{from{transform:rotate(180deg) translateX(var(--r)) rotate(-180deg)}to{transform:rotate(540deg) translateX(var(--r)) rotate(-540deg)}}
      @keyframes particleDrift{0%{transform:translate(0,0) scale(1);opacity:0.8}50%{transform:translate(var(--dx),var(--dy)) scale(1.4);opacity:1}100%{transform:translate(0,0) scale(1);opacity:0.8}}
      @keyframes holoPulse{0%,100%{box-shadow:0 0 20px rgba(255,107,26,0.2)}50%{box-shadow:0 0 60px rgba(255,107,26,0.5),0 0 100px rgba(255,107,26,0.2)}}
      @keyframes glitch{0%,100%{clip-path:inset(0 0 100% 0)}10%{clip-path:inset(10% 0 85% 0)}20%{clip-path:inset(70% 0 5% 0)}30%{clip-path:inset(30% 0 60% 0)}40%{clip-path:inset(80% 0 10% 0)}50%{clip-path:inset(5% 0 90% 0)}60%{clip-path:inset(50% 0 40% 0)}70%{clip-path:inset(25% 0 70% 0)}80%{clip-path:inset(90% 0 3% 0)}90%{clip-path:inset(15% 0 80% 0)}}
      @keyframes memberScan{0%{transform:translateY(-100%);opacity:0.6}100%{transform:translateY(400%);opacity:0}}
      @keyframes nodeFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-8px)}}
      @keyframes hexPulse{0%,100%{opacity:0.15;transform:scale(1)}50%{opacity:0.35;transform:scale(1.04)}}
      @keyframes dataFlow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
      @keyframes radarSweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes nodeGlow{0%,100%{box-shadow:0 0 8px currentColor}50%{box-shadow:0 0 24px currentColor,0 0 48px currentColor}}
      .scanlines{background:repeating-linear-gradient(0deg,transparent,transparent 2px,${c.scanline} 2px,${c.scanline} 4px);}
    `;
    const old = document.getElementById("oct-global");
    if (old) old.remove();
    document.head.appendChild(s);
    return () => { document.getElementById("oct-global")?.remove(); };
  }, [c]);
  return null;
}
