import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function AppButton({
  children,
  loading = false,
  className,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={cn("w-full h-12 rounded-xl", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Signing in..." : children}
    </Button>
  );
}