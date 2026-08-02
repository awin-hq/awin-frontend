"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CircleDollarSign,
  Settings,
} from "lucide-react";

import styles from "./desktop-sidebar.module.css";

const ITEMS = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Credit",
    href: "/credit-sales",
    icon: CircleDollarSign,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>À</div>

        <div>
          <strong>Àwìn</strong>
          <span>Credit management</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {ITEMS.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`${styles.item} ${
                active ? styles.active : ""
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />

              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <div className={styles.help}>
          <span>Need help?</span>
          <small>Contact support</small>
        </div>
      </div>
    </aside>
  );
}