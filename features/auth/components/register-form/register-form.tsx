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
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));

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
            {...register("firstName")}
          />
        </div>

        <div className={styles.field}>
          <TextInput
            label="Last Name"
            placeholder="Doe"
            {...register("lastName")}
          />
        </div>
      </div>

      <div className={styles.field}>
        <TextInput
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          {...register("email")}
        />
      </div>

      <div className={styles.field}>
        <PasswordInput
          label="Create Password"
          placeholder="Create a password"
          {...register("password")}
        />

        <PasswordStrength password={password} />
      </div>

      <div className={styles.field}>
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          error={formError ?? undefined}
          {...register("confirmPassword")}
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
