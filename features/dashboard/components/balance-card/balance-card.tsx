import { formatNaira } from "@/lib/format";

import styles from "./balance-card.module.css";

type BalanceCardProps = {
  balance: number;
  debtorCount: number;
};

export function BalanceCard({ balance, debtorCount }: BalanceCardProps) {
  return (
    <section className={styles.card}>
      <p className={styles.label}>Total Outstanding Balance:</p>
      <p className={styles.value}>{formatNaira(balance)}</p>
      <p className={styles.debtors}>{debtorCount} Debtors</p>

      <span className={styles.pattern} aria-hidden="true" />
    </section>
  );
}
