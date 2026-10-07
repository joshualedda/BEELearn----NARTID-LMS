"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import type { Role } from "@/constants/roles";

export function AccountMenu({ role, roleLabel, displayName, email, initials }: {
  role: Role;
  roleLabel: string;
  displayName: string;
  email: string;
  initials: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileHref = role === "learner" ? "/learner/profile" : null;

  useEffect(() => {
    if (!open) return;

    function onOutsidePointer(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onOutsideFocus(event: FocusEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("pointerdown", onOutsidePointer);
    document.addEventListener("focusin", onOutsideFocus);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.removeEventListener("focusin", onOutsideFocus);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return <div ref={containerRef} className="relative shrink-0">
    <button
      ref={buttonRef}
      type="button"
      aria-label={`Account menu for ${displayName}`}
      aria-haspopup="true"
      aria-controls={open ? "dashboard-account-menu" : undefined}
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      className="group flex items-center gap-2.5 rounded-xl p-1.5 text-left transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-500"
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 text-xs font-bold text-white shadow-sm shadow-emerald-200 transition-shadow group-hover:shadow-emerald-300" aria-hidden="true">
        {initials}
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-600" />
      </span>
      <span className="hidden text-left lg:block">
        <span className="block max-w-48 truncate text-xs font-bold text-slate-800">{displayName}</span>
        <span className="block text-[10px] font-bold uppercase tracking-wide text-emerald-600">{roleLabel}</span>
      </span>
      <ChevronDown className={`hidden size-4 text-slate-400 transition-transform lg:block ${open ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>

    {open && <div id="dashboard-account-menu" role="group" aria-label="Account options" className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
      <div className="bg-gradient-to-br from-emerald-600 to-green-800 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-lg font-bold" aria-hidden="true">{initials}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{displayName}</p>
            {email && <p className="mt-0.5 truncate text-[10px] font-medium text-emerald-100">{email}</p>}
            <span className="mt-1.5 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">{roleLabel}</span>
          </div>
        </div>
      </div>
      <div className="p-2">
        {profileHref ? <Link href={profileHref} onClick={() => setOpen(false)} className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-500">
          <UserRound className="size-4" aria-hidden="true" />My Profile
        </Link> : <span aria-disabled="true" className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-400">
          <UserRound className="size-4" aria-hidden="true" />My Profile<span className="ml-auto text-[10px] uppercase tracking-wide">Soon</span>
        </span>}
      </div>
      <div className="border-t border-slate-100 p-2">
        <LogoutButton label="Sign Out" icon={<LogOut className="size-4" aria-hidden="true" />} variant="ghost"
          className="w-full justify-start rounded-xl px-3 !text-rose-600 hover:!bg-rose-50" />
      </div>
    </div>}
  </div>;
}
