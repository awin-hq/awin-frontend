"use client";

import "react-international-phone/style.css";

import {
  PhoneInput as InternationalPhoneInput,
} from "react-international-phone";

import styles from "./phone-input.module.css";


type PhoneInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};


export function PhoneInput({
  label,
  value,
  onChange,
  error,
}: PhoneInputProps) {

  return (
    <div className={styles.wrapper}>

      <label className={styles.label}>
        {label}
      </label>


      <InternationalPhoneInput
        defaultCountry="ng"
        value={value}
        onChange={onChange}

        className={styles.phone}

        inputClassName={styles.input}

        countrySelectorStyleProps={{
          buttonClassName: styles.countryButton,

          dropdownStyleProps:{
            className: styles.dropdown,
          },
        }}
      />


      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}

    </div>
  );
}