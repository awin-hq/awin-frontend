import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic route guard for the dashboard route group. This only checks
 * for the presence of the `awin_token` cookie (mirrored from localStorage
 * on login/logout, see lib/auth-token.ts) — it does not validate the token
 * against the backend. The backend itself rejects every protected endpoint
 * without a valid Bearer token, so this is a UX guard (avoid flashing
 * protected pages / redirect early), not the security boundary.
 */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/customers",
  "/credit-sales",
  "/repayments",
  "/reports",
  "/settings",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("awin_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/customers/:path*",
    "/credit-sales/:path*",
    "/repayments/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
