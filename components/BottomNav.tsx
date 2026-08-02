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
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 md:hidden">
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
        </nav>
    );
}