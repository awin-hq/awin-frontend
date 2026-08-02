"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/forms/text-input/text-input";
import { PhoneInput } from "@/components/forms/phone-input/phone-input";
import { TextareaInput } from "@/components/forms/TextareaInput/TextareaInput";
import { toNumber } from "@/lib/format";
import { customersService } from "@/services";

import styles from "./add-customers-form.module.css";

export default function AddCustomersForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedPhone = phoneNumber.trim();
    const trimmedNote = note.trim();

    const newCustomer = {
      id: crypto.randomUUID(),
      name: trimmedName,
      phoneNumber: trimmedPhone,
      notes: trimmedNote,
      status: "due",
      outstandingBalance: 0,
      totalCreditGiven: 0,
      createdAt: new Date().toISOString(),
    };

    const existingCustomers = JSON.parse(
      localStorage.getItem("awìn_customers") || "[]"
    );

    const storedCustomers = Array.isArray(existingCustomers)
      ? existingCustomers
      : [];
    const updatedCustomers = [...storedCustomers, newCustomer];

    localStorage.setItem("awìn_customers", JSON.stringify(updatedCustomers));

    try {
      const createdCustomer = await customersService.addCustomer({
        name: trimmedName,
        phoneNumber: trimmedPhone,
      });

      const customerToStore = {
        ...newCustomer,
        ...createdCustomer,
        id: createdCustomer?.id || newCustomer.id,
        name: createdCustomer?.name || trimmedName,
        phoneNumber: createdCustomer?.phoneNumber || trimmedPhone,
        notes: createdCustomer?.notes || trimmedNote,
        outstandingBalance: toNumber(createdCustomer?.outstandingBalance),
        totalCreditGiven: toNumber(createdCustomer?.totalCreditGiven),
        status: createdCustomer?.status || "due",
        createdAt: createdCustomer?.createdAt || newCustomer.createdAt,
      };

      updatedCustomers[updatedCustomers.length - 1] = customerToStore;
      localStorage.setItem("awìn_customers", JSON.stringify(updatedCustomers));
    } catch {
      // Keep using local storage if the backend is unavailable.
    }

    window.dispatchEvent(new Event("awìn:data-updated"));

    router.push(
      `/credit-sales/add?name=${encodeURIComponent(trimmedName)}&phone=${encodeURIComponent(
        trimmedPhone
      )}`
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