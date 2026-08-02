"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CustomerSuccess() {
  const router = useRouter();

  function handleContinue() {
    router.push("/customers");
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col px-4 pt-8 pb-24">
      <main className="flex flex-1 flex-col items-center gap-6">
        <div className="w-full rounded-[32px] border border-border bg-surface px-8 py-10 shadow-sm">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <CheckCircle2
                className="w-10 h-10 text-orange-500"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-8 text-center">
            Credit Recorded Successfully
          </h1>

          <p className="text-base text-muted-foreground mt-4 text-center max-w-[340px] mx-auto leading-7">
            The credit sale has been added to the system. You can now view the
            updated customer list and recent credits panel in your dashboard.
          </p>

          <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Next step
            </p>
            <p className="mt-2 text-base text-slate-900">
              Continue to customers to review the full customer profile and
              payment history.
            </p>
          </div>
        </div>
      </main>

      <button
        type="button"
        onClick={handleContinue}
        className="h-14 w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base font-medium mt-auto mb-6"
      >
        Continue to Customers
      </button>
    </div>
  );
}