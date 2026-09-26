"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { BeeIcon } from "@/components/icons/BeeIcon";
import type { Role } from "@/constants/roles";
import { getRoleHome } from "@/utils/permissions";
import { adminSidebar } from "./sidebar/AdminSidebar";
import { instructorSidebar } from "./sidebar/InstructorSidebar";
import { learnerSidebar } from "./sidebar/LearnerSidebar";
import type { SidebarItem } from "./sidebar/types";

const menus: Record<Role, SidebarItem[]> = {
  learner: learnerSidebar,
  instructor: instructorSidebar,
  admin: adminSidebar,
};

const roleNames: Record<Role, string> = {
  learner: "Student",
  instructor: "Instructor",
  admin: "Administrator",
};

function subscribeToHash(notify: () => void) {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}

function isActive(item: SidebarItem, pathname: string, hash: string, role: Role) {
  if (!item.href) return false;
  const [path, itemHash] = item.href.split("#");
  if (itemHash === "my-courses" && pathname.startsWith(`/${role}/courses/`)) return true;
  if (path !== pathname) return false;
  return itemHash ? hash === `#${itemHash}` : hash !== "#my-courses";
}

function SidebarContent({ role, pathname, hash, onNavigate }: {
  role: Role;
  pathname: string;
  hash: string;
  onNavigate: () => void;
}) {
  return <div className="flex h-full flex-col">
    <div className="border-b border-slate-200 px-5 py-6">
      <Link href={getRoleHome(role)} onClick={onNavigate} className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500">
        <span className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><BeeIcon className="size-7" /></span>
        <span><span className="block text-lg font-bold tracking-tight text-[#0D2B52]">BeeLearn</span>
          <span className="block text-xs font-medium text-slate-500">{roleNames[role]} workspace</span></span>
      </Link>
    </div>
    <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label={`${roleNames[role]} navigation`}>
      <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Workspace</p>
      <ul className="space-y-1">{menus[role].map((item) => {
        const Icon = item.icon;
        const active = isActive(item, pathname, hash, role);
        return <li key={item.label}>
          {item.href ? <Link href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${active
              ? "bg-[#0D2B52] text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 hover:text-[#0D2B52]"}`}>
            <Icon className={`size-[18px] shrink-0 ${active ? "text-[#F4C430]" : "text-slate-500"}`} aria-hidden="true" />
            <span>{item.label}</span>
          </Link> : <span aria-disabled="true" className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400">
            <Icon className="size-[18px] shrink-0" aria-hidden="true" />
            <span className="flex-1">{item.label}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Soon</span>
          </span>}
        </li>;
      })}</ul>
    </nav>
    <div className="border-t border-slate-200 p-4">
      <LogoutButton label="Logout" icon={<LogOut className="size-4" aria-hidden="true" />}
        className="w-full justify-start border-slate-200 text-slate-700 hover:bg-slate-50" />
    </div>
  </div>;
}

export function DashboardShell({ role, displayName, children }: {
  role: Role;
  displayName: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLElement>(null);
  const activeItem = menus[role].find((item) => isActive(item, pathname, hash, role));
  const pageTitle = activeItem?.label ?? (pathname.includes("/courses/") ? "Course" : "Workspace");

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    document.addEventListener("keydown", onEscape);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  function closeMobile(restoreFocus = true) {
    setMobileOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }

  function trapFocus(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !mobilePanel.current) return;
    const focusable = [...mobilePanel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <div className="flex min-h-screen w-full bg-[#F7F9FB] text-[#0D2B52]">
    <a href="#dashboard-main" className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#0D2B52] focus:shadow-lg">
      Skip to content
    </a>
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
      <SidebarContent role={role} pathname={pathname} hash={hash} onNavigate={() => {}} />
    </aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex min-h-18 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <button ref={menuButton} type="button" aria-label="Open navigation" aria-controls="dashboard-mobile-navigation"
          aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}
          className="flex size-10 items-center justify-center rounded-lg text-[#0D2B52] hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-amber-500 lg:hidden">
          <Menu className="size-5" aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500">{roleNames[role]} workspace</p>
          <p className="truncate text-base font-semibold sm:text-lg">{pageTitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-right sm:block"><span className="block max-w-48 truncate text-sm font-semibold">{displayName}</span>
            <span className="block text-xs text-slate-500">{roleNames[role]}</span></span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-[#0D2B52]" aria-hidden="true">
            {displayName.trim().charAt(0).toUpperCase() || "B"}
          </span>
        </div>
      </header>
      <main id="dashboard-main" tabIndex={-1} className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
    {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close navigation" onClick={() => closeMobile()}
        className="absolute inset-0 bg-[#0B2343]/55" />
      <aside ref={mobilePanel} id="dashboard-mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation"
        onKeyDown={trapFocus} className="relative h-full w-[min(18rem,calc(100vw-3rem))] bg-white shadow-2xl">
        <button ref={closeButton} type="button" aria-label="Close navigation" onClick={() => closeMobile()}
          className="absolute right-3 top-6 z-10 flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-amber-500">
          <X className="size-5" aria-hidden="true" />
        </button>
        <SidebarContent role={role} pathname={pathname} hash={hash} onNavigate={() => closeMobile(false)} />
      </aside>
    </div>}
  </div>;
}
