import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { ReminderBanner } from "@/features/dashboard/components/reminder-banner";
import { RecentCredits } from "@/features/dashboard/components/recent-credits";
import { DASHBOARD } from "@/features/dashboard/data";

import styles from "./home-view.module.css";

export function HomeView() {
  return (
    <div className={styles.view}>
      <DashboardHeader
        name={DASHBOARD.ownerName}
        notificationCount={DASHBOARD.notificationCount}
      />

      <div className={styles.body}>
        <BalanceCard
          balance={DASHBOARD.outstandingBalance}
          debtorCount={DASHBOARD.debtorCount}
        />

        <QuickActions />

        <ReminderBanner />

        <RecentCredits credits={DASHBOARD.recentCredits} />
      </div>
    </div>
  );
}
