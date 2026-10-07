import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  trailing?: ReactNode;
  inputClassName?: string;
  isFocused?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  className = "",
  inputClassName = "",
  icon,
  trailing,
  isFocused = false,
  autoFocus,
  ...props
}: InputProps, ref) {
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
        ref={ref}
        autoFocus={isFocused || autoFocus}
        className={`h-10 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:bg-gray-50 ${padding} ${inputClassName}`}
        {...props}
      />
      {trailing ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {trailing}
        </div>
      ) : null}
    </div>
  );
});
