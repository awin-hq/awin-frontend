import styles from "./showcase-section.module.css";

import { PhoneMockup } from "../../components/phone-mockup";
import { ShowcaseCard } from "../../components/showcase-card";

export function ShowcaseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.badge}>
            Dashboard
          </span>

          <h2>
            Everything You Need to Manage
            Customers Credit
          </h2>

          <p>
            From recording transactions to recovering payments faster, our platform helps you stay organized and in control of every customer account.
            <br /> <br /> Steps simplified in easy ways.
          </p>

          <div className={styles.stats}>
            <ShowcaseCard
              title="Customers"
              value="1,284"
            />

            <ShowcaseCard
              title="Outstanding Credit"
              value="₦2.4M"
            />

            <ShowcaseCard
              title="Recovered"
              value="91%"
            />

            <ShowcaseCard
              title="Transactions"
              value="8,450"
            />
          </div>
        </div>

        <div className={styles.right}>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}