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
        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm accent-indigo-600 focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
      {label}
    </label>
  );
}
