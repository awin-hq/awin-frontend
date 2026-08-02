import Link from "next/link";

import styles from "./cta-section.module.css";

export function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Stop Losing Money to Forgotten
          <br />
          Credit Sales.
        </h2>

        <p className={styles.description}>
          Join Nigerian traders who are replacing paper notebooks with a
          faster, smarter way to manage customer debts.
        </p>

        <div className={styles.actions}>
          <Link
            href="/register"
            className={styles.primaryButton}
          >
            Get Started
          </Link>

          <a
            href="https://cal.com/david-emulo/book-a-demo"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}