import type { Merchant } from "@/services/types";

const MERCHANT_KEY = "awin_merchant";

/**
 * Lightweight client-side cache of the signed-in merchant, populated at
 * login so the dashboard can greet the user without an extra request.
 */
export function setStoredMerchant(merchant: Merchant): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MERCHANT_KEY, JSON.stringify(merchant));
}

export function getStoredMerchant(): Merchant | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(MERCHANT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Merchant;
  } catch {
    return null;
  }
}

export function clearStoredMerchant(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MERCHANT_KEY);
}
