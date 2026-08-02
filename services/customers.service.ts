import { apiFetch, unwrap } from "./http";
import { normalizeCustomer, normalizeTransaction, toArray } from "./normalize";
import type { Customer, CustomerStatus, Transaction } from "./types";

function isClient() {
  return typeof window !== "undefined";
}

function readLocalStorageArray<T>(key: string): T[] {
  if (!isClient()) return [];

  const raw = window.localStorage.getItem(key);

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLocalCustomers(): Customer[] {
  return readLocalStorageArray<Customer>("awìn_customers");
}

function getLocalTransactions(): Transaction[] {
  return readLocalStorageArray<unknown>("awìn_transactions").map((item) =>
    normalizeTransaction(item)
  );
}

function getStartOfDay(value: string | Date): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getCustomerStatus(
  customer: Customer,
  transactions: Transaction[]
): Customer["status"] {
  if (customer.outstandingBalance <= 0) {
    return "paid";
  }

  const today = getStartOfDay(new Date());

  const relevant = transactions.filter(
    (transaction) => transaction.customerId === customer.id
  );

  const dueDates = relevant
    .map((transaction) => transaction.paymentDueDate)
    .filter((value): value is string => Boolean(value))
    .map((value) => getStartOfDay(value));

  if (dueDates.length === 0) {
    return "due";
  }

  const sortedDates = [...dueDates].sort((a, b) => a.getTime() - b.getTime());
  const upcomingDueDate = sortedDates.find((date) => date >= today);

  if (!upcomingDueDate) {
    return "overdue";
  }

  const diffDays = Math.round(
    (upcomingDueDate.getTime() - today.getTime()) / 86_400_000
  );

  if (diffDays < 0) {
    return "overdue";
  }

  if (diffDays === 0) {
    return "due";
  }

  if (diffDays <= 3) {
    return "warning";
  }

  return "due";
}

function mergeCustomers(primary: Customer[], fallback: Customer[]): Customer[] {
  const byKey = new Map<string, Customer>();

  primary.forEach((customer) => {
    const key = customer.id || customer.phoneNumber;
    if (key) {
      byKey.set(key, customer);
    }
  });

  fallback.forEach((customer) => {
    const key = customer.id || customer.phoneNumber;
    if (!key) return;

    const existing = byKey.get(key);

    if (!existing) {
      byKey.set(key, customer);
      return;
    }

    const hasNewerLocalBalance =
      customer.outstandingBalance > 0 || customer.totalCreditGiven > 0;

    byKey.set(key, {
      ...existing,
      ...customer,
      id: existing.id || customer.id,
      name: customer.name || existing.name,
      phoneNumber: customer.phoneNumber || existing.phoneNumber,
      notes: customer.notes || existing.notes,
      createdAt: customer.createdAt || existing.createdAt,
      outstandingBalance: hasNewerLocalBalance
        ? customer.outstandingBalance
        : existing.outstandingBalance,
      totalCreditGiven: hasNewerLocalBalance
        ? customer.totalCreditGiven
        : existing.totalCreditGiven,
      status: customer.status !== "nil" ? customer.status : existing.status,
    });
  });

  return Array.from(byKey.values());
}

export async function getCustomers(signal?: AbortSignal): Promise<Customer[]> {
  const localCustomers = getLocalCustomers();
  const localTransactions = getLocalTransactions();

  try {
    const payload = await apiFetch<unknown>("/api/customers", { signal });
    const apiCustomers = toArray(payload).map(normalizeCustomer);
    const mergedCustomers = mergeCustomers(apiCustomers, localCustomers);

    return mergedCustomers.map((customer) => ({
      ...customer,
      status: getCustomerStatus(customer, localTransactions),
    }));
  } catch {
    return localCustomers.map((customer) => ({
      ...customer,
      status: getCustomerStatus(customer, localTransactions),
    }));
  }
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
  const localTransactions = getLocalTransactions().filter(
    (transaction) => transaction.customerId === id
  );

  return apiFetch<unknown>(`/api/customers/${id}/transactions`, {
    signal,
  })
    .then((payload) =>
      toArray(payload).map(normalizeTransaction)
    )
    .then((apiTransactions) => {
      const mergedTransactions = [...localTransactions, ...apiTransactions];
      const unique = new Map<string, Transaction>();

      mergedTransactions.forEach((transaction) => {
        const key = transaction.id || `${transaction.customerId}-${transaction.createdAt}`;
        unique.set(key, transaction);
      });

      return Array.from(unique.values());
    })
    .catch(() => localTransactions);
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
  status?: CustomerStatus;
  outstandingBalance?: number;
  totalCreditGiven?: number;
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
