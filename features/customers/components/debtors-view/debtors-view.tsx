"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, MoreVertical } from "lucide-react";

import { useAsync } from "@/hooks/use-async";
import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DuePaymentsEmptyArt } from "@/components/dashboard/illustrations";
import { customersService } from "@/services";
import type { Customer } from "@/services/types";
import { DebtorListItem } from "@/features/customers/components/debtor-list-item";

import styles from "./debtors-view.module.css";

const TABS = ["Due Today", "Overdue"] as const;

export function PaymentsView() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>(TABS[0]);

  const { data, loading } = useAsync(
    (signal) =>
      customersService.getCustomers(signal).catch(() => [] as Customer[]),
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const wanted = tab === "Overdue" ? "overdue" : "due";

    return (data ?? []).filter((customer) => {
      const matchesTab = customer.status === wanted;
      const matchesQuery =
        normalized.length === 0 ||
        customer.name.toLowerCase().includes(normalized) ||
        customer.phoneNumber.includes(normalized);

      return matchesTab && matchesQuery;
    });
  }, [data, query, tab]);

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <h1 className={styles.title}>Payments</h1>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="More options"
        >
          <MoreVertical size={22} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.body}>
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

        {loading ? (
          <p className={styles.loading}>Loading payments…</p>
        ) : filtered.length > 0 ? (
          <div className={styles.list}>
            {filtered.map((customer) => (
              <DebtorListItem key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <EmptyState
            layout="center"
            illustration={<DuePaymentsEmptyArt />}
            title={
              tab === "Overdue"
                ? "There are no overdue payments"
                : "There are no due payments"
            }
          />
        )}
      </div>
    </div>
  );
}
