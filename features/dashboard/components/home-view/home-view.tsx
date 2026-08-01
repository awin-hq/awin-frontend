<<<<<<< HEAD
"use client";

import { useMemo } from "react";

import { useAsync } from "@/hooks/use-async";
import { getStoredMerchant } from "@/lib/session";
import { customersService, notificationsService } from "@/services";
import type { Customer } from "@/services/types";

=======
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { ReminderBanner } from "@/features/dashboard/components/reminder-banner";
<<<<<<< HEAD
import {
  RecentCredits,
  type RecentCredit,
} from "@/features/dashboard/components/recent-credits";

import styles from "./home-view.module.css";

type DashboardData = {
  customers: Customer[];
  unread: number;
  name: string;
};

async function loadDashboard(signal: AbortSignal): Promise<DashboardData> {
  const [customers, unread] = await Promise.all([
    customersService.getCustomers(signal).catch(() => [] as Customer[]),
    notificationsService.getUnreadCount(signal).catch(() => 0),
  ]);

  return {
    customers,
    unread,
    name: getStoredMerchant()?.firstName || "Chiege",
  };
}

export function HomeView() {
  const { data } = useAsync(loadDashboard, []);

  const outstandingBalance = useMemo(
    () =>
      (data?.customers ?? []).reduce(
        (sum, c) => sum + c.outstandingBalance,
        0
      ),
    [data]
  );

  const debtorCount = useMemo(
    () =>
      (data?.customers ?? []).filter((c) => c.outstandingBalance > 0).length,
    [data]
  );

  const recentCredits = useMemo<RecentCredit[]>(
    () =>
      (data?.customers ?? [])
        .filter((c) => c.outstandingBalance > 0 || c.totalCreditGiven > 0)
        .slice(0, 4)
        .map((c) => ({
          id: c.id,
          name: c.name,
          item: c.notes,
          amount: c.outstandingBalance || c.totalCreditGiven,
        })),
    [data]
  );

  return (
    <div className={styles.view}>
      <DashboardHeader
        name={data?.name ?? "Chiege"}
        notificationCount={data?.unread ?? 0}
=======
import { RecentCredits } from "@/features/dashboard/components/recent-credits";
import { DASHBOARD } from "@/features/dashboard/data";

import styles from "./home-view.module.css";

export function HomeView() {
  return (
    <div className={styles.view}>
      <DashboardHeader
        name={DASHBOARD.ownerName}
        notificationCount={DASHBOARD.notificationCount}
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      />

      <div className={styles.body}>
        <BalanceCard
<<<<<<< HEAD
          balance={outstandingBalance}
          debtorCount={debtorCount}
=======
          balance={DASHBOARD.outstandingBalance}
          debtorCount={DASHBOARD.debtorCount}
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
        />

        <QuickActions />

        <ReminderBanner />

<<<<<<< HEAD
        <RecentCredits credits={recentCredits} />
=======
        <RecentCredits credits={DASHBOARD.recentCredits} />
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      </div>
    </div>
  );
}
