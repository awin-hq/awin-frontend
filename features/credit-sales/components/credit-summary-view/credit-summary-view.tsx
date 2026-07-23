"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { PrimaryButton } from "@/components/buttons/primary-button";

import styles from "./credit-summary-view.module.css";

const TABS = ["Due Today", "Overdue Payments", "Weekly Summary"] as const;

type CreditSummaryViewProps = {
  ownerName: string;
};

export function CreditSummaryView({ ownerName }: CreditSummaryViewProps) {
  const [tab, setTab] = useState<string>("Weekly Summary");

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        <div className={styles.user}>
          <span className={styles.name}>{ownerName}</span>
          <Avatar name={ownerName} size="md" />
        </div>
      </header>

      <div className={styles.body}>
        <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />

        <div className={styles.placeholder} role="status">
          <span className={styles.placeholderText}>
            No {tab.toLowerCase()} to show yet.
          </span>
        </div>

        <div className={styles.action}>
          <PrimaryButton type="button">Add Credit</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
