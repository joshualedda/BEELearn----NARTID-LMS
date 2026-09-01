import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  trailing?: ReactNode;
}

export function Input({
  className = "",
  icon,
  trailing,
  ...props
}: InputProps) {
  const padding = [
    icon ? "pl-9" : "pl-3",
    trailing ? "pr-10" : "pr-3",
  ].join(" ");

  return (
    <div className={`relative ${className}`}>
      {icon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      ) : null}
      <input
        className={`h-10 w-full rounded-md border border-gray-200 bg-white text-sm text-[#0D2B52] placeholder:text-gray-400 focus:border-[#0D2B52] focus:outline-none focus:ring-2 focus:ring-[#0D2B52]/10 disabled:cursor-not-allowed disabled:bg-gray-50 ${padding}`}
        {...props}
      />
      {trailing ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
