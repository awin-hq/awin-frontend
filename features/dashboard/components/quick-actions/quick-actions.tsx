import Link from "next/link";
import { CreditCard, UserPlus, Users } from "lucide-react";

import styles from "./quick-actions.module.css";

const ACTIONS = [

  {
    href: "/credit-sales/add",
    label: "Record Credit",
    icon: CreditCard,
  },
  {
    href: "/customers/add",
    label: "Add Debtor",
    icon: UserPlus,
  },
  {
    href: "/customers",
    label: "View Creditors",
    icon: Users,
  },

] as const;

export function QuickActions() {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Quick Actions</h3>

      <div className={styles.actions}>
        {ACTIONS.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={styles.action}
          >
            <span className={styles.circle}>
              <Icon size={20} aria-hidden="true" />
            </span>

            <span className={styles.label}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}