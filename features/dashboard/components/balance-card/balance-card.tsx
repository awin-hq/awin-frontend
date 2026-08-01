"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { formatNaira } from "@/lib/format";

import styles from "./balance-card.module.css";

type BalanceCardProps = {
  balance: number;
  debtorCount: number;
};

export function BalanceCard({ balance, debtorCount }: BalanceCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className={styles.card}>
      <span className={styles.pattern} aria-hidden="true" />

      <div className={styles.top}>
        <p className={styles.label}>Total Outstanding balance:</p>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setRevealed((value) => !value)}
          aria-label={revealed ? "Hide balance" : "Show balance"}
          aria-pressed={revealed}
        >
          {revealed ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>

      <p className={styles.value}>
        {revealed ? formatNaira(balance) : "★★★★★★★"}
      </p>

      <p className={styles.debtors}>
        {revealed ? `${debtorCount} Debtors` : "••••••••••"}
      </p>
    </section>
  );
}
