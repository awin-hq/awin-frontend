"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { PrimaryButton } from "@/components/buttons/primary-button";
import type { Customer } from "@/features/customers/types";
import { DebtorListItem } from "@/features/customers/components/debtor-list-item";

import styles from "./debtors-view.module.css";

const TABS = ["Due Today", "Overdue Payments", "Weekly Summary"] as const;

type DebtorsViewProps = {
  customers: Customer[];
};

export function DebtorsView({ customers }: DebtorsViewProps) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>(TABS[0]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesTab =
        tab === "Overdue Payments"
          ? customer.status === "overdue"
          : tab === "Weekly Summary"
            ? true
            : customer.status === "due";

      const matchesQuery =
        normalized.length === 0 ||
        customer.name.toLowerCase().includes(normalized) ||
        customer.phone.includes(normalized);

      return matchesTab && matchesQuery;
    });
  }, [customers, query, tab]);

  return (
    <div className={styles.view}>
      <div className={styles.searchBar}>
        <Search
          size={18}
          className={styles.searchIcon}
          aria-hidden="true"
        />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search customers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search customers"
        />
      </div>

      <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((customer) => (
            <DebtorListItem key={customer.id} customer={customer} />
          ))
        ) : (
          <p className={styles.empty}>No customers to show here yet.</p>
        )}
      </div>

      <div className={styles.action}>
        <PrimaryButton type="button">Add Credit</PrimaryButton>
      </div>
    </div>
  );
}
