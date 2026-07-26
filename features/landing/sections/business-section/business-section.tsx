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
            Whether you run a retail shop, supermarket,
            pharmacy, or wholesale business,
            AWÍN helps you stay in control of every
            customer credit transaction.
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
            src="/assets/landing/business.webp"
            alt="Business owner"
            fill
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}