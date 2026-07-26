import Link from "next/link";

import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Never Forget Who
          <br />

          <span className={styles.highlight}>
            Owes
          </span>{" "}
          You Again.
        </h1>

        <p className={styles.description}>
          AWÍN is the digital credit notebook built for Nigerian traders.
          Record credit sales, know exactly who owes you,
          receive payment reminders, and recover more money
          without the stress of paper records.
        </p>

        <div className={styles.actions}>
          <Link
            href="/register"
            className={styles.primary}
          >
            Get Started
          </Link>

          <button
            type="button"
            className={styles.secondary}
          >
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}