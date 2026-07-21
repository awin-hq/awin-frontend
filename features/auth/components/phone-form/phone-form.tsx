"use client";

import { useState } from "react";

import styles from "./phone-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PrimaryButton } from "@/components/buttons/primary-button";

export function PhoneForm() {

  const [phone, setPhone] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(phone);

    // next step later:
    // router.push("/otp");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={styles.form}
    >

      <PhoneInput
        label="Phone Number"
        value={phone}
        onChange={setPhone}
      />

      <PrimaryButton type="submit">
        Continue
      </PrimaryButton>

    </form>
  );
}