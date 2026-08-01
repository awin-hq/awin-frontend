import Image from "next/image";
import Link from "next/link";

import styles from "./problem-section.module.css";

export function ProblemSection() {
  return (
    <section
      id="features"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          Still Using an Exercise Book to
          Record Credit Sales?
        </h2>

        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/assets/landing/business-woman.png"
              alt="Trader recording credit sales"
              fill
              priority
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <p>
              Exercise books get lost, pages tear, and it&aposs easy to forget who
              has paid or who still owes you. Stop relying on handwritten
              records that slow you down.
            </p>

            <p>
              Digitize your credit sales, keep every customer record in one
              secure place, track repayments with ease, and always know exactly
              who owes you, so you can spend less time chasing payments and more
              time growing your business.
            </p>

            <Link
              href="/register"
              className={styles.button}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}