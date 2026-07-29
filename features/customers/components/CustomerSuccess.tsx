"use client";

import { CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

export default function CustomerSuccess({
    customerName,
    onRecordCredit,
    onViewCustomer,
}: {
    customerName: string;
    onRecordCredit: () => void;
    onViewCustomer: () => void;
}) {
    return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col px-4 pt-6">
        <button className="mb-2 self-start">
            <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center text-center mt-16">
        <CheckCircle2 className="w-20 h-20 text-orange-500" strokeWidth={2} />
        <h1 className="text-2xl font-bold mt-6">Customer Added Successfully</h1>
        <p className="text-base text-muted-foreground mt-2">
            {customerName} has been added to your customer list
        </p>
    </div>

    <div className="mt-auto mb-24 flex flex-col gap-3">
        <Button
            onClick={onRecordCredit}
            className="h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
        >
            Record Credit
        </Button>
        <Button
            onClick={onViewCustomer}
            variant="outline"
            className="h-14 rounded-full border-orange-500 text-orange-500 hover:bg-orange-50"
        >
            View Customer
        </Button>
    </div>

    <BottomNav />
    </div>
    );
}