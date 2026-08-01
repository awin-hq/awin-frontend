import { apiFetch, unwrap } from "./http";
import { normalizeCustomer, normalizeTransaction, toArray } from "./normalize";
import type { Customer, Transaction } from "./types";

export function getCustomers(signal?: AbortSignal): Promise<Customer[]> {
  return apiFetch<unknown>("/api/customers", { signal }).then((payload) =>
    toArray(payload).map(normalizeCustomer)
  );
}

export async function getCustomer(
  id: string,
  signal?: AbortSignal
): Promise<Customer | undefined> {
  const customers = await getCustomers(signal);
  return customers.find((customer) => customer.id === id);
}

export function getCustomerTransactions(
  id: string,
  signal?: AbortSignal
): Promise<Transaction[]> {
  return apiFetch<unknown>(`/api/customers/${id}/transactions`, {
    signal,
  }).then((payload) => toArray(payload).map(normalizeTransaction));
}

export type AddCustomerPayload = {
  name: string;
  phoneNumber: string;
};

export function addCustomer(payload: AddCustomerPayload): Promise<Customer> {
  return apiFetch<unknown>("/api/customers", {
    method: "POST",
    body: payload,
  }).then((response) => normalizeCustomer(unwrap(response)));
}

export type UpdateCustomerPayload = {
  name?: string;
  phoneNumber?: string;
  notes?: string;
  status?: string;
};

export function updateCustomer(
  id: string,
  payload: UpdateCustomerPayload
): Promise<Customer> {
  return apiFetch<unknown>(`/api/customers/${id}`, {
    method: "PUT",
    body: payload,
  }).then((response) => normalizeCustomer(unwrap(response)));
}

export function deleteCustomer(id: string): Promise<void> {
  return apiFetch<unknown>(`/api/customers/${id}`, {
    method: "DELETE",
  }).then(() => undefined);
}
