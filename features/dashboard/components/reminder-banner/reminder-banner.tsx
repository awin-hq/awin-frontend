import { ReminderArt } from "@/components/dashboard/illustrations";

import styles from "./reminder-banner.module.css";

export function ReminderBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.copy}>
        <h3 className={styles.title}>Never miss a payment with Àwìn</h3>
        <p className={styles.text}>
          Get reminders for due and overdue payments automatically
        </p>
        <button type="button" className={styles.button}>
          Set Reminders
        </button>
      </div>

      <span className={styles.art} aria-hidden="true">
        <ReminderArt />
      </span>
    </section>
  );
}
