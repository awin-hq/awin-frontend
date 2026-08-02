import Link from "next/link";

import { Avatar } from "@/components/dashboard/avatar";
import { formatNaira } from "@/lib/format";
import type { Customer } from "@/services/types";

import styles from "./debtor-list-item.module.css";

const STATUS_LABEL: Record<Customer["status"], string> = {
  due: "Due",
  overdue: "Overdue",
  paid: "Paid",
  nil: "Nil",
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
        <span className={styles.phone}>{customer.phoneNumber}</span>
      </div>

      <div className={styles.right}>
        {customer.outstandingBalance > 0 ? (
          <span className={styles.amount}>
            {formatNaira(customer.outstandingBalance)}
          </span>
        ) : null}
        <span className={`${styles.badge} ${styles[customer.status]}`}>
          {STATUS_LABEL[customer.status]}
        </span>
      </div>
    </Link>
  );
}
