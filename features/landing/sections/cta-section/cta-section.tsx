import Link from "next/link";

import styles from "./cta-section.module.css";

export function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <span>
          Ready to simplify your business?
        </span>

        <h2>
          Stop Recording Credit Sales
          <br />
          in Exercise Books.
        </h2>

        <p>
          Join hundreds of Nigerian traders already
          using AWÍN to keep track of customer credit
          and repayments.
        </p>

        <Link
          href="/register"
          className={styles.button}
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
}