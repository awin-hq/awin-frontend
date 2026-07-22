"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "./back-button.module.css";

type BackButtonProps = {
  href?: string;
};

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (href) {
      router.push(href);
      return;
    }

    router.back();
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label="Go back"
    >
      <ChevronLeft size={22} />
    </button>
  );
}