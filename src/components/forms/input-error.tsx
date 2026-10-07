import type { HTMLAttributes } from "react";

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string | null;
}

export function InputError({ message, className = "", ...props }: InputErrorProps) {
  if (!message) return null;
  return <p role="alert" className={`text-sm text-red-600 ${className}`} {...props}>{message}</p>;
}
