import { apiFetch, isRecord } from "./http";
import { normalizeTransaction, toArray } from "./normalize";
import type { Transaction, WeeklySummary } from "./types";

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

function readLocalStorageTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem("awìn_transactions");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((record) => normalizeTransaction(record))
      : [];
  } catch {
    return [];
  }
}

function isRecentTransaction(transaction: Transaction): boolean {
  if (!transaction.createdAt) return false;

  const created = new Date(transaction.createdAt);
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);
  created.setHours(0, 0, 0, 0);

  return created >= sevenDaysAgo && created <= today;
}

function summarizeTransactions(transactions: Transaction[]): WeeklySummary {
  const recent = transactions.filter(isRecentTransaction);
  const totalCredit = recent
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalPayments = recent
    .filter((transaction) => transaction.type === "payment")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const transactionCount = recent.length;

  return {
    totalCredit,
    totalPayments,
    transactionCount,
    hasActivity: transactionCount > 0,
    raw: recent,
  };
}

export async function getWeeklySummary(
  signal?: AbortSignal
): Promise<WeeklySummary> {
  const localTransactions = readLocalStorageTransactions();

  try {
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

    if (hasActivity) {
      return {
        totalCredit,
        totalPayments,
        transactionCount,
        hasActivity,
        raw: payload,
      };
    }

    return localTransactions.length > 0
      ? summarizeTransactions(localTransactions)
      : {
          totalCredit,
          totalPayments,
          transactionCount,
          hasActivity: false,
          raw: payload,
        };
  } catch {
    return summarizeTransactions(localTransactions);
  }
}

