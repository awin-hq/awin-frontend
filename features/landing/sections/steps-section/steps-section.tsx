import { StepCard } from "../../components/step-card";

import styles from "./steps-section.module.css";

const STEPS = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up in minutes and securely set up your business profile.",
    image: "/assets/landing/step1.webp",
  },
  {
    number: "02",
    title: "Add Customers",
    description:
      "Save customer information and build your digital customer book.",
    image: "/assets/landing/step2.webp",
  },
  {
    number: "03",
    title: "Record Credit Sales",
    description:
      "Capture every sale, payment, and balance instantly.",
    image: "/assets/landing/step3.webp",
  },
  {
    number: "04",
    title: "Track Repayments",
    description:
      "Monitor outstanding debts and receive repayments with confidence.",
    image: "/assets/landing/step4.webp",
  },
];

export function StepsSection() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
    >
      <div className={styles.container}>
        <span className={styles.badge}>
          How It Works
        </span>

        <h2>
          Get Started
          <br />
          in Four Simple Steps
        </h2>

        <p>
          AWÍN is designed to be simple enough for every trader.
          Start recording your credit sales in just a few minutes.
        </p>

        <div className={styles.grid}>
          {STEPS.map((step) => (
            <StepCard
              key={step.number}
              {...step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}