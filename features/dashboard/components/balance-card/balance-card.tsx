"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { formatNaira, toNumber } from "@/lib/format";

import styles from "./balance-card.module.css";

type BalanceCardProps = {
  balance: number;
  debtorCount: number;
};

export function BalanceCard({
  balance,
  debtorCount,
}: BalanceCardProps) {
  const [revealed, setRevealed] = useState(false);
  const safeBalance = toNumber(balance);

  function toggleReveal() {
    setRevealed((current) => !current);
  }

  return (
    <section
      className={styles.card}
      aria-label="Outstanding balance"
    >
      <div
        className={styles.pattern}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <p className={styles.label}>
          Total Outstanding balance:
        </p>

        <div className={styles.balanceRow}>
          <p className={styles.value}>
            {revealed
              ? formatNaira(safeBalance)
              : "••••••••"}
          </p>

          <button
            type="button"
            className={styles.toggle}
            onClick={toggleReveal}
            aria-label={
              revealed
                ? "Hide balance"
                : "Show balance"
            }
            aria-pressed={revealed}
          >
            {revealed ? (
              <EyeOff
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            ) : (
              <Eye
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        <p className={styles.debtors}>
          {revealed
            ? `${debtorCount} Debtors`
            : "••••••••••••"}
        </p>
      </div>
    </section>
  );
}