"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { TextInput } from "@/components/forms/text-input/text-input";
import { TextareaInput } from "@/components/forms/TextareaInput/TextareaInput";

import styles from "./RecordCreditForm.module.css";

type Props = {
  customerName: string;
  customerPhone: string;
  outstandingBalance: string;
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Save the credit information temporarily
    const credit = {
      itemDescription,
      amount,
      date,
      paymentDueDate,
      notes,
    };

    localStorage.setItem("awìn_credit", JSON.stringify(credit));

    // Go to success screen
    router.push("/dashboard/credit-sales/success");
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

          <h1 className={styles.title}>Record Credit</h1>
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
            <strong>{outstandingBalance}</strong>
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
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            placeholder="Type here"
            inputMode="decimal"
            required
          />

          <TextInput
            label="Date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            placeholder="Type here"
            required
          />

          <TextInput
            label="Payment Due Date"
            value={paymentDueDate}
            onChange={(e) =>
              setPaymentDueDate(e.target.value)
            }
            placeholder="Type here"
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