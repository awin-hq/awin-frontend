"use client";

import {
  getToken,
  setToken as persistToken,
  clearToken as clearPersistedToken,
} from "@/lib/auth-token";
import {
  getStoredMerchant,
  setStoredMerchant,
  clearStoredMerchant,
} from "@/lib/session";
import type { Merchant } from "@/services/types";

export type AuthSnapshot = {
  token: string | null;
  merchant: Merchant | null;
};

/**
 * Tiny external store (read via `useSyncExternalStore`) wrapping the
 * localStorage-backed token/merchant. Using the external-store pattern
 * (rather than reading storage in a `useEffect` + `setState`) avoids
 * hydration-mismatch flicker and the cascading-render footgun the repo's
 * lint rule (`react-hooks/set-state-in-effect`) flags.
 */
const listeners = new Set<() => void>();
let cached: AuthSnapshot | null = null;

function readSnapshot(): AuthSnapshot {
  return { token: getToken(), merchant: getStoredMerchant() };
}

function snapshotsEqual(a: AuthSnapshot, b: AuthSnapshot): boolean {
  return a.token === b.token && a.merchant?.id === b.merchant?.id;
}

export function getSnapshot(): AuthSnapshot {
  const next = readSnapshot();

  if (!cached || !snapshotsEqual(cached, next)) {
    cached = next;
  }

  return cached;
}

const SERVER_SNAPSHOT: AuthSnapshot = { token: null, merchant: null };

export function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(): void {
  cached = null;
  listeners.forEach((listener) => listener());
}

export function setSession(token: string, merchant: Merchant | null): void {
  persistToken(token);
  if (merchant) {
    setStoredMerchant(merchant);
  }
  notify();
}

export function clearSession(): void {
  clearPersistedToken();
  clearStoredMerchant();
  notify();
}
