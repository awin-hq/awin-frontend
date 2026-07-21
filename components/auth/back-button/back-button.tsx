"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import styles from "./back-button.module.css";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => router.push("/register")}
      aria-label="Go back"
    >
      <ChevronLeft size={22} />
    </button>
  );
}