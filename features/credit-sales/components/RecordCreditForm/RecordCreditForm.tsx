"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { TextInput } from "@/components/forms/text-input/text-input";
import { TextareaInput } from "@/components/forms/TextareaInput/TextareaInput";
import { formatNaira, toNumber } from "@/lib/format";
import { customersService, transactionsService } from "@/services";

import styles from "./RecordCreditForm.module.css";

type Props = {
  customerName: string;
  customerPhone: string;
  outstandingBalance: number | string;
};

export default function RecordCreditForm({
  customerName,
  customerPhone,
  outstandingBalance,
}: Props) {
  const router = useRouter();

  const [itemDescription, setItemDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const currentBalance = toNumber(outstandingBalance);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const creditAmount = toNumber(amount);

    if (!itemDescription || !date || !paymentDueDate || creditAmount <= 0) {
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const formattedDueDate = new Date(paymentDueDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const creditRecord = {
      id: crypto.randomUUID(),
      name: customerName,
      item: itemDescription,
      amount: creditAmount,
      date: formattedDate,
      paymentDueDate: formattedDueDate,
      notes,
    };

    const savedCredits = JSON.parse(
      localStorage.getItem("awìn_recent_credits") || "[]"
    );

    localStorage.setItem(
      "awìn_recent_credits",
      JSON.stringify([creditRecord, ...savedCredits].slice(0, 5))
    );

    const existingCustomers = JSON.parse(
      localStorage.getItem("awìn_customers") || "[]"
    );
    const storedCustomers = Array.isArray(existingCustomers)
      ? existingCustomers
      : [];

    let matchedCustomer = false;
    let customerId: string | undefined;
    let updatedBalance = creditAmount;
    let updatedTotal = creditAmount;

    const updatedCustomers = storedCustomers.map((customer) => {
      const customerRecord = customer as Record<string, unknown>;
      const isMatch =
        customerRecord.phoneNumber === customerPhone ||
        customerRecord.name === customerName;

      if (!isMatch) {
        return customer;
      }

      matchedCustomer = true;
      customerId = String(customerRecord.id ?? "");

      const previousBalance = toNumber(customerRecord.outstandingBalance);
      const previousTotal = toNumber(customerRecord.totalCreditGiven);
      updatedBalance = previousBalance + creditAmount;
      updatedTotal = previousTotal + creditAmount;

      return {
        ...customerRecord,
        outstandingBalance: updatedBalance,
        totalCreditGiven: updatedTotal,
        status: updatedBalance > 0 ? "due" : "paid",
      };
    });

    if (!matchedCustomer) {
      customerId = crypto.randomUUID();
      updatedCustomers.push({
        id: customerId,
        name: customerName,
        phoneNumber: customerPhone,
        notes: "",
        status: "due",
        outstandingBalance: creditAmount,
        totalCreditGiven: creditAmount,
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("awìn_customers", JSON.stringify(updatedCustomers));

    const transactionRecord = {
      id: crypto.randomUUID(),
      customerId,
      type: "credit" as const,
      amount: creditAmount,
      description: itemDescription,
      paymentDueDate: new Date(paymentDueDate).toISOString(),
      createdAt: new Date().toISOString(),
    };

    const savedTransactions = JSON.parse(
      localStorage.getItem("awìn_transactions") || "[]"
    );
    const validTransactions = Array.isArray(savedTransactions)
      ? savedTransactions
      : [];

    localStorage.setItem(
      "awìn_transactions",
      JSON.stringify([transactionRecord, ...validTransactions].slice(0, 20))
    );

    if (customerId) {
      try {
        await transactionsService.createTransaction({
          customerId,
          type: "credit",
          amount: creditAmount,
          paymentDueDate: new Date(paymentDueDate).toISOString(),
        });

        if (matchedCustomer) {
          await customersService.updateCustomer(customerId, {
            outstandingBalance: updatedBalance,
            totalCreditGiven: updatedTotal,
            status: updatedBalance > 0 ? "due" : "paid",
          });
        }
      } catch {
        // Backend unavailable; keep local transaction copy.
      }
    }

    window.dispatchEvent(new Event("awìn:data-updated"));
    router.push("/credit-sales/success");
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>

        {/* HEADER */}
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={24} strokeWidth={1.8} />
          </button>

          <div>
            <h1 className={styles.title}>Record Credit</h1>
            <p className={styles.subtitle}>
              Enter the transaction details and save credit for this customer.
            </p>
          </div>
        </header>

        {/* CUSTOMER SUMMARY */}
        <section className={styles.customerCard}>
          <div className={styles.customerInfo}>
            <div className={styles.avatar}>
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div className={styles.customerDetails}>
              <p className={styles.customerName}>
                {customerName}
              </p>

              <p className={styles.customerPhone}>
                {customerPhone}
              </p>
            </div>
          </div>

          <div className={styles.balance}>
            <p>Outstanding balance</p>
            <strong>{formatNaira(currentBalance)}</strong>
          </div>
        </section>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <TextareaInput
            label="Item Description"
            value={itemDescription}
            onChange={(e) =>
              setItemDescription(e.target.value)
            }
            placeholder="Type here"
            required
          />

          <TextInput
            label="Amount"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            placeholder="0.00"
            required
          />

          <TextInput
            label="Date"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />

          <TextInput
            label="Payment Due Date"
            type="date"
            value={paymentDueDate}
            onChange={(e) =>
              setPaymentDueDate(e.target.value)
            }
            required
          />

          <TextareaInput
            label="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            placeholder="Type here"
          />

          <button
            type="submit"
            className={styles.submitButton}
          >
            Record Credit
          </button>
        </form>
      </main>
    </div>
  );
}