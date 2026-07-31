"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import styles from "./phone-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

type PhoneFormData = {
  phone: string;
};

type RegisterDraft = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const DRAFT_KEY = "awin-register-draft";
const OTP_EMAIL_KEY = "awin-otp-email";

/** react-international-phone returns "+2349075753056"; the backend wants
 *  the digits only, no leading "+". */
function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function PhoneForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm<PhoneFormData>({
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(data: PhoneFormData) {
    setError(null);

    const raw = sessionStorage.getItem(DRAFT_KEY);

    if (!raw) {
      setError("Your registration details were lost — please start again.");
      router.push("/register");
      return;
    }

    const draft = JSON.parse(raw) as RegisterDraft;
    const phoneNumber = normalizePhone(data.phone);

    if (phoneNumber.length < 10) {
      setError("Enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.register({
        firstName: draft.firstName,
        lastName: draft.lastName,
        email: draft.email,
        password: draft.password,
        confirmPassword: draft.confirmPassword,
        phoneNumber,
      });

      sessionStorage.setItem(OTP_EMAIL_KEY, draft.email);
      sessionStorage.removeItem(DRAFT_KEY);

      router.push("/otp");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
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
        render={({ field }) => (
          <PhoneInput
            label="Phone Number"
            value={field.value}
            onChange={field.onChange}
            error={error ?? undefined}
          />
        )}
      />


      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Continue"}
      </PrimaryButton>

    </form>
  );
}
