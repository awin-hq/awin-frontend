"use client";

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

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <button
          type="button"
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
          <>
            <section className={styles.summaryIntro}>
              <div>
                <p className={styles.summaryLabel}>This week</p>
                <h2 className={styles.summaryTitle}>
                  Your business snapshot
                </h2>
              </div>
              <span className={styles.summaryTag}>Updated in real time</span>
            </section>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Credit given</span>
                <span className={styles.statValue}>
                  {formatNaira(data.totalCredit)}
                </span>
                <p className={styles.statHint}>
                  Total credit issued in the last 7 days.
                </p>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Payments received</span>
                <span className={styles.statValue}>
                  {formatNaira(data.totalPayments)}
                </span>
                <p className={styles.statHint}>
                  Payments collected from customers this week.
                </p>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Transactions</span>
                <span className={styles.statValue}>
                  {data.transactionCount}
                </span>
                <p className={styles.statHint}>
                  Credit or payment entries recorded.
                </p>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            layout="center"
            illustration={<WeeklySummaryEmptyArt />}
            title="No activity this week"
            description="Record credit sales or payments to populate your weekly summary."
            action={
              <PrimaryButton
                type="button"
                onClick={() => router.push("/credit-sales/add")}
              >
                Record Credit Sale
              </PrimaryButton>
            }
          />
        )}
      </div>
    </div>
  );
}
