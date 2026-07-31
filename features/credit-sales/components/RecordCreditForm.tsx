"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

export default function RecordCreditForm({
    customerName,
    customerPhone,
    outstandingBalance,
}: {
    customerName: string;
    customerPhone: string;
    outstandingBalance: string;
}) {
    const [itemDescription, setItemDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [paymentDueDate, setPaymentDueDate] = useState("");
    const [notes, setNotes] = useState("");
    const router = useRouter();

function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ itemDescription, amount, date, paymentDueDate, notes });
    // TODO: send this data to your backend/API later
}

return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col px-4 pt-6 pb-24">
        <button className="mb-2 self-start" onClick={() => router.back()}>
        <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold mb-4">Record Credit</h1>

    <div className="flex items-center justify-between border rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium">
            {customerName.charAt(0).toUpperCase()}
            </div>
            <div>
            <p className="font-medium">{customerName}</p>
            <p className="text-sm text-muted-foreground">{customerPhone}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Outstanding balance</p>
            <p className="text-orange-500 font-medium">{outstandingBalance}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
            <label className="text-sm font-medium">
                Item Description <span className="text-orange-500">*</span>
            </label>
            <Textarea
                placeholder="Type here"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
                className="rounded-xl mt-1"
            />
            </div>

            <div>
            <label className="text-sm font-medium">
                Amount <span className="text-orange-500">*</span>
            </label>
            <Input
                placeholder="Type here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="h-14 rounded-xl mt-1"
            />
            </div>

            <div>
            <label className="text-sm font-medium">
                Date <span className="text-orange-500">*</span>
            </label>
            <Input
                placeholder="Type here"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-14 rounded-xl mt-1"
            />
            </div>

            <div>
            <label className="text-sm font-medium">
                Payment Due Date <span className="text-orange-500">*</span>
            </label>
            <Input
                placeholder="Type here"
                value={paymentDueDate}
                onChange={(e) => setPaymentDueDate(e.target.value)}
                required
                className="h-14 rounded-xl mt-1"
            />
            </div>

            <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea
                placeholder="Type here"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-xl mt-1"
            />
            </div>

            <Button
            type="submit"
            className="h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base mt-4"
            >
            Record Credit
            </Button>
        </form>

        <BottomNav />
        </div>
    );
}