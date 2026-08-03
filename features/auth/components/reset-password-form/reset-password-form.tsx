"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./reset-password-form.module.css";

import { PasswordInput } from "@/components/forms/password-input";
import { PasswordStrength } from "@/components/forms/password-strength";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

type FormData = {
  password: string;
  confirmPassword: string;
};

type ResetPasswordFormProps = {
  token: string | null;
};

export function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const password = watch("password", "");

  async function onSubmit(data: FormData) {
    setError(null);

    if (!token) {
      setError(
        "This password reset link is invalid or has expired. Please request a new one."
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (success) {
    return (
      <div className={styles.form}>
        <p className={styles.notice}>
          Your password has been changed successfully.
        </p>

        <PrimaryButton
          type="button"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </PrimaryButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <PasswordInput
        label="Create Password"
        placeholder="Create a password"
        {...register("password", {
          required: "Please enter a new password.",
        })}
      />

      <PasswordStrength password={password} />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your new password"
        {...register("confirmPassword", {
          required: "Please confirm your new password.",
        })}
      />

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : null}

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Changing Password..."
          : "Change Password"}
      </PrimaryButton>
    </form>
  );
}