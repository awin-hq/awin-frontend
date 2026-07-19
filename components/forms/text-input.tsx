import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const TextInput = React.forwardRef<
  HTMLInputElement,
  TextInputProps
>(({ label, id, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        ref={ref}
        id={id}
        className={className}
        {...props}
      />
    </div>
  );
});

TextInput.displayName = "TextInput";