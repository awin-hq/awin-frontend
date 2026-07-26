"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{question}</span>

        <ChevronDown
          size={20}
          className={open ? styles.rotate : ""}
        />
      </button>

      <div
        className={`${styles.content} ${
          open ? styles.open : ""
        }`}
      >
        <p>{answer}</p>
      </div>
    </article>
  );
}