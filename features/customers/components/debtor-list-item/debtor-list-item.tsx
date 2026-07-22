import Link from "next/link";

import { Avatar } from "@/components/dashboard/avatar";
import type { Customer } from "@/features/customers/types";

import styles from "./debtor-list-item.module.css";

const STATUS_LABEL: Record<Customer["status"], string> = {
  due: "Due",
  overdue: "Overdue",
  paid: "Paid",
};

type DebtorListItemProps = {
  customer: Customer;
};

export function DebtorListItem({ customer }: DebtorListItemProps) {
  return (
    <Link href={`/customers/${customer.id}`} className={styles.item}>
      <Avatar name={customer.name} />

      <div className={styles.info}>
        <span className={styles.name}>{customer.name}</span>
        <span className={styles.phone}>{customer.phone}</span>
      </div>

      <span className={`${styles.badge} ${styles[customer.status]}`}>
        {STATUS_LABEL[customer.status]}
      </span>
    </Link>
  );
}
