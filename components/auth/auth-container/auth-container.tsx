import { ReactNode } from "react";
import styles from "./auth-container.module.css";

type Props = {
  children: ReactNode;
};

export function AuthContainer({ children }: Props) {
  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        {children}
      </section>
    </main>
  );
}