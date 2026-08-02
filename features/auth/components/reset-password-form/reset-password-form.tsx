// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";

// import styles from "./reset-password-form.module.css";

// import { TextInput } from "@/components/forms/text-input";
// import { PasswordInput } from "@/components/forms/password-input";
// import { PasswordStrength } from "@/components/forms/password-strength";
// import { PrimaryButton } from "@/components/buttons/primary-button";
// import { ApiError } from "@/services/http";
// import { authService } from "@/services";

// type FormData = {
//   code: string;
//   password: string;
//   confirmPassword: string;
// };

// const RESET_EMAIL_KEY = "awin-reset-email";

// export function ResetPasswordForm() {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const [verified, setVerified] = useState(false);

//   const { register, watch, handleSubmit, formState: { isSubmitting } } =
//     useForm<FormData>();

//   const password = watch("password", "");

//   async function onSubmit(data: FormData) {
//     setError(null);

//     const email = sessionStorage.getItem(RESET_EMAIL_KEY);

//     if (!email) {
//       setError("Please restart the password reset process.");
//       router.push("/forgot-password");
//       return;
//     }

//     if (data.password !== data.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       // The backend only exposes a code-verification endpoint for this
//       // flow — there is no endpoint to actually persist a new password
//       // yet, so we can confirm the code but can't complete the reset.
//       await authService.verifyOtp({ email, otpCode: data.code });

//       setVerified(true);
//     } catch (err) {
//       setError(
//         err instanceof ApiError
//           ? err.message
//           : "Something went wrong. Please try again."
//       );
//     }
//   }

//   if (verified) {
//     return (
//       <div className={styles.form}>
//         <p className={styles.notice}>
//           Your code has been verified. The backend doesnt yet provide
//           a way to set a new password from here — please sign in with your
//           existing password, or contact support to finish resetting it.
//         </p>

//         <PrimaryButton type="button" onClick={() => router.push("/login")}>
//           Back to Login
//         </PrimaryButton>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className={styles.form}
//     >
//       <TextInput
//         label="Enter Code"
//         placeholder="123456"
//         {...register("code")}
//       />

//       <PasswordInput
//         label="Create Password"
//         placeholder="Create a password"
//         {...register("password")}
//       />

//       <PasswordStrength password={password} />

//       <PasswordInput
//         label="Confirm Password"
//         placeholder="Confirm password"
//         {...register("confirmPassword")}
//       />

//       {error ? <p className={styles.error}>{error}</p> : null}

//       <PrimaryButton type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Verifying..." : "Change Password"}
//       </PrimaryButton>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import styles from "./reset-password-form.module.css";

import { PasswordInput } from "@/components/forms/password-input";
import { PasswordStrength } from "@/components/forms/password-strength";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { ApiError } from "@/services/http";
import { authService } from "@/services";

type FormData = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = searchParams.get("token");

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const password = watch("password", "");

  async function onSubmit(data: FormData) {
    setError(null);

    if (!token) {
      setError(
        "This password reset link is invalid or has expired. Please request a new one."
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      /*
       * IMPORTANT:
       * This assumes your backend endpoint is:
       *
       * POST /api/auth/reset-password
       *
       * and accepts:
       *
       * {
       *   token,
       *   password,
       *   confirmPassword
       * }
       *
       * Confirm this with your backend before using it.
       */

      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (success) {
    return (
      <div className={styles.form}>
        <p className={styles.notice}>
          Your password has been changed successfully.
        </p>

        <PrimaryButton
          type="button"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </PrimaryButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <PasswordInput
        label="Create Password"
        placeholder="Create a password"
        {...register("password", {
          required: true,
        })}
      />

      <PasswordStrength password={password} />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        {...register("confirmPassword", {
          required: true,
        })}
      />

      {error ? (
        <p className={styles.error}>{error}</p>
      ) : null}

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Changing Password..." : "Change Password"}
      </PrimaryButton>
    </form>
  );
}