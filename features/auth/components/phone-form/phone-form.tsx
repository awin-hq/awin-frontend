"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./phone-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PrimaryButton } from "@/components/buttons/primary-button";


export function PhoneForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    console.log(phone);

    router.push("/otp");
  }


  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >

      <PhoneInput
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        placeholder="801 234 5678"
      />


      <PrimaryButton type="submit">
        Continue
      </PrimaryButton>

    </form>
  );
}