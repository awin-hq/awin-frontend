import Link from "next/link";
<<<<<<< HEAD
import { CreditCard, UserPlus, Users } from "lucide-react";
=======
import { ArrowUpRight, UserPlus, Tags } from "lucide-react";
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf

import styles from "./quick-actions.module.css";

const ACTIONS = [
  {
    href: "/credit-sales",
    label: "Record Credit",
<<<<<<< HEAD
    icon: CreditCard,
=======
    icon: ArrowUpRight,
    variant: "violet",
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
  },
  {
    href: "/customers",
    label: "Add Debtor",
    icon: UserPlus,
<<<<<<< HEAD
=======
    variant: "green",
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
  },
  {
    href: "/customers",
    label: "View Creditors",
<<<<<<< HEAD
    icon: Users,
=======
    icon: Tags,
    variant: "peach",
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
  },
] as const;

export function QuickActions() {
  return (
<<<<<<< HEAD
    <section className={styles.section}>
      <h3 className={styles.heading}>Quick Actions</h3>

      <div className={styles.actions}>
        {ACTIONS.map(({ href, label, icon: Icon }) => (
          <Link key={label} href={href} className={styles.action}>
            <span className={styles.circle}>
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </div>
    </section>
=======
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
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
  );
}
