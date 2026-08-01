import { ReactNode } from "react";

import { BottomNav } from "@/components/dashboard/bottom-nav";

import styles from "./app-shell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.column}>
        <div className={styles.content}>{children}</div>

        <BottomNav />
      </div>
    </div>
  );
}
