import { FAQItem } from "../../components/faq-item";

import styles from "./faq-section.module.css";

const FAQS = [
  {
    question: "Is Àwin free?",
    answer:
      "Yes. You can start using Àwin for free. Premium plans are available as your business grows.",
  },
  {
    question: "Do I need accounting knowledge?",
    answer:
      "No. Àwin is designed for everyday traders and is very easy to use.",
  },
  {
    question: "Can I use Àwin on my phone?",
    answer:
      "Yes. Àwin works perfectly on phones, tablets and desktop devices.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. Your customer records are securely stored and protected.",
  },
  {
    question: "What happens if a customer pays?",
    answer:
      "Simply record the repayment and the customer's balance updates automatically.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.heading}>FAQs</h2>

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