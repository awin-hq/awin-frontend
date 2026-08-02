"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomerSuccess() {
  const router = useRouter();

  function handleContinue() {
    router.push("/dashboard/customers");
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col px-4 pt-6 pb-24">

      <main className="flex flex-1 flex-col items-center text-center pt-28">

        <CheckCircle2
          className="w-20 h-20 text-orange-500"
          strokeWidth={1.8}
        />

        <h1 className="text-3xl font-bold mt-8">
          Credit Recorded
          <br />
          Successfully
        </h1>

        <p className="text-base text-muted-foreground mt-3 max-w-[280px]">
          Credit sales has been successfully recorded
        </p>

      </main>

      <button
        type="button"
        onClick={handleContinue}
        className="h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base font-medium mb-20"
      >
        Continue
      </button>

    </div>
  );
}