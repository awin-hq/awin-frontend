"use client";

import { LogOut } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { useAuth } from "@/features/auth/context";

import styles from "./settings-view.module.css";

export function SettingsView() {
  const { merchant, logout } = useAuth();

  const name =
    [merchant?.firstName, merchant?.lastName].filter(Boolean).join(" ") ||
    "Your account";

  return (
    <div className={styles.view}>
      <h1 className={styles.title}>Settings</h1>

      <section className={styles.profile}>
        <Avatar name={name} size="lg" color="var(--color-primary)" />

        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          {merchant?.email ? (
            <span className={styles.meta}>{merchant.email}</span>
          ) : null}
          {merchant?.phoneNumber ? (
            <span className={styles.meta}>{merchant.phoneNumber}</span>
          ) : null}
        </div>
      </section>

      <button type="button" className={styles.logout} onClick={logout}>
        <LogOut size={18} aria-hidden="true" />
        Log out
      </button>
    </div>
  );
}
