"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreVertical, Info } from "lucide-react";

import { useAsync } from "@/hooks/use-async";
import { Avatar } from "@/components/dashboard/avatar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatNaira } from "@/lib/format";
import { customersService } from "@/services";
import type { Customer, Transaction } from "@/services/types";

import styles from "./customer-profile.module.css";

type ProfileData = {
  customer: Customer | undefined;
  transactions: Transaction[];
};

const STATUS_LABEL: Record<Customer["status"], string> = {
  due: "Due",
  overdue: "Overdue",
  paid: "Paid",
  nil: "Nil",
};

type CustomerProfileProps = {
  customerId: string;
};

export function CustomerProfile({ customerId }: CustomerProfileProps) {
  const router = useRouter();

  const { data, loading } = useAsync<ProfileData>(
    async (signal) => {
      const [customer, transactions] = await Promise.all([
        customersService.getCustomer(customerId, signal).catch(() => undefined),
        customersService
          .getCustomerTransactions(customerId, signal)
          .catch(() => [] as Transaction[]),
      ]);

      return { customer, transactions };
    },
    [customerId]
  );

  const customer = data?.customer;
  const transactions = data?.transactions ?? [];

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

      {loading ? (
        <p className={styles.loading}>Loading customer…</p>
      ) : !customer ? (
        <p className={styles.loading}>Couldn&apos;t load this customer.</p>
      ) : (
        <>
          <section className={styles.identity}>
            <Avatar
              name={customer.name}
              size="xl"
              color="var(--color-primary)"
            />
            <h2 className={styles.name}>{customer.name}</h2>
            <p className={styles.phone}>{customer.phoneNumber}</p>
          </section>

          <section className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Outstanding balance</span>
            <span className={styles.balanceValue}>
              {formatNaira(customer.outstandingBalance, 2)}
            </span>
          </section>

          <section className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Credit Given</span>
              <span className={styles.statValue}>{transactions.length}</span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Credit Given</span>
              <span className={`${styles.statValue} ${styles.statAmount}`}>
                {formatNaira(customer.totalCreditGiven, 2)}
              </span>
            </div>
          </section>

          <section className={styles.statusRow}>
            <div className={styles.statusInfo}>
              <span className={styles.statusLabel}>Status</span>
              <span className={styles.statusValue}>
                {STATUS_LABEL[customer.status]}
              </span>
            </div>

            <button type="button" className={styles.changeStatus}>
              Change Status
            </button>
          </section>

          <section className={styles.transactions}>
            <h3 className={styles.sectionTitle}>Recent Transactions</h3>

            {transactions.length > 0 ? (
              <ul className={styles.txList}>
                {transactions.map((tx) => (
                  <li key={tx.id} className={styles.txItem}>
                    <div className={styles.txInfo}>
                      <span className={styles.txItemName}>
                        {tx.description || (tx.type === "payment" ? "Payment" : "Credit")}
                      </span>
                      {tx.createdAt ? (
                        <span className={styles.txDate}>
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </span>
                      ) : null}
                    </div>
                    <span className={styles.txAmount}>
                      {formatNaira(tx.amount, 2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<Info size={22} aria-hidden="true" />}
                title="No transactions yet"
                description="Start by recording a credit sale for this customer."
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
