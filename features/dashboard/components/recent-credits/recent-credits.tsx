import { Info } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatNaira } from "@/lib/format";

import styles from "./recent-credits.module.css";

export type RecentCredit = {
  id: string;
  name: string;
  item?: string;
  amount: number;
  date?: string;
};

type RecentCreditsProps = {
  credits: RecentCredit[];
};

export function RecentCredits({ credits }: RecentCreditsProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Recent Credits</h3>

      {credits.length > 0 ? (
        <ul className={styles.list}>
          {credits.map((credit) => (
            <li key={credit.id} className={styles.item}>
              <Avatar name={credit.name} />

              <div className={styles.info}>
                <span className={styles.name}>{credit.name}</span>
                {credit.item ? (
                  <span className={styles.meta}>{credit.item}</span>
                ) : null}
              </div>

              <div className={styles.right}>
                <span className={styles.amount}>
                  - {formatNaira(credit.amount, 2)} NGN
                </span>
                {credit.date ? (
                  <span className={styles.date}>{credit.date}</span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={<Info size={22} aria-hidden="true" />}
          title="There are no recent credits yet"
          description="Start by recording a credit sale for this customer."
        />
      )}
    </section>
  );
}
