"use client";

import { useMemo, useState } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, MoreVertical } from "lucide-react";

import { useAsync } from "@/hooks/use-async";
import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DuePaymentsEmptyArt } from "@/components/dashboard/illustrations";
import { customersService } from "@/services";
import type { Customer } from "@/services/types";
=======
import { Search } from "lucide-react";

import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { PrimaryButton } from "@/components/buttons/primary-button";
import type { Customer } from "@/features/customers/types";
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
import { DebtorListItem } from "@/features/customers/components/debtor-list-item";

import styles from "./debtors-view.module.css";

<<<<<<< HEAD
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
=======
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
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
    </div>
  );
}
