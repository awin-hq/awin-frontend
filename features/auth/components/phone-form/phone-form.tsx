"use client";

import { authService, ApiError } from "@/services";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import styles from "./phone-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PrimaryButton } from "@/components/buttons/primary-button";


type PhoneFormData = {
  phone: string;
};

const DRAFT_KEY = "awin-register-draft";
const OTP_EMAIL_KEY = "awin-otp-email";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function PhoneForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PhoneFormData>({
    defaultValues: {
      phone: "",
    },
  });


  async function onSubmit(data: PhoneFormData) {
    setError(null);

    try {
      const draft = sessionStorage.getItem(DRAFT_KEY);

      if (!draft) {
        router.push("/register");
        return;
      }

      let registerData;

      try {
        registerData = JSON.parse(draft);
      } catch {
        sessionStorage.removeItem(DRAFT_KEY);
        router.push("/register");
        return;
      }

      await authService.register({
        ...registerData,
        phoneNumber: normalizePhone(data.phone),
      });

      sessionStorage.setItem(
        OTP_EMAIL_KEY,
        registerData.email
      );

      sessionStorage.removeItem(DRAFT_KEY);

      router.push("/otp");
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

      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Phone number is required",
          validate: (value) =>
            value.replace(/\D/g, "").length >= 10 ||
            "Enter a valid phone number",
        }}
        render={({ field, fieldState }) => (
          <PhoneInput
            label="Phone Number"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Continue"}
      </PrimaryButton>

    </form>
  );
}