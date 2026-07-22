import Link from "next/link";
import { ArrowUpRight, UserPlus, Tags } from "lucide-react";

import styles from "./quick-actions.module.css";

const ACTIONS = [
  {
    href: "/credit-sales",
    label: "Record Credit",
    icon: ArrowUpRight,
    variant: "violet",
  },
  {
    href: "/customers",
    label: "Add Debtor",
    icon: UserPlus,
    variant: "green",
  },
  {
    href: "/customers",
    label: "View Creditors",
    icon: Tags,
    variant: "peach",
  },
] as const;

export function QuickActions() {
  return (
    <div className={styles.actions}>
      {ACTIONS.map(({ href, label, icon: Icon, variant }) => (
        <Link key={label} href={href} className={styles.action}>
          <span className={`${styles.circle} ${styles[variant]}`}>
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className={styles.label}>{label}</span>
        </Link>
      ))}
    </div>
  );
}
