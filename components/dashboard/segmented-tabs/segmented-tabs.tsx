"use client";

import styles from "./segmented-tabs.module.css";

type SegmentedTabsProps = {
  tabs: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function SegmentedTabs({
  tabs,
  value,
  onChange,
}: SegmentedTabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab === value;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
