import {
  Bell,
  BookOpen,
  Users,
} from "lucide-react";

import { FeatureCard } from "../../components/feature-card";

import styles from "./features-section.module.css";

const FEATURES = [
  {
    icon: <BookOpen size={30} />,
    title: "Track Every Credit Sale",
    description:
      "Record every customer purchase in seconds and keep a permanent digital record that never gets lost.",
  },
  {
    icon: <Bell size={30} />,
    title: "Automatic Payment Reminders",
    description:
      "Reduce forgotten debts by sending timely reminders and following up with customers effortlessly.",
  },
  {
    icon: <Users size={30} />,
    title: "Manage Every Customer",
    description:
      "View balances, repayment history, and customer activity all in one place.",
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

        <h2>
          Meet AWÍN, the Smarter Way
          <br />
          to Manage Customer Credit
        </h2>

        <p>
          Everything you need to record credit sales,
          follow repayments, and stay in control of
          your business.
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