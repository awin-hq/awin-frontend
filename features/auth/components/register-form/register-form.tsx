"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./register-form.module.css";

import { TextInput } from "@/components/forms/text-input";
import { PasswordInput } from "@/components/forms/password-input";
import { PasswordStrength } from "@/components/forms/password-strength";
import { PrimaryButton } from "@/components/buttons/primary-button";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const DRAFT_KEY = "awin-register-draft";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  function onSubmit(data: RegisterFormData) {
    setFormError(null);

    if (data.password !== data.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // The register endpoint also requires a phoneNumber, collected on the
    // next screen — stash this step's data and submit everything together
    // once we have the phone number.
    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
      })
    );

    router.push("/phone");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.nameRow}>
        <div className={styles.field}>
          <TextInput
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName", {
              required: "First name is required",
            })}
          />
        </div>

        <div className={styles.field}>
          <TextInput
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <TextInput
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </div>

      <div className={styles.field}>
        <PasswordInput
          label="Create Password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <PasswordStrength password={password} />
      </div>

      <div className={styles.field}>
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          error={
            errors.confirmPassword?.message ??
            formError ??
            undefined
          }
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
        />
      </div>

      <div className={styles.button}>
        <PrimaryButton type="submit">
          Continue
        </PrimaryButton>
      </div>
    </form>
  );
}
