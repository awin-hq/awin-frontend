import { Bell, Headphones } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";

import styles from "./dashboard-header.module.css";

type DashboardHeaderProps = {
  name: string;
  notificationCount?: number;
};

export function DashboardHeader({
  name,
  notificationCount = 0,
}: DashboardHeaderProps) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <Avatar name={name} size="lg" />

        <div className={styles.greeting}>
          <span className={styles.hello}>Hello, {firstName}</span>
          <span className={styles.tagline}>
            Never forget who owes you again
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Support"
        >
          <Headphones size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Notifications${
            notificationCount ? `, ${notificationCount} unread` : ""
          }`}
        >
          <Bell size={20} aria-hidden="true" />
          {notificationCount > 0 ? (
            <span className={styles.badge}>{notificationCount}</span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
