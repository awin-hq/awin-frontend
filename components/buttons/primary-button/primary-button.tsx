import { ButtonHTMLAttributes } from "react";
import styles from "./primary-button.module.css";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
}