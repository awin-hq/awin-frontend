export type DebtorStatus = "due" | "overdue" | "paid";

export type Transaction = {
  id: string;
  item: string;
  amount: number;
  date: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  status: DebtorStatus;
  outstandingBalance: number;
  totalCreditGiven: number;
  transactions: Transaction[];
};
