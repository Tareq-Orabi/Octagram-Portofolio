import { useState, useCallback } from "react";

export type Theme = "dark" | "light";

export const DARK = {
  bg: "#050c1a", bgCard: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)",
  text: "#e8eaf6", muted: "rgba(232,234,246,0.4)", orange: "#ff6b1a", orangeD: "#c44800",
  teal: "#00ffe7", tealD: "#0d9488",
  particle: ["#ff6b1a", "rgba(0,255,231,0.8)", "rgba(255,255,255,0.3)"],
  gridLine: "rgba(255,107,26,0.06)", scanline: "rgba(0,0,0,0.03)",
};

export const LIGHT = {
  bg: "#f0f4ff", bgCard: "rgba(255,255,255,0.8)", border: "rgba(0,0,0,0.08)",
  text: "#0a0e1a", muted: "rgba(10,14,26,0.65)", orange: "#e05000", orangeD: "#a33800",
  teal: "#007a6e", tealD: "#005a52",
  particle: ["#d04000", "#007a6e", "#4f46e5"],
  gridLine: "rgba(0,80,200,0.05)", scanline: "rgba(0,0,0,0.015)",
};

export function useTheme() {
  const [t, setT] = useState<Theme>("light");
  const toggle = useCallback(() => setT(p => p === "dark" ? "light" : "dark"), []);
  return { theme: t, toggle, c: t === "dark" ? DARK : LIGHT };
}
