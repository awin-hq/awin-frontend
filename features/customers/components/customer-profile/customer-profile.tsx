"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreVertical, Info } from "lucide-react";

import { useAsync } from "@/hooks/use-async";
import { Avatar } from "@/components/dashboard/avatar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatNaira, toNumber } from "@/lib/format";
import { customersService, transactionsService } from "@/services";
import type { Customer, Transaction } from "@/services/types";

import styles from "./customer-profile.module.css";

type ProfileData = {
  customer: Customer | undefined;
  transactions: Transaction[];
};

const STATUS_LABEL: Record<Customer["status"], string> = {
  due: "Due",
  warning: "Due Soon",
  overdue: "Overdue",
  paid: "Paid",
  nil: "Nil",
};

type CustomerProfileProps = {
  customerId: string;
};

export function CustomerProfile({ customerId }: CustomerProfileProps) {
  const router = useRouter();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [isInitialPayment, setIsInitialPayment] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data, loading, reload } = useAsync<ProfileData>(
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

  async function handlePaymentSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!customer) return;

    const amount = toNumber(paymentAmount);

    if (amount <= 0) return;

    setSubmitting(true);
    setFeedback(null);

    const paymentDateValue = paymentDate || new Date().toISOString().slice(0, 10);
    const transactionRecord = {
      id: crypto.randomUUID(),
      customerId: customer.id,
      type: "payment" as const,
      amount,
      description: isInitialPayment ? "Initial payment" : "Repayment",
      createdAt: new Date().toISOString(),
    };

    const existingTransactions = JSON.parse(
      localStorage.getItem("awìn_transactions") || "[]"
    );
    const storedTransactions = Array.isArray(existingTransactions)
      ? existingTransactions
      : [];

    localStorage.setItem(
      "awìn_transactions",
      JSON.stringify([transactionRecord, ...storedTransactions].slice(0, 20))
    );

    const existingCustomers = JSON.parse(
      localStorage.getItem("awìn_customers") || "[]"
    );
    const storedCustomers = Array.isArray(existingCustomers)
      ? existingCustomers
      : [];

    const updatedBalance = Math.max(
      0,
      toNumber(customer.outstandingBalance) - amount
    );

    const updatedCustomers = storedCustomers.map((entry: Record<string, unknown>) => {
      if (entry.id !== customer.id) return entry;

      return {
        ...entry,
        outstandingBalance: updatedBalance,
        status: updatedBalance > 0 ? "due" : "paid",
      };
    });

    localStorage.setItem("awìn_customers", JSON.stringify(updatedCustomers));

    try {
      await transactionsService.createTransaction({
        customerId: customer.id,
        type: "payment",
        amount,
        paymentDueDate: new Date(paymentDateValue).toISOString(),
      });

      await customersService.updateCustomer(customer.id, {
        outstandingBalance: updatedBalance,
        status: updatedBalance > 0 ? "due" : "paid",
      });
    } catch {
      // Keep the local update even if the backend is unavailable.
    }

    window.dispatchEvent(new Event("awìn:data-updated"));
    setPaymentAmount("");
    setPaymentDate(new Date().toISOString().slice(0, 10));
    setIsInitialPayment(false);
    setFeedback(isInitialPayment ? "Initial payment recorded." : "Repayment recorded.");
    setSubmitting(false);
    reload();
  }

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

            <div className={styles.statusActions}>
              <button
                type="button"
                className={styles.repayButton}
                onClick={async () => {
                  if (!customer) return;

                  setSubmitting(true);
                  setFeedback(null);

                  const paymentDateValue = new Date().toISOString().slice(0, 10);
                  const transactionRecord = {
                    id: crypto.randomUUID(),
                    customerId: customer.id,
                    type: "payment" as const,
                    amount: toNumber(customer.outstandingBalance),
                    description: "Full repayment",
                    createdAt: new Date().toISOString(),
                  };

                  const existingTransactions = JSON.parse(
                    localStorage.getItem("awìn_transactions") || "[]"
                  );
                  const storedTransactions = Array.isArray(existingTransactions)
                    ? existingTransactions
                    : [];

                  localStorage.setItem(
                    "awìn_transactions",
                    JSON.stringify([transactionRecord, ...storedTransactions].slice(0, 20))
                  );

                  const existingCustomers = JSON.parse(
                    localStorage.getItem("awìn_customers") || "[]"
                  );
                  const storedCustomers = Array.isArray(existingCustomers)
                    ? existingCustomers
                    : [];

                  const updatedCustomers = storedCustomers.map((entry: Record<string, unknown>) => {
                    if (entry.id !== customer.id) return entry;

                    return {
                      ...entry,
                      outstandingBalance: 0,
                      status: "paid",
                    };
                  });

                  localStorage.setItem("awìn_customers", JSON.stringify(updatedCustomers));

                  try {
                    await transactionsService.createTransaction({
                      customerId: customer.id,
                      type: "payment",
                      amount: toNumber(customer.outstandingBalance),
                      paymentDueDate: new Date(paymentDateValue).toISOString(),
                    });

                    await customersService.updateCustomer(customer.id, {
                      outstandingBalance: 0,
                      status: "paid",
                    });
                  } catch {
                    // Keep the local update even if the backend is unavailable.
                  }

                  window.dispatchEvent(new Event("awìn:data-updated"));
                  setFeedback("Customer marked as repaid.");
                  setSubmitting(false);
                  reload();
                }}
              >
                {submitting ? "Saving..." : "Mark as repaid"}
              </button>
              <span className={`${styles.statusValue} ${styles[customer.status] || styles.nil}`}>
                {STATUS_LABEL[customer.status]}
              </span>
            </div>
          </section>

          <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
            <h3 className={styles.sectionTitle}>Record repayment</h3>
            <label className={styles.fieldLabel} htmlFor="payment-amount">
              Amount
            </label>
            <input
              id="payment-amount"
              className={styles.input}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={paymentAmount}
              onChange={(event) => setPaymentAmount(event.target.value)}
              placeholder="0.00"
              required
            />

            <label className={styles.fieldLabel} htmlFor="payment-date">
              Date
            </label>
            <input
              id="payment-date"
              className={styles.input}
              type="date"
              value={paymentDate}
              onChange={(event) => setPaymentDate(event.target.value)}
              required
            />

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={isInitialPayment}
                onChange={(event) => setIsInitialPayment(event.target.checked)}
              />
              <span>Initial payment</span>
            </label>

            {feedback ? <p className={styles.feedback}>{feedback}</p> : null}

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? "Saving..." : "Save payment"}
            </button>
          </form>

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
