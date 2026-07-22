import { Bell, MessageSquare } from "lucide-react";

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
  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <Avatar name={name} size="md" />
        <span className={styles.name}>{name}</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Messages${
            notificationCount ? `, ${notificationCount} unread` : ""
          }`}
        >
          <MessageSquare size={20} aria-hidden="true" />
          {notificationCount > 0 ? (
            <span className={styles.badge}>{notificationCount}</span>
          ) : null}
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <Bell size={20} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
