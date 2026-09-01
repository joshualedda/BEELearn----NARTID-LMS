import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-semibold text-[#0D2B52] ${className}`}
      {...props}
    />
  );
}
