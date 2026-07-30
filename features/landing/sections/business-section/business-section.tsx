import Image from "next/image";

import { BusinessCard } from "../../components/business-card";

import styles from "./business-section.module.css";

const BUSINESSES = [
  {
    title: "Retail Shops",
    description:
      "Manage customer credit, repayments, and purchase history effortlessly.",
  },
  {
    title: "Provision Stores",
    description:
      "Keep track of neighborhood customers without relying on paper notebooks.",
  },
  {
    title: "Wholesalers",
    description:
      "Monitor larger customer balances and outstanding invoices with ease.",
  },
  {
    title: "Pharmacies",
    description:
      "Record trusted customer credit while maintaining organized repayment records.",
  },
];

export function BusinessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.badge}>
            Built For You
          </span>

          <h2>
            Built for Every
            <br />
            Nigerian Business
          </h2>

          <p>
            Whether you are a market trader, shop owner, food vendor, or wholesaler, our platform helps you stay on top of customer credit. Spend less time managing records and more time growing your business.
          </p>

          <div className={styles.grid}>
            {BUSINESSES.map((item) => (
              <BusinessCard
                key={item.title}
                {...item}
              />
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <Image
            src="/assets/landing/lady-paying-local-market-woman.png"
            alt="Business owner"
            fill
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}