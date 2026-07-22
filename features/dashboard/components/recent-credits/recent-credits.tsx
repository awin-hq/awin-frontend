import { Avatar } from "@/components/dashboard/avatar";
import { formatNaira } from "@/lib/format";
import type { RecentCredit } from "@/features/dashboard/data";

import styles from "./recent-credits.module.css";

type RecentCreditsProps = {
  credits: RecentCredit[];
};

export function RecentCredits({ credits }: RecentCreditsProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Recent Credits</h3>

      <ul className={styles.list}>
        {credits.map((credit) => (
          <li key={credit.id} className={styles.item}>
            <Avatar name={credit.name} />

            <div className={styles.info}>
              <span className={styles.name}>{credit.name}</span>
              <span className={styles.meta}>{credit.item}</span>
            </div>

            <div className={styles.right}>
              <span className={styles.amount}>
                - {formatNaira(credit.amount, 2)} NGN
              </span>
              <span className={styles.date}>{credit.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
