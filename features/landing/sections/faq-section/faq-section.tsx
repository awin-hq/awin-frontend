import { FAQItem } from "../../components/faq-item";

import styles from "./faq-section.module.css";

const FAQS = [
  {
    question: "Is AWÍN free to use?",
    answer:
      "Yes. You can start using AWÍN for free, with premium features available as your business grows.",
  },
  {
    question: "Can I record repayments?",
    answer:
      "Absolutely. AWÍN lets you record full and partial repayments while automatically updating customer balances.",
  },
  {
    question: "Will my data be secure?",
    answer:
      "Yes. Your business records are securely stored and protected using modern security practices.",
  },
  {
    question: "Can I use AWÍN on my phone?",
    answer:
      "Yes. AWÍN is designed mobile-first so it works beautifully on smartphones and tablets.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className={styles.section}
    >
      <div className={styles.container}>
        <span className={styles.badge}>
          Frequently Asked Questions
        </span>

        <h2>Everything You Need to Know</h2>

        <div className={styles.list}>
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.question}
              {...faq}
            />
          ))}
        </div>
      </div>
    </section>
  );
}