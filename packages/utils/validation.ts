export function isValidNumber(value: string | number): boolean {
  if (typeof value === "number") return !isNaN(value) && isFinite(value);
  if (typeof value !== "string") return false;
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

