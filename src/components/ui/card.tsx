import type { ComponentProps, HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white shadow-lg ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={`flex flex-col gap-1.5 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3 className={`text-lg font-bold text-[#0D2B52] ${className}`} {...props} />
  );
}

export function CardDescription({ className = "", ...props }: CardProps) {
  return (
    <p className={`text-sm text-slate-500 ${className}`} {...props} />
  );
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={`pt-6 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardProps) {
  return <div className={`flex items-center pt-6 ${className}`} {...props} />;
}
