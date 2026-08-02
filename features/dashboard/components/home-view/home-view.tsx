"use client";

import { useMemo } from "react";

import { useAsync } from "@/hooks/use-async";
import { getStoredMerchant } from "@/lib/session";
import { customersService, notificationsService } from "@/services";
import type { Customer } from "@/services/types";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { ReminderBanner } from "@/features/dashboard/components/reminder-banner";

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

  return (
    <div className={styles.view}>
      <DashboardHeader
        name={data?.name ?? "Chiege"}
        notificationCount={data?.unread ?? 0}
      />

      <div className={styles.body}>
        <BalanceCard
          balance={outstandingBalance}
          debtorCount={debtorCount}
        />

        <QuickActions />

        <ReminderBanner />
      </div>
    </div>
  );
}
