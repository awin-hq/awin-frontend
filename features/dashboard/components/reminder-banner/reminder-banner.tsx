import Image from "next/image";

import styles from "./reminder-banner.module.css";

export function ReminderBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.copy}>
        <h3 className={styles.title}>
          Never miss a payment with Àwìn
        </h3>

        <p className={styles.text}>
          Get reminders for due and overdue
          <br />
          payments automatically
        </p>

        <button type="button" className={styles.button}>
          Set Reminders
        </button>
      </div>

      <div className={styles.art}>
        <Image
          src="/assets/Dashboard/reminder-woman.png"
          alt=""
          width={260}
          height={260}
          priority
        />
      </div>
    </section>
  );
}