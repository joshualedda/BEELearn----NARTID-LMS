"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useId, useRef, useState, type ComponentProps, type ReactNode, type RefObject } from "react";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown parts must be inside Dropdown");
  return context;
}

function DropdownRoot({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <DropdownContext.Provider value={{ open, setOpen, contentId, triggerRef }}>
    <div ref={containerRef} className="relative">{children}</div>
  </DropdownContext.Provider>;
}

function DropdownTrigger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { open, setOpen, contentId, triggerRef } = useDropdown();
  return <button ref={triggerRef} type="button" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen(!open)} className={`focus-visible:outline-2 focus-visible:outline-indigo-500 ${className}`}>{children}</button>;
}

function DropdownContent({ children, align = "right", width = "48", contentClasses = "bg-white py-1" }: {
  children: ReactNode;
  align?: "left" | "right";
  width?: "48" | "auto";
  contentClasses?: string;
}) {
  const { open, contentId } = useDropdown();
  if (!open) return null;
  return <div id={contentId} className={`absolute z-50 mt-2 rounded-md shadow-lg ${align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"} ${width === "48" ? "w-48" : "w-auto"}`}>
    <div className={`rounded-md ring-1 ring-black/5 ${contentClasses}`}>{children}</div>
  </div>;
}

function DropdownLink({ children, className = "", onClick, ...props }: ComponentProps<typeof Link>) {
  const { setOpen } = useDropdown();
  return <Link {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) setOpen(false); }} className={`block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${className}`}>{children}</Link>;
}

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Link: DropdownLink,
});
