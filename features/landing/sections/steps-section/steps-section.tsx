import { StepCard } from "../../components/step-card";

import styles from "./steps-section.module.css";

const STEPS = [
  {
    number: "1",
    title: "Create your free account.",
    image: "/assets/landing/step-1.png",
    rotation: "-6deg",
  },
  {
    number: "2",
    title: "Add your customers.",
    image: "/assets/landing/step-2.png",
    rotation: "6deg",
  },
  {
    number: "3",
    title: "Record every credit sale.",
    image: "/assets/landing/step-3.png",
    rotation: "-6deg",
  },
  {
    number: "4",
    title: "Track repayments and get paid faster.",
    image: "/assets/landing/step-4.png",
    rotation: "6deg",
  },
];

export function StepsSection() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2>
          Get Started in
          <br />
          Four Simple Steps
        </h2>

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