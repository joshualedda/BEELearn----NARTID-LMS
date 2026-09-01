import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function Checkbox({ className = "", label, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-2 text-sm text-slate-600 ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        className="h-3.5 w-3.5 cursor-pointer accent-[#0B2343]"
        {...props}
      />
      {label}
    </label>
  );
}
