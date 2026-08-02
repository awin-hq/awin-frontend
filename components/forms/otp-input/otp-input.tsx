"use client";

import { useRef } from "react";

import styles from "./otp-input.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpInput({
  value,
  onChange,
}: Props) {

  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {

    const digit = e.target.value.replace(/\D/g, "");

    const otp = value.split("");

    otp[index] = digit;

    const newValue = otp.join("");

    onChange(newValue);

    if (digit && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }


  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {

    if (
      e.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  }


  return (
    <div className={styles.container}>
      {Array.from({ length: 6 }).map((_, index) => (

        <input
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          className={styles.input}
          value={value[index] ?? ""}
          maxLength={1}
          inputMode="numeric"
          onChange={(e) =>
            handleChange(e, index)
          }
          onKeyDown={(e) =>
            handleBackspace(e, index)
          }
        />

      ))}
    </div>
  );
}