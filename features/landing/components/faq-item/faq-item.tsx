"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import styles from "./faq-item.module.css";

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({
  question,
  answer,
}: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className={styles.item}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>

        <div className={styles.icon}>
          {open ? (
            <Minus size={14} />
          ) : (
            <Plus size={14} />
          )}
        </div>
      </button>

      <div
        className={`${styles.answer} ${
          open ? styles.open : ""
        }`}
      >
        <p>{answer}</p>
      </div>
    </article>
  );
}