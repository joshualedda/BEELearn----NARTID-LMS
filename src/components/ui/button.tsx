import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-gray-800 text-white hover:bg-gray-700 focus-visible:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:bg-gray-900",
  secondary:
    "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
  outline:
    "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
  danger:
    "border border-transparent bg-red-600 text-white hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:bg-red-700",
  ghost: "text-gray-700 hover:bg-gray-100",
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
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none";
  const sizing = variant === "link" ? "" : SIZE_CLASSES[size];

  return (
    <button
      type={type}
      className={`${base} ${sizing} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
