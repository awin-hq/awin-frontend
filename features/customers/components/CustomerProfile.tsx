    "use client";

    import { useRouter } from "next/navigation";
    import { useState } from "react";
    import { ChevronLeft, MoreVertical, Info, Pencil, Trash2, History, StickyNote } from "lucide-react";
    import BottomNav from "@/components/BottomNav";
    

    export default function CustomerProfile({
    customerName,
    customerPhone,
    outstandingBalance,
    totalCreditGiven,
    totalCreditAmount,
    }: {
    customerName: string;
    customerPhone: string;
    outstandingBalance: string;
    totalCreditGiven: string;
    totalCreditAmount: string;
    }) {
    const router = useRouter();
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6">
            <button onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-medium">Customer Profile</h1>
            <div className="relative">
                <button onClick={() => setShowActions(!showActions)}>
                    <MoreVertical className="w-5 h-5" />
                </button>
                {showActions && (
                    <div className="absolute right-0 top-8 bg-white shadow-lg rounded-xl w-48 py-2 z-10 border">
                    <button className="w-full text-left px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted">
                        <Pencil className="w-4 h-4" /> Edit Details
                    </button>
                    <button className="w-full text-left px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted">
                        <Trash2 className="w-4 h-4" /> Delete Customer
                    </button>
                    <button className="w-full text-left px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted">
                        <History className="w-4 h-4" /> Transaction History
                    </button>
                    <button className="w-full text-left px-4 py-2 flex items-center gap-2 text-sm hover:bg-muted">
                        <StickyNote className="w-4 h-4" /> Add Notes
                    </button>
                    </div>
                )}
            </div>
        </div>

        <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-medium">
            {customerName.charAt(0).toUpperCase()}
            </div>
            <p className="font-medium mt-3">{customerName}</p>
            <p className="text-sm text-muted-foreground">{customerPhone}</p>
        </div>

        <div className="bg-muted rounded-xl p-4 text-center mb-4">
            <p className="text-sm text-muted-foreground">Outstanding balance</p>
            <p className="text-orange-500 text-xl font-semibold mt-1">{outstandingBalance}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Credit Given</p>
            <p className="font-medium mt-1">{totalCreditGiven}</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Money Owed</p>
            <p className="text-orange-500 font-medium mt-1">{totalCreditAmount}</p>
            </div>
        </div>

        <h2 className="font-medium mb-2">Recent Transactions</h2>
        <div className="border rounded-xl p-4 flex gap-3 items-start">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
            <p className="font-medium">No transactions yet</p>
            <p className="text-sm text-muted-foreground">
                Start by recording a credit sale for this customer.
            </p>
            </div>
        </div>

        <BottomNav />
        </div>
    );
    }