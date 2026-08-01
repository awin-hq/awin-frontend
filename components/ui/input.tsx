import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full rounded-xl border border-[#E5E7EB] bg-[#F8F8F8] px-4 pt-6 pb-2 text-sm outline-none transition-all",
        "placeholder:text-transparent",
        "focus-visible:border-[#0F62FE] focus-visible:ring-4 focus-visible:ring-[#0F62FE]/10",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };