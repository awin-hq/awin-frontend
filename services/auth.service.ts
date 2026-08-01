import { apiFetch, isRecord } from "./http";
import { setSession } from "@/features/auth/context/auth-store";
import type { AuthResult, Merchant } from "./types";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  phoneNumber: string;
  password: string;
};

export type VerifyOtpPayload = {
  email: string;
  otpCode: string;
};

function extractToken(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  const candidates = [payload.token, payload.accessToken, payload.jwt];

  if (isRecord(payload.data)) {
    candidates.push(
      payload.data.token,
      payload.data.accessToken,
      payload.data.jwt
    );
  }

  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

function extractMerchant(payload: unknown): Merchant | null {
  if (!isRecord(payload)) return null;

  const source = isRecord(payload.data) ? payload.data : payload;
  const user = isRecord(source.user) ? source.user : source;

  const id =
    typeof user.id === "string"
      ? user.id
      : typeof user._id === "string"
        ? user._id
        : "";

  if (!id) return null;

  return {
    id,
    firstName: String(user.firstName ?? ""),
    lastName: String(user.lastName ?? ""),
    email: String(user.email ?? ""),
    phoneNumber: String(user.phoneNumber ?? ""),
  };
}

export function register(payload: RegisterPayload) {
  return apiFetch<unknown>("/api/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const response = await apiFetch<unknown>("/api/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });

  const token = extractToken(response);
  const merchant = extractMerchant(response);

  if (token) {
    setSession(token, merchant);
  }

  return {
    token,
    merchant,
    message: isRecord(response) ? String(response.message ?? "") : "",
  };
}

export function verifyOtp(payload: VerifyOtpPayload) {
  return apiFetch<unknown>("/api/auth/verify-otp", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export function forgotPassword(email: string) {
  return apiFetch<unknown>("/api/auth/forgot-password", {
    method: "POST",
    body: { email },
    auth: false,
  });
}
