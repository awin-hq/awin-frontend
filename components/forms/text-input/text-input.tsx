import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

import styles from "./text-input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>
          {label}
          <span className={styles.required}>*</span>
        </label>

        <Input
          ref={ref}
          className={`${styles.input} ${className ?? ""}`}
          {...props}
        />

        {error ? (
          <span className={styles.error}>{error}</span>
        ) : helperText ? (
          <span className={styles.helper}>{helperText}</span>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";