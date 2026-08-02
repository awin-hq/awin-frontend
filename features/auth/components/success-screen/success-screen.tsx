"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { PrimaryButton } from "@/components/buttons/primary-button";

import styles from "./success-screen.module.css";

export function SuccessScreen() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/assets/illustrations/success.jpg"
          alt="Registration Successful"
          width={260}
          height={260}
          priority
          className={styles.image}
        />

        <div className={styles.text}>
          <h1 className={styles.title}>
            Welcome to
            <span>AWÍN</span>
          </h1>
        </div>
      </div>

      <PrimaryButton
        onClick={() => router.push("/dashboard")}
      >
        Go To Dashboard
      </PrimaryButton>
    </main>
  );
}