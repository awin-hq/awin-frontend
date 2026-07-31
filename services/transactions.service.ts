import { apiFetch, unwrap } from "./http";
import { normalizeTransaction } from "./normalize";
import type { Transaction, TransactionType } from "./types";

export type CreateTransactionPayload = {
  customerId: string;
  type: TransactionType;
  amount: number;
  paymentDueDate?: string;
};

export function createTransaction(
  payload: CreateTransactionPayload
): Promise<Transaction> {
  return apiFetch<unknown>("/api/transactions", {
    method: "POST",
    body: payload,
  }).then((response) => normalizeTransaction(unwrap(response)));
}
