"use client";

<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { ChevronLeft, CalendarDays } from "lucide-react";

import { useAsync } from "@/hooks/use-async";
import { EmptyState } from "@/components/dashboard/empty-state";
import { WeeklySummaryEmptyArt } from "@/components/dashboard/illustrations";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { formatNaira } from "@/lib/format";
import { notificationsService } from "@/services";

import styles from "./credit-summary-view.module.css";

export function CreditSummaryView() {
  const router = useRouter();

  const { data, loading } = useAsync(
    (signal) =>
      notificationsService.getWeeklySummary(signal).catch(() => ({
        totalCredit: 0,
        totalPayments: 0,
        transactionCount: 0,
        hasActivity: false,
        raw: null,
      })),
    []
  );
=======
import { useState } from "react";
import { Menu } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { PrimaryButton } from "@/components/buttons/primary-button";

import styles from "./credit-summary-view.module.css";

const TABS = ["Due Today", "Overdue Payments", "Weekly Summary"] as const;

type CreditSummaryViewProps = {
  ownerName: string;
};

export function CreditSummaryView({ ownerName }: CreditSummaryViewProps) {
  const [tab, setTab] = useState<string>("Weekly Summary");
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <button
          type="button"
<<<<<<< HEAD
          className={styles.iconButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <h1 className={styles.title}>Weekly Summary</h1>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Pick week"
        >
          <CalendarDays size={20} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.body}>
        {loading ? (
          <p className={styles.loading}>Loading summary…</p>
        ) : data?.hasActivity ? (
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Credit given</span>
              <span className={styles.statValue}>
                {formatNaira(data.totalCredit)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Payments received</span>
              <span className={styles.statValue}>
                {formatNaira(data.totalPayments)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Transactions</span>
              <span className={styles.statValue}>
                {data.transactionCount}
              </span>
            </div>
          </div>
        ) : (
          <EmptyState
            layout="center"
            illustration={<WeeklySummaryEmptyArt />}
            title="No activity this week"
            description="Start recording credit sales and payments to see your weekly business summary"
            action={
              <PrimaryButton
                type="button"
                onClick={() => router.push("/customers")}
              >
                Record Credit Sale
              </PrimaryButton>
            }
          />
        )}
=======
          className={styles.menuButton}
          aria-label="Open menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div className={styles.user}>
          <span className={styles.name}>{ownerName}</span>
          <Avatar name={ownerName} size="md" />
        </div>
      </header>

      <div className={styles.body}>
        <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />

        <div className={styles.placeholder} role="status">
          <span className={styles.placeholderText}>
            No {tab.toLowerCase()} to show yet.
          </span>
        </div>

        <div className={styles.action}>
          <PrimaryButton type="button">Add Credit</PrimaryButton>
        </div>
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      </div>
    </div>
  );
}
