"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, House, LogOut, Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import type { Role } from "@/constants/roles";
import { getRoleHome } from "@/utils/permissions";
import { AccountMenu } from "./AccountMenu";
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
  learner: "Learner",
  instructor: "Instructor",
  admin: "Administrator",
};

function getInitials(displayName: string) {
  return displayName.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "B";
}

function subscribeToHash(notify: () => void) {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}

function isActive(
  item: SidebarItem,
  pathname: string,
  hash: string,
  role: Role,
) {
  if (!item.href) return false;
  const [path, itemHash] = item.href.split("#");
  if (itemHash === "my-courses" && pathname.startsWith(`/${role}/courses/`))
    return true;
  if (path !== pathname) return false;
  return itemHash ? hash === `#${itemHash}` : hash !== "#my-courses";
}

function SidebarContent({
  role,
  pathname,
  hash,
  displayName,
  onNavigate,
}: {
  role: Role;
  pathname: string;
  hash: string;
  displayName: string;
  onNavigate: () => void;
}) {
  const initials = getInitials(displayName);
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-5 pt-6">
        <Link
          href={getRoleHome(role)}
          onClick={onNavigate}
          className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
        >
          <span className="block text-lg font-bold tracking-tight text-slate-800">BeeLearn</span>
          <span className="block text-xs font-medium text-emerald-600">{roleNames[role]} Workspace</span>
        </Link>
      </div>
      <nav
        className="dashboard-sidebar-scroll min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-2"
        aria-label={`${roleNames[role]} navigation`}
      >
        {role !== "admin" && (
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Navigation
          </p>
        )}
        <ul className="space-y-1">
          {menus[role].map((item) => {
            const Icon = item.icon;
            const active = isActive(item, pathname, hash, role);
            return <Fragment key={item.label}>
              {item.section && <li className="px-3 pb-2 pt-4 first:pt-0">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.section}</h2>
              </li>}
              <li>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${active
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}
                  >
                    <Icon
                      className={`size-[18px] shrink-0 ${active ? "text-emerald-100" : "text-slate-400"}`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400"
                  >
                    <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                    <span className="flex-1">{item.label}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Soon
                    </span>
                  </span>
                )}
              </li>
            </Fragment>;
          })}
        </ul>
      </nav>
      <div className="space-y-3 px-4 pb-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 p-3.5 text-white">
          <span
            className="absolute -right-6 -top-6 size-24 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-3">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xs font-bold"
              aria-hidden="true"
            >
              {initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold">
                {displayName}
              </span>
              <span className="block text-[10px] font-semibold text-emerald-100">
                {roleNames[role]}
              </span>
            </span>
          </div>
        </div>
        <LogoutButton
          label="Logout"
          icon={<LogOut className="size-4" aria-hidden="true" />}
          className="w-full justify-start border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
        />
      </div>
    </div>
  );
}

export function DashboardShell({
  role,
  displayName,
  email,
  children,
}: {
  role: Role;
  displayName: string;
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLElement>(null);
  const activeItem = menus[role].find((item) =>
    isActive(item, pathname, hash, role),
  );
  const pageTitle =
    activeItem?.label ??
    (pathname.includes("/courses/") ? "Course" : "Workspace");
  const initials = getInitials(displayName);

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
    const onResize = () => {
      if (desktop.matches) setMobileOpen(false);
    };
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
    const focusable = [
      ...mobilePanel.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      ),
    ];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC] text-slate-800">
      <a
        href="#dashboard-main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:not-sr-only focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-800 focus:shadow-lg"
      >
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen w-[268px] shrink-0 border-r border-slate-100 bg-white shadow-xl shadow-slate-200/60 lg:block">
        <SidebarContent
          role={role}
          pathname={pathname}
          hash={hash}
          displayName={displayName}
          onNavigate={() => {}}
        />
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[70px] items-center gap-3 border-b border-slate-100 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            ref={menuButton}
            type="button"
            aria-label="Open navigation"
            aria-controls="dashboard-mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-500 lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <House
              className="hidden size-4 shrink-0 text-slate-300 sm:block"
              aria-hidden="true"
            />
            <ChevronRight
              className="hidden size-3 shrink-0 text-slate-300 sm:block"
              aria-hidden="true"
            />
            <h1 className="truncate text-sm font-bold text-slate-700">
              {pageTitle}
            </h1>
          </div>
          <AccountMenu role={role} roleLabel={roleNames[role]} displayName={displayName} email={email} initials={initials} />
        </header>
        <main
          id="dashboard-main"
          tabIndex={-1}
          className="w-full p-4 sm:p-6 lg:p-8"
        >
          {children}
        </main>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => closeMobile()}
            className="absolute inset-0 bg-slate-900/50"
          />
          <aside
            ref={mobilePanel}
            id="dashboard-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            onKeyDown={trapFocus}
            className="relative h-full w-[min(18rem,calc(100vw-3rem))] bg-white shadow-2xl"
          >
            <button
              ref={closeButton}
              type="button"
              aria-label="Close navigation"
              onClick={() => closeMobile()}
              className="absolute right-3 top-6 z-10 flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-500"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <SidebarContent
              role={role}
              pathname={pathname}
              hash={hash}
              displayName={displayName}
              onNavigate={() => closeMobile(false)}
            />
          </aside>
        </div>
      )}
    </div>
  );
}
