"use client";

import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import styles from "./phone-form.module.css";

import { PhoneInput } from "@/components/forms/phone-input";
import { PrimaryButton } from "@/components/buttons/primary-button";

type PhoneFormData = {
  phone: string;
};

export function PhoneForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
  } = useForm<PhoneFormData>({
    defaultValues: {
      phone: "",
    },
  });


  function onSubmit(data: PhoneFormData) {
    console.log(data);

    router.push("/otp");
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
          />
        )}
      />


      <PrimaryButton type="submit">
        Continue
      </PrimaryButton>

    </form>
  );
}