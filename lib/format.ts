/**
 * Format a number as Nigerian Naira, e.g. 80000 -> "₦80,000".
 * Pass `decimals` to control the fraction digits (defaults to none).
 */
export function formatNaira(
  amount: number,
  decimals = 0
): string {
  const value = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.abs(amount));

  return `₦${value}`;
}

/**
 * Deterministically pick a swatch for an avatar based on a name so the
 * same person always renders the same colour.
 */
const AVATAR_COLORS = [
  "#FF6B00",
  "#E11D8F",
  "#6366F1",
  "#14AE5C",
  "#0EA5E9",
  "#F59E0B",
] as const;

export function avatarColor(seed: string): string {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_COLORS.length;

  return AVATAR_COLORS[index];
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
}
