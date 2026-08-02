"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

import styles from "./password-input.module.css";

type PasswordInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    helperText?: string;
  };

export function PasswordInput({
  label,
  error,
  helperText,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <Input
          type={showPassword ? "text" : "password"}
          className={styles.input}
          {...props}
        />

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className={styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  );
}