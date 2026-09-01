import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0B2343] text-white font-semibold hover:bg-[#123158] focus-visible:ring-2 focus-visible:ring-[#0B2343]/30",
  outline:
    "border border-gray-200 bg-white text-[#0D2B52] font-semibold hover:bg-gray-50",
  ghost: "text-[#0D2B52] font-semibold hover:bg-gray-100",
  link: "text-green-600 font-semibold hover:text-green-700 underline-offset-2 hover:underline",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none";
  const sizing =
    variant === "link" ? "" : "h-10 w-full px-4";

  return (
    <button
      type={type}
      className={`${base} ${sizing} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
