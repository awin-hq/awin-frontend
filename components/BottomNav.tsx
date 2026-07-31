"use client";

import { Home, Users, RefreshCcw, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Customer", href: "/dashboard/customers", icon: Users },
    { label: "Credit", href: "/dashboard/credit-sales", icon: RefreshCcw },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function BottomNav() {
    const pathname = usePathname();

return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t flex justify-around items-center h-16">
        {navItems.map((item) => {
            const isActive =
                item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
            <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1"
            >
                <Icon
                className={`w-5 h-5 ${isActive ? "text-orange-500" : "text-gray-400"}`}
                />
                <span
                className={`text-xs ${isActive ? "text-orange-500" : "text-gray-400"}`}
                >
                {item.label}
                </span>
            </Link>
            );
        })}
        </div>
    );
}