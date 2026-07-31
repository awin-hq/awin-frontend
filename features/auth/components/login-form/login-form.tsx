"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import styles from "./login-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PasswordInput } from "@/components/forms/password-input";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

type LoginFormData = {
  phone: string;
  password: string;
};

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    try {
      const result = await authService.login({
        phoneNumber: normalizePhone(data.phone),
        password: data.password,
      });

      if (!result.token) {
        setError(
          result.message || "Couldn't sign you in. Please try again."
        );
        return;
      }

      const next =
        new URLSearchParams(window.location.search).get("next") ||
        "/dashboard";
      router.push(next);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.field}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label="Phone Number"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.passwordHeader}>
          <label className={styles.passwordLabel}>
            Password
          </label>

          <Link
            href="/forgot-password"
            className={styles.forgotPassword}
          >
            Forgot Password?
          </Link>
        </div>

        <PasswordInput
          label=""
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
        />
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.button}>
        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Continue"}
        </PrimaryButton>
      </div>
    </form>
  );
}
