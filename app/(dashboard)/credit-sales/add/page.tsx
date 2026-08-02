"use client";

import { useSearchParams } from "next/navigation";

import { toNumber } from "@/lib/format";
import RecordCreditForm from "@/features/credit-sales/components/RecordCreditForm/RecordCreditForm";

export default function Page() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Customer";
  const phone = searchParams.get("phone") || "";

  let outstandingBalance = 0;

  if (typeof window !== "undefined") {
    try {
      const existingCustomers = JSON.parse(
        window.localStorage.getItem("awìn_customers") || "[]"
      );

      const storedCustomers = Array.isArray(existingCustomers)
        ? existingCustomers
        : [];

      const matchedCustomer = storedCustomers.find(
        (customer: {
          phoneNumber?: string;
          name?: string;
          outstandingBalance?: number | string;
        }) =>
          customer.phoneNumber === phone || customer.name === name
      );

      outstandingBalance = toNumber(
        matchedCustomer?.outstandingBalance
      );
    } catch {
      outstandingBalance = 0;
    }
  }

  return (
    <RecordCreditForm
      customerName={name}
      customerPhone={phone}
      outstandingBalance={outstandingBalance}
    />
  );
}