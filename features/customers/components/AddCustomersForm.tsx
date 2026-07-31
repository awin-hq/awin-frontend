"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import CustomerSuccess from "./CustomerSuccess";
import { useRouter } from "next/navigation";

export default function AddCustomersForm() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [note, setNote] = useState("");
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log({ fullName, phoneNumber, note });
        setIsSubmitted(true);
        // TODO: send this data to your backend/API later
    }

    if (isSubmitted) {
        return (
            <CustomerSuccess
            customerName={fullName}
            onRecordCredit={() =>
                router.push(
                    `/dashboard/credit-sales/add?name=${encodeURIComponent(fullName)}&phone=${encodeURIComponent(phoneNumber)}`
                )
            }
            onViewCustomer={() =>
                router.push(
                    `/dashboard/customers/profile?name=${encodeURIComponent(fullName)}&phone=${encodeURIComponent(phoneNumber)}`
                )
                }
            />
        );
        }

    return (
        <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col">
        {/* Header */}
        <div className="px-4 pt-6 pb-2">
            <button className="mb-2">
            <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Add Customers</h1>
            <p className="text-sm text-muted-foreground">
            Add a new customer to start recording credits and payments
            </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 mt-4">
            <Input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-14 rounded-xl"
            />

            <div className="relative">
            <Input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="h-14 rounded-xl pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span>🇳🇬</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            </div>

            <button
            type="button"
            className="text-orange-500 text-sm text-right self-end"
            >
            Import from contacts
            </button>

            <Textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
            className="rounded-xl min-h-[100px]"
            />

            <Button
            type="submit"
            className="h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base mt-4"
            >
            Save Customer
            </Button>
        </form>
        <BottomNav />
    </div>
    );
}