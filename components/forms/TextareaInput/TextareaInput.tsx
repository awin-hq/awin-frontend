import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";

import styles from "./Textarea-input.module.css";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  Props
>(({ label, error, helperText, className, required, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
        {required ? <span className={styles.required}>*</span> : null}
      </label>

      <Textarea
        ref={ref}
        required={required}
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
});

TextareaInput.displayName = "TextareaInput";