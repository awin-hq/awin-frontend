const TOKEN_KEY = "awin_token";
/** Also mirrored into a cookie so `proxy.ts` can do an optimistic
 *  redirect check before the client JS (and localStorage) is available. */
const TOKEN_COOKIE = "awin_token";

function setCookie(name: string, value: string, days: number): void {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

/**
 * The auth token is persisted in localStorage after a successful login and
 * attached to every authenticated API request. These helpers are safe to
 * call during SSR (they no-op when `window` is unavailable).
 */
export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
  setCookie(TOKEN_COOKIE, token, 7);
}

export function clearToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  clearCookie(TOKEN_COOKIE);
}
