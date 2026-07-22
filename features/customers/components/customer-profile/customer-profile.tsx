"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreVertical, Info } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { formatNaira } from "@/lib/format";
import type { Customer } from "@/features/customers/types";

import styles from "./customer-profile.module.css";

type CustomerProfileProps = {
  customer: Customer;
};

export function CustomerProfile({ customer }: CustomerProfileProps) {
  const router = useRouter();

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <h1 className={styles.title}>Customer Profile</h1>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="More options"
        >
          <MoreVertical size={22} aria-hidden="true" />
        </button>
      </header>

      <section className={styles.identity}>
        <Avatar name={customer.name} size="xl" />
        <h2 className={styles.name}>{customer.name}</h2>
        <p className={styles.phone}>{customer.phone}</p>
      </section>

      <section className={styles.balanceCard}>
        <span className={styles.balanceLabel}>Outstanding balance</span>
        <span className={styles.balanceValue}>
          {formatNaira(customer.outstandingBalance, 2)}
        </span>
      </section>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Credits</span>
          <span className={styles.statValue}>
            {customer.transactions.length}
          </span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Credit Given</span>
          <span className={`${styles.statValue} ${styles.statAmount}`}>
            {formatNaira(customer.totalCreditGiven, 2)}
          </span>
        </div>
      </section>

      <section className={styles.transactions}>
        <h3 className={styles.sectionTitle}>Recent Transactions</h3>

        {customer.transactions.length > 0 ? (
          <ul className={styles.txList}>
            {customer.transactions.map((tx) => (
              <li key={tx.id} className={styles.txItem}>
                <div className={styles.txInfo}>
                  <span className={styles.txItemName}>{tx.item}</span>
                  <span className={styles.txDate}>{tx.date}</span>
                </div>
                <span className={styles.txAmount}>
                  {formatNaira(tx.amount, 2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyCard}>
            <Info
              size={22}
              className={styles.emptyIcon}
              aria-hidden="true"
            />
            <div>
              <p className={styles.emptyTitle}>No transactions yet</p>
              <p className={styles.emptyText}>
                Start by recording a credit sale for this customer.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
