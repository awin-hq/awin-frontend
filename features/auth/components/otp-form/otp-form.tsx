"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./otp-form.module.css";

import { OtpInput } from "@/components/forms/otp-input";
import { PrimaryButton } from "@/components/buttons/primary-button";


export function OtpForm() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();


    if (otp.length !== 6) {
      return;
    }


    setIsLoading(true);


    const phone =
      sessionStorage.getItem(
        "awin-phone"
      );


    console.log({
      phone,
      otp,
    });


    /*
      TODO:

      await verifyOtp({
        phone,
        otp
      })

    */


    router.push("/success");
  }


  function handleResend() {

    const phone =
      sessionStorage.getItem(
        "awin-phone"
      );


    console.log(
      "Resending OTP to:",
      phone
    );


    /*
      TODO:

      await resendOtp(phone)

    */
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


      <p className={styles.resend}>
        Didn&apos;t receive the code?

        <button
          type="button"
          onClick={handleResend}
        >
          Resend
        </button>
      </p>


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