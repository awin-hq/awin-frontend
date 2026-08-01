<<<<<<< HEAD
import { Bell, Headphones } from "lucide-react";
=======
import { Bell, MessageSquare } from "lucide-react";
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf

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
<<<<<<< HEAD
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
=======
  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <Avatar name={name} size="md" />
        <span className={styles.name}>{name}</span>
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
<<<<<<< HEAD
          aria-label="Support"
        >
          <Headphones size={20} aria-hidden="true" />
=======
          aria-label={`Messages${
            notificationCount ? `, ${notificationCount} unread` : ""
          }`}
        >
          <MessageSquare size={20} aria-hidden="true" />
          {notificationCount > 0 ? (
            <span className={styles.badge}>{notificationCount}</span>
          ) : null}
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
        </button>

        <button
          type="button"
          className={styles.iconButton}
<<<<<<< HEAD
          aria-label={`Notifications${
            notificationCount ? `, ${notificationCount} unread` : ""
          }`}
        >
          <Bell size={20} aria-hidden="true" />
          {notificationCount > 0 ? (
            <span className={styles.badge}>{notificationCount}</span>
          ) : null}
=======
          aria-label="Notifications"
        >
          <Bell size={20} aria-hidden="true" />
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
        </button>
      </div>
    </header>
  );
}
