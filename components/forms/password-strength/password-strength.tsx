"use client";

import styles from "./password-strength.module.css";

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const checks = [
    {
      label: "8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Lowercase",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Uppercase",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "1 Number",
      valid: /\d/.test(password),
    },
    {
      label: "1 Symbol",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {checks.map((item) => (
        <div
          key={item.label}
          className={`${styles.badge} ${
            item.valid ? styles.valid : ""
          }`}
        >
          ✓ {item.label}
        </div>
      ))}
    </div>
  );
}