"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { BottomNav } from "@/components/dashboard/bottom-nav";
import { DesktopSidebar } from "@/components/dashboard/desktop-sidebar/desktop-sidebar";
import { RecentCredits, type RecentCredit } from "@/features/dashboard/components/recent-credits";

import styles from "./app-shell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [recentCredits, setRecentCredits] = useState<RecentCredit[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("awìn_recent_credits");

    if (!stored) {
      setRecentCredits([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setRecentCredits(Array.isArray(parsed) ? parsed : []);
    } catch {
      setRecentCredits([]);
    }
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <div className={styles.desktopLayout}>
        <DesktopSidebar />

        <main className={styles.main}>{children}</main>

        <aside className={styles.recent}>
          <RecentCredits credits={recentCredits} />
        </aside>
      </div>

      <div className={styles.mobileLayout}>
        <main className={styles.mobileMain}>{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}