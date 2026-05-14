import { useState } from "react";
import { hexRgb } from "../../utils/helpers";
import { DARK } from "../../theme";
import { MI } from "../MI";

export const SERVICES_DATA = [
  {
    id: "S1",
    label: "Web Development",
    icon: "code",
    desc: "Custom websites and scalable web platforms built with modern technologies, optimized for performance, security, and business growth.",
    col: "#ff6b1a"
  },
  {
    id: "S2",
    label: "AI & Automation",
    icon: "smart_toy",
    desc: "AI-powered systems and smart automation solutions designed to streamline workflows, reduce manual tasks, and improve efficiency.",
    col: "#00ffe7"
  },
  {
    id: "S3",
    label: "UI/UX Design",
    icon: "brush",
    desc: "Modern and user-focused interfaces crafted to deliver seamless experiences, strong engagement, and visually impactful design.",
    col: "#fbbf24"
  },
  {
    id: "S4",
    label: "IT Solutions",
    icon: "cloud_done",
    desc: "Reliable IT infrastructure, cloud integration, and technical solutions tailored to support secure and scalable business operations.",
    col: "#a78bfa"
  },
  {
    id: "S5",
    label: "App Development",
    icon: "bar_chart",
    desc: "High-performance mobile and desktop applications developed with clean architecture, smooth functionality, and modern user experiences.",
    col: "#34d399"
  },
  {
    id: "S6",
    label: "Digital Marketing",
    icon: "enhanced_encryption",
    desc: "Strategic digital marketing campaigns focused on brand growth, audience engagement, and measurable business results.",
    col: "#f43f5e"
  },
];

export function HexCell({ service, posX, posY, isCenter, c, isLight, onHover }: {
  service: typeof SERVICES_DATA[0]; posX: number; posY: number; isCenter: boolean; c: typeof DARK; isLight: boolean; onHover: (s: typeof SERVICES_DATA[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const baseCol = service.col;

  // High-contrast colors for Light Mode
  const lightSaturated = baseCol === "#00ffe7" ? "#00998a"
    : baseCol === "#fbbf24" ? "#d97706"
      : baseCol === "#a78bfa" ? "#6d28d9"
        : baseCol === "#34d399" ? "#059669"
          : baseCol === "#ff6b1a" ? "#c2410c"
            : baseCol === "#f43f5e" ? "#be123c"
              : baseCol;

  const activeCol = isLight ? lightSaturated : baseCol;
  const col = activeCol;

  const size = isCenter ? 120 : 90;
  const hexPath = (s: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${s + Math.cos(a) * s * 0.88},${s + Math.sin(a) * s * 0.88}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover(service); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        transform: "translate(-50%, -50%)",
        width: size * 2,
        height: size * 2,
        cursor: "pointer",
        zIndex: hovered ? 20 : isCenter ? 10 : 5,
        transition: "z-index 0s",
      }}
    >
      <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={hexPath(size)} fill="none" stroke={col} strokeWidth={hovered ? 2 : 1}
          strokeOpacity={hovered ? 0.8 : 0.3}
          style={{ transition: "all 0.3s", filter: hovered ? `drop-shadow(0 0 10px ${col})` : "none" }}
        />
        <path d={hexPath(size * 0.84)}
          fill={col} fillOpacity={hovered ? 0.15 : 0.05}
          stroke={col} strokeWidth="1" strokeOpacity={hovered ? 0.4 : 0.15}
          style={{ transition: "all 0.3s" }}
        />
        {hovered && (
          <line x1={size * 0.2} y1={size} x2={size * 1.8} y2={size} stroke={col} strokeWidth="1" strokeOpacity="0.3">
            <animateTransform attributeName="transform" type="translate" from={`0 ${-size * 0.6}`} to={`0 ${size * 0.6}`} dur="2s" repeatCount="indefinite" />
          </line>
        )}
      </svg>

      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 12,
        transform: `scale(${hovered ? 1.05 : 1})`,
        opacity: hovered ? 1 : 0.65,
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          width: isCenter ? 48 : 36, height: isCenter ? 48 : 36,
          borderRadius: "50%",
          background: `rgba(${hexRgb(col)},${hovered ? 0.2 : 0.08})`,
          border: `1px solid ${col}${hovered ? 'aa' : '33'}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 8,
          transition: "all 0.3s",
          color: col,
        }}>
          <MI n={service.icon} style={{ fontSize: isCenter ? 24 : 18, color: col }} fill={hovered} />
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: isCenter ? 10 : 8, color: col, textAlign: "center", lineHeight: 1.2, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600, transition: "color 0.3s" }}>{service.label}</div>
      </div>
    </div>
  );
}
