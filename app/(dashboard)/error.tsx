"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main
      style={{
        padding: 40,
      }}
    >
      <h1>Something went wrong.</h1>

      <button onClick={reset}>
        Try Again
      </button>
    </main>
  );
}