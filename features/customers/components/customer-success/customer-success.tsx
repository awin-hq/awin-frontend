"use client";

import { CheckCircle2, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import styles from "./customer-success.module.css";

type CustomerSuccessProps = {
  customerName: string;
  onRecordCredit: () => void;
  onViewCustomer: () => void;
};

export default function CustomerSuccess({
  customerName,
  onRecordCredit,
  onViewCustomer,
}: CustomerSuccessProps) {
  return (
    <div className={styles.page}>
      <button type="button" className={styles.backButton} aria-label="Go back">
        <ChevronLeft size={24} aria-hidden="true" />
      </button>

      <div className={styles.content}>
        <CheckCircle2 className={styles.icon} strokeWidth={2} />
        <h1 className={styles.title}>Customer Added Successfully</h1>
        <p className={styles.message}>
          {customerName} has been added to your customer list.
        </p>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          onClick={onRecordCredit}
          className={styles.primaryButton}
        >
          Record Credit
        </Button>
        <Button
          type="button"
          onClick={onViewCustomer}
          variant="outline"
          className={styles.secondaryButton}
        >
          View Customer
        </Button>
      </div>
    </div>
  );
}
