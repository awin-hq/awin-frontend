export type RecentCredit = {
  id: string;
  name: string;
  item: string;
  amount: number;
  date: string;
};

export type DashboardSummary = {
  ownerName: string;
  outstandingBalance: number;
  debtorCount: number;
  notificationCount: number;
  recentCredits: RecentCredit[];
};

/**
 * Placeholder dashboard data for the MVP UI. Replace with data from the
 * backend once the dashboard endpoint is available.
 */
export const DASHBOARD: DashboardSummary = {
  ownerName: "Chiege Peters",
  outstandingBalance: 80000,
  debtorCount: 20,
  notificationCount: 6,
  recentCredits: [
    {
      id: "1",
      name: "Simone Jackson",
      item: "Bags of Rice",
      amount: 5000,
      date: "July 10, 2026",
    },
    {
      id: "2",
      name: "Thomas Wright",
      item: "Canned Beans",
      amount: 3200,
      date: "July 12, 2026",
    },
    {
      id: "3",
      name: "Ursula Lee",
      item: "Palm Oil",
      amount: 7500,
      date: "July 13, 2026",
    },
  ],
};
