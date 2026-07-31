import { FeatureCard } from "../../components/feature-card";

import styles from "./features-section.module.css";

const FEATURES = [
  {
    icon: "/icons/flower.svg",
    title: "Record Sales in Seconds",
    description:
      "Instead of flipping through pages, AWÍN keeps all your customer debts in one secure place.",
  },
  {
    icon: "/icons/flower.svg",
    title: "Know Who Owes You",
    description:
      "Keep a complete record of every customer's outstanding balance. No more guessing or flipping through notebooks.",
  },
  {
    icon: "/icons/flower.svg",
    title: "Track Payments",
    description:
      "Monitor every repayment coming in. See paid, pending and overdue balances at a glance.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className={styles.section}
    >
      <div className={styles.container}>
        <span className={styles.badge}>
          Features
        </span>

        <h2 className={styles.heading}>
          Meet <span className={styles.highlight}>AWÍN</span>, The Smarter Way
          to Manage Customer Credit.
        </h2>

        <p className={styles.subtitle}>
          Instead of flipping through pages, AWÍN keeps all your customer debts
          in one secure place.
        </p>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}