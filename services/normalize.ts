import { isRecord } from "./http";
import type {
  Customer,
  CustomerStatus,
  Transaction,
  TransactionType,
} from "./types";

function str(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function num(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function pickId(record: Record<string, unknown>): string {
  return (
    str(record.id) ||
    str(record._id) ||
    str(record.customerId) ||
    ""
  );
}

function pickFirst(
  record: Record<string, unknown>,
  keys: string[]
): unknown {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
}

export function normalizeCustomer(input: unknown): Customer {
  const record = isRecord(input) ? input : {};

  const outstandingBalance = num(
    pickFirst(record, [
      "outstandingBalance",
      "balance",
      "totalOwed",
      "amountOwed",
    ])
  );

  const totalCreditGiven = num(
    pickFirst(record, ["totalCreditGiven", "totalCredit", "creditGiven"])
  );

  const rawStatus = str(
    pickFirst(record, ["status", "paymentStatus"])
  ).toLowerCase();

  let status: CustomerStatus = "nil";
  if (rawStatus === "due" || rawStatus === "overdue" || rawStatus === "paid") {
    status = rawStatus;
  } else if (outstandingBalance > 0) {
    status = "due";
  }

  return {
    id: pickId(record),
    name: str(pickFirst(record, ["name", "fullName", "customerName"])),
    phoneNumber: str(
      pickFirst(record, ["phoneNumber", "phone", "phone_number"])
    ),
    notes: str(record.notes) || undefined,
    outstandingBalance,
    totalCreditGiven,
    status,
    createdAt: str(record.createdAt) || undefined,
  };
}

export function normalizeTransaction(input: unknown): Transaction {
  const record = isRecord(input) ? input : {};

  const rawType = str(pickFirst(record, ["type", "transactionType"])).toLowerCase();
  const type: TransactionType = rawType === "payment" ? "payment" : "credit";

  return {
    id: pickId(record),
    customerId: str(record.customerId) || undefined,
    type,
    amount: num(pickFirst(record, ["amount", "value"])),
    description: str(pickFirst(record, ["description", "item", "note"])) || undefined,
    paymentDueDate:
      str(pickFirst(record, ["paymentDueDate", "dueDate"])) || undefined,
    createdAt: str(record.createdAt) || undefined,
  };
}

/**
 * Endpoints return either a bare array or `{ data: [...] }` (sometimes
 * `{ data: { items: [...] } }`). This coerces any of those into an array.
 */
export function toArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (isRecord(payload)) {
    if (Array.isArray(payload.data)) return payload.data;
    if (isRecord(payload.data)) {
      if (Array.isArray(payload.data.items)) return payload.data.items;
      if (Array.isArray(payload.data.customers)) return payload.data.customers;
      if (Array.isArray(payload.data.transactions)) {
        return payload.data.transactions;
      }
    }
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.customers)) return payload.customers;
    if (Array.isArray(payload.transactions)) return payload.transactions;
  }

  return [];
}
