import { forwardRef } from "react";

import { Input } from "@/components/ui/input";

import styles from "./text-input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>
          {label}
        </label>

        <Input
          ref={ref}
          {...props}
        />

        {error ? (
          <span className={styles.errorMessage}>
            {error}
          </span>
        ) : helperText ? (
          <span className={styles.helper}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";