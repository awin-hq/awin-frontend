"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./otp-form.module.css";

import { OtpInput } from "@/components/forms/otp-input";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

const OTP_EMAIL_KEY = "awin-otp-email";

export function OtpForm() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (otp.length !== 6) {
      return;
    }

    setError(null);

    const email = sessionStorage.getItem(OTP_EMAIL_KEY);

    if (!email) {
      setError("We lost track of your registration — please start again.");
      router.push("/register");
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyOtp({ email, otpCode: otp });

      sessionStorage.removeItem(OTP_EMAIL_KEY);

      router.push("/success");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleResend() {
    // The backend doesn't expose a resend-OTP endpoint, so we can't
    // actually trigger a new code — be upfront about that rather than
    // faking a network call.
    setResendNotice(
      "We can't resend the code automatically yet — please check your inbox, or go back and try again."
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >

      <OtpInput
        value={otp}
        onChange={setOtp}
      />

      {error ? <p className={styles.error}>{error}</p> : null}

      <p className={styles.resend}>
        Didn&apos;t receive the code?

        <button
          type="button"
          onClick={handleResend}
        >
          Resend
        </button>
      </p>

      {resendNotice ? (
        <p className={styles.notice}>{resendNotice}</p>
      ) : null}

      <PrimaryButton
        type="submit"
        disabled={
          otp.length !== 6 ||
          isLoading
        }
      >
        {
          isLoading
            ? "Verifying..."
            : "Continue"
        }
      </PrimaryButton>

    </form>
  );
}
