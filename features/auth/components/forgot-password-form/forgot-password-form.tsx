"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./forgot-password-form.module.css";

import { TextInput } from "@/components/forms/text-input";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

type ForgotPasswordData = {
  email: string;
};

const RESET_EMAIL_KEY = "awin-reset-email";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordData>();

  async function onSubmit(data: ForgotPasswordData) {
    setError(null);

    try {
      await authService.forgotPassword(data.email);

      sessionStorage.setItem(RESET_EMAIL_KEY, data.email);

      router.push("/reset-password");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <TextInput
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        error={error ?? undefined}
        {...register("email")}
      />

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </PrimaryButton>
    </form>
  );
}
