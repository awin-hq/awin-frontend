"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./login-form.module.css";

import { TextInput } from "@/components/forms/text-input";
import { PasswordInput } from "@/components/forms/password-input";
import { PrimaryButton } from "@/components/buttons/primary-button";

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    // TODO: Replace with login API call
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.field}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
          {...register("email")}
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