"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/forms/text-input/text-input";
import { PhoneInput } from "@/components/forms/phone-input/phone-input";
import { TextareaInput } from "@/components/forms/TextareaInput/TextareaInput";

import CustomerSuccess from "../CustomerSuccess";

import styles from "./add-customers-form.module.css";

export default function AddCustomersForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCustomer = {
      id: crypto.randomUUID(),
      name: fullName,
      phoneNumber,
      note,
      status: "due",
    };

    const existingCustomers = JSON.parse(
      localStorage.getItem("awìn_customers") || "[]"
    );

    localStorage.setItem(
      "awìn_customers",
      JSON.stringify([
        ...existingCustomers,
        newCustomer,
      ])
    );

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <CustomerSuccess
        customerName={fullName}
        onRecordCredit={() =>
        router.push(
          `/credit-sales/add?name=${encodeURIComponent(
            fullName
          )}&phone=${encodeURIComponent(phoneNumber)}`
        )
      }
      onViewCustomer={() =>
        router.push("/customers")
      }
      />
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        {/* Header */}
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
            <h1 className={styles.title}>Add Customers</h1>

            <p className={styles.subtitle}>
              Add a new customer to start recording credits and payments
            </p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder=""
            required
          />

          <div className={styles.phoneSection}>
            <PhoneInput
              label="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />

            <button
              type="button"
              className={styles.importButton}
            >
              Import from contacts
            </button>
          </div>

          <TextareaInput
            label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder=""
            required
          />

          <Button
            type="submit"
            className={styles.submitButton}
          >
            Save Customer
          </Button>
        </form>
      </main>
    </div>
  );
}