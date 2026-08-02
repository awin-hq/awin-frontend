"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { toNumber } from "@/lib/format";
import RecordCreditForm from "@/features/credit-sales/components/RecordCreditForm/RecordCreditForm";

export default function Page() {
  const searchParams = useSearchParams();
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  useEffect(() => {
    const name = searchParams.get("name") || "Customer";
    const phone = searchParams.get("phone") || "";

    if (typeof window === "undefined") {
      return;
    }

    const existingCustomers = JSON.parse(
      window.localStorage.getItem("awìn_customers") || "[]"
    );
    const storedCustomers = Array.isArray(existingCustomers)
      ? existingCustomers
      : [];

    const matchedCustomer = storedCustomers.find(
      (customer: { phoneNumber?: string; name?: string }) =>
        customer.phoneNumber === phone || customer.name === name
    );

    setOutstandingBalance(toNumber(matchedCustomer?.outstandingBalance));
  }, [searchParams]);

  const name = searchParams.get("name") || "Customer";
  const phone = searchParams.get("phone") || "";

  return (
    <RecordCreditForm
      customerName={name}
      customerPhone={phone}
      outstandingBalance={outstandingBalance}
    />
  );
}