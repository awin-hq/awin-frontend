"use client";

import Link from "next/link";
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
  const { register, handleSubmit } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
    console.log(data);
  }

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
          {...register("email")}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.passwordHeader}>
          <label>Password</label>

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
          {...register("password")}
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