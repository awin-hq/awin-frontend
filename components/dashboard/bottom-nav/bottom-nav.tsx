"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CircleDollarSign,
  Settings,
  type LucideIcon,
} from "lucide-react";

import styles from "./bottom-nav.module.css";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** route prefixes that should also mark this item active */
  match: string[];
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home, match: ["/dashboard"] },
  {
    href: "/customers",
    label: "Customers",
    icon: Users,
    match: ["/customers"],
  },
  {
    href: "/credit-sales",
    label: "Credit",
    icon: CircleDollarSign,
    match: ["/credit-sales"],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    match: ["/settings"],
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      {NAV_ITEMS.map(({ href, label, icon: Icon, match }) => {
        const isActive = match.some(
          (prefix) =>
            pathname === prefix || pathname.startsWith(`${prefix}/`)
        );

        return (
          <Link
            key={href}
            href={href}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.4 : 1.8}
              aria-hidden="true"
            />
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
