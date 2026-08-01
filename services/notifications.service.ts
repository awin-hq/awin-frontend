import { apiFetch, isRecord } from "./http";
import type { WeeklySummary } from "./types";

function readNumber(source: Record<string, unknown>, keys: string[]): number {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return 0;
}

export async function getUnreadCount(
  signal?: AbortSignal
): Promise<number> {
  const payload = await apiFetch<unknown>(
    "/api/notifications/unread-count",
    { signal }
  );

  if (typeof payload === "number") return payload;

  if (isRecord(payload)) {
    const source = isRecord(payload.data) ? payload.data : payload;
    return readNumber(source, ["count", "unread", "unreadCount"]);
  }

  return 0;
}

export async function getWeeklySummary(
  signal?: AbortSignal
): Promise<WeeklySummary> {
  const payload = await apiFetch<unknown>(
    "/api/notifications/weekly-summary",
    { signal }
  );

  const source = isRecord(payload)
    ? isRecord(payload.data)
      ? payload.data
      : payload
    : {};

  const totalCredit = readNumber(source, [
    "totalCredit",
    "totalCreditGiven",
    "creditTotal",
  ]);
  const totalPayments = readNumber(source, [
    "totalPayments",
    "totalPaid",
    "paymentsTotal",
  ]);
  const transactionCount = readNumber(source, [
    "transactionCount",
    "totalTransactions",
    "count",
  ]);

  const hasActivity =
    totalCredit > 0 || totalPayments > 0 || transactionCount > 0;

  return {
    totalCredit,
    totalPayments,
    transactionCount,
    hasActivity,
    raw: payload,
  };
}
