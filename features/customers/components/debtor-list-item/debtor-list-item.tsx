import Link from "next/link";

import { Avatar } from "@/components/dashboard/avatar";
<<<<<<< HEAD
import { formatNaira } from "@/lib/format";
import type { Customer } from "@/services/types";
=======
import type { Customer } from "@/features/customers/types";
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf

import styles from "./debtor-list-item.module.css";

const STATUS_LABEL: Record<Customer["status"], string> = {
  due: "Due",
  overdue: "Overdue",
  paid: "Paid",
<<<<<<< HEAD
  nil: "Nil",
=======
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
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
<<<<<<< HEAD
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
=======
        <span className={styles.phone}>{customer.phone}</span>
      </div>

      <span className={`${styles.badge} ${styles[customer.status]}`}>
        {STATUS_LABEL[customer.status]}
      </span>
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
    </Link>
  );
}
