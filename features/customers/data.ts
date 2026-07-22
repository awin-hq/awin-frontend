import type { Customer } from "./types";

/**
 * Placeholder customer data for the MVP UI. Replace with data from the
 * `/api/customers` endpoint once wired up.
 */
export const CUSTOMERS: Customer[] = [
  {
    id: "sandra",
    name: "Sandra",
    phone: "08192879936",
    status: "due",
    outstandingBalance: 0,
    totalCreditGiven: 0,
    transactions: [],
  },
  {
    id: "martins",
    name: "Martins",
    phone: "08192879936",
    status: "due",
    outstandingBalance: 12500,
    totalCreditGiven: 12500,
    transactions: [
      {
        id: "t1",
        item: "Bags of Rice",
        amount: 12500,
        date: "July 12, 2026",
      },
    ],
  },
  {
    id: "obi",
    name: "Obi",
    phone: "08192879936",
    status: "due",
    outstandingBalance: 5000,
    totalCreditGiven: 5000,
    transactions: [
      {
        id: "t1",
        item: "Cooking Oil",
        amount: 5000,
        date: "July 11, 2026",
      },
    ],
  },
  {
    id: "adefunke",
    name: "Adefunke",
    phone: "08192879936",
    status: "due",
    outstandingBalance: 7500,
    totalCreditGiven: 7500,
    transactions: [
      {
        id: "t1",
        item: "Canned Beans",
        amount: 7500,
        date: "July 10, 2026",
      },
    ],
  },
  {
    id: "ada-musa",
    name: "Ada Musa",
    phone: "08192879936",
    status: "due",
    outstandingBalance: 3200,
    totalCreditGiven: 3200,
    transactions: [
      {
        id: "t1",
        item: "Sugar",
        amount: 3200,
        date: "July 9, 2026",
      },
    ],
  },
];

export function getCustomer(id: string): Customer | undefined {
  return CUSTOMERS.find((customer) => customer.id === id);
}
