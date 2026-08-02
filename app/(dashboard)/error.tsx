"use client";

import { PrimaryButton } from "@/components/buttons/primary-button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}
        >
          We couldn&apos;t load this page. Please try again.
        </p>

        <PrimaryButton onClick={reset}>
          Try Again
        </PrimaryButton>
      </div>
    </main>
  );
}