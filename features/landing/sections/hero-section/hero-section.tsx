"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./hero-section.module.css";

const HEADLINES = [
  {
    line1: "Never Forget Who",
    highlight: "Owes",
    line2: "You Again.",
  },
  {
    line1: "Má se gbàgbé eni tí ó jẹ́ ọ ní",
    highlight: "gbese",
    line2: "mọ.",
  },
  {
    line1: "Echefula onye ji gị",
    highlight: "ugwo",
    line2: "ọzọ.",
  },
  {
    line1: "Ka da ka sake ka manta wanda yake",
    highlight: "bashi",
    line2: "bin ka.",
  },
  {
    line1: "Make You No Ever Forget Who dey",
    highlight: "Owe",
    line2: "You.",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % HEADLINES.length);
        setVisible(true);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const headline = HEADLINES[index];

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1
          className={`${styles.title} ${
            visible ? styles.show : styles.hide
          }`}
        >
          <span>{headline.line1}</span>

          <span>
            <span className={styles.highlight}>
              {headline.highlight}
            </span>{" "}
            {headline.line2}
          </span>
        </h1>

        <p className={styles.description}>
          Track exactly who owes you,
          receive payment reminders,
          and recover more money without the stress
          of paper records.
        </p>

        <div className={styles.actions}>
          <Link
            href="/register"
            className={styles.primary}
          >
            Get Started
          </Link>

          <a
            href="https://cal.com/david-emulo/book-a-demo"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}