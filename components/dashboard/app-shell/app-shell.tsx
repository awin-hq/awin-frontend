import type { ReactNode } from "react";

import { BottomNav } from "@/components/dashboard/bottom-nav";
import { DesktopSidebar } from "@/components/dashboard/desktop-sidebar/desktop-sidebar";

import styles from "./app-shell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.desktopLayout}>
        <DesktopSidebar />

        <main className={styles.main}>{children}</main>

        <aside className={styles.recent}>
          <h2>Recent Credits</h2>
          <p>No recent credits yet</p>
        </aside>
      </div>

      <div className={styles.mobileLayout}>
        <main className={styles.mobileMain}>{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}