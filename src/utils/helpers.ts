export const hexRgb = (h: string) => {
  const r = parseInt(h.slice(1, 3) || "ff", 16);
  const g = parseInt(h.slice(3, 5) || "ff", 16);
  const b = parseInt(h.slice(5, 7) || "ff", 16);
  return `${r},${g},${b}`;
};
