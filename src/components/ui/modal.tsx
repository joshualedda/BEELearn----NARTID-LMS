"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalWidth = "sm" | "md" | "lg" | "xl" | "2xl";

const widthClasses: Record<ModalWidth, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

interface ModalProps {
  children: ReactNode;
  show?: boolean;
  maxWidth?: ModalWidth;
  closeable?: boolean;
  onClose?: () => void;
}

export function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (show && !dialog.open) dialog.showModal();
    if (!show && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [show]);

  return <dialog
    ref={dialogRef}
    onCancel={(event) => { event.preventDefault(); if (closeable) onClose?.(); }}
    onClick={(event) => { if (closeable && event.target === event.currentTarget) onClose?.(); }}
    className={`m-auto max-h-[calc(100vh-3rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-lg bg-white p-0 shadow-xl backdrop:bg-gray-500/75 ${widthClasses[maxWidth]}`}
  >{children}</dialog>;
}
