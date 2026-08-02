export type ApiEnvelope<T> = {
  status?: string;
  message?: string;
  data?: T;
};

export type Merchant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type AuthResult = {
  token: string | null;
  merchant: Merchant | null;
  message?: string;
};

export type TransactionType = "credit" | "payment";

export type Transaction = {
  id: string;
  customerId?: string;
  type: TransactionType;
  amount: number;
  description?: string;
  paymentDueDate?: string;
  createdAt?: string;
};

export type CustomerStatus = "due" | "warning" | "overdue" | "paid" | "nil";

export type Customer = {
  id: string;
  name: string;
  phoneNumber: string;
  notes?: string;
  outstandingBalance: number;
  totalCreditGiven: number;
  status: CustomerStatus;
  createdAt?: string;
};

export type WeeklySummary = {
  totalCredit: number;
  totalPayments: number;
  transactionCount: number;
  hasActivity: boolean;
  raw: unknown;
};
