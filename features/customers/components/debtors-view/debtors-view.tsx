"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, MoreVertical, Plus } from "lucide-react";

import { SegmentedTabs } from "@/components/dashboard/segmented-tabs";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DuePaymentsEmptyArt } from "@/components/dashboard/illustrations";
import { DebtorListItem } from "@/features/customers/components/debtor-list-item";

import type { Customer } from "@/services/types";

import styles from "./debtors-view.module.css";

const TABS = ["All", "Due Today", "Overdue", "Paid"] as const;

export function PaymentsView() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<string>("All");

  const [customers] = useState<Customer[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("awìn_customers");

    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesQuery =
        normalized.length === 0 ||
        customer.name.toLowerCase().includes(normalized) ||
        customer.phoneNumber.includes(normalized);

      if (!matchesQuery) return false;

      if (tab === "All") return true;

      if (tab === "Overdue") {
        return customer.status === "overdue";
      }

      if (tab === "Due Today") {
        return customer.status === "due";
      }

      if (tab === "Paid") {
        return customer.status === "paid";
      }

      return true;
    });
  }, [customers, query, tab]);

  return (
    <div className={styles.view}>

      {/* HEADER */}
      <header className={styles.header}>

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>

        <h1 className={styles.title}>Customers</h1>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="More options"
        >
          <MoreVertical size={22} />
        </button>

      </header>

      <div className={styles.body}>

        {/* SEARCH */}
        <div className={styles.searchBar}>
          <Search
            size={18}
            className={styles.searchIcon}
          />

          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search customers"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </div>

        {/* FILTERS */}
        <SegmentedTabs
          tabs={TABS}
          value={tab}
          onChange={setTab}
        />

        {/* CUSTOMER LIST */}
        {filtered.length > 0 ? (
          <div className={styles.list}>
            {filtered.map((customer) => (
              <DebtorListItem
                key={customer.id}
                customer={customer}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            layout="center"
            illustration={<DuePaymentsEmptyArt />}
            title="There are no customers yet"
          />
        )}

        {/* ADD CUSTOMER */}
        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/customers/add")
          }
          className="fixed bottom-24 left-1/2 z-30 flex h-14 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 text-base font-medium text-white shadow-lg hover:bg-orange-600"
        >
          <Plus size={20} />
          Add Customer
        </button>

      </div>
    </div>
  );
}