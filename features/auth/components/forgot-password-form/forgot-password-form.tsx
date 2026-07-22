"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./forgot-password-form.module.css";

import { TextInput } from "@/components/forms/text-input";
import { PrimaryButton } from "@/components/buttons/primary-button";

type ForgotPasswordData = {
  email: string;
};

export function ForgotPasswordForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<ForgotPasswordData>();

  function onSubmit(data: ForgotPasswordData) {
    console.log(data);

    router.push("/reset-password");
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
        {...register("email")}
      />

      <PrimaryButton type="submit">
        Send
      </PrimaryButton>
    </form>
  );
}