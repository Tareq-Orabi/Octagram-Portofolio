import React from "react";

export function MI({ n, style = {} as React.CSSProperties, fill = false, className = "" }: { n: string; style?: React.CSSProperties; fill?: boolean; className?: string }) {
  return <span className={`material-symbols-rounded ${className}`} style={{ fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0", ...style }}>{n}</span>;
}
