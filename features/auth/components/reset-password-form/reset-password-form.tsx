"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./reset-password-form.module.css";

import { TextInput } from "@/components/forms/text-input";
import { PasswordInput } from "@/components/forms/password-input";
import { PasswordStrength } from "@/components/forms/password-strength";
import { PrimaryButton } from "@/components/buttons/primary-button";

type FormData = {
  code: string;
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const router = useRouter();

  const { register, watch, handleSubmit } = useForm<FormData>();

  const password = watch("password", "");

  function onSubmit(data: FormData) {
    console.log(data);

    router.push("/login");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <TextInput
        label="Enter Code"
        placeholder="123456"
        {...register("code")}
      />

      <PasswordInput
        label="Create Password"
        placeholder="Create a password"
        {...register("password")}
      />

      <PasswordStrength password={password} />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        {...register("confirmPassword")}
      />

      <PrimaryButton type="submit">
        Change Password
      </PrimaryButton>
    </form>
  );
}