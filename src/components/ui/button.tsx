import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0B2343] text-white font-semibold hover:bg-[#123158] focus-visible:ring-2 focus-visible:ring-[#0B2343]/30 shadow-sm",
  outline:
    "border border-gray-200 bg-white text-[#0D2B52] font-semibold hover:bg-gray-50 hover:border-gray-300",
  ghost: "text-[#0D2B52] font-semibold hover:bg-gray-100",
  link: "text-green-600 font-semibold hover:text-green-700 underline-offset-2 hover:underline",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-8 text-base",
  icon: "h-9 w-9 p-0",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md transition-colors duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none whitespace-nowrap";
  const sizing = variant === "link" ? "" : SIZE_CLASSES[size];

  return (
    <button
      type={type}
      className={`${base} ${sizing} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
