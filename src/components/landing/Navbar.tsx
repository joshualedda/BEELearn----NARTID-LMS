"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#courses", label: "Courses" },
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuToggle = useRef<HTMLButtonElement>(null);
  const restoreOverflow = useRef<(() => void) | null>(null);
  const cancelScroll = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const unlock = () => {
      document.body.style.overflow = previousOverflow;
    };
    restoreOverflow.current = unlock;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) {
        unlock();
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        unlock();
        setIsOpen(false);
        menuToggle.current?.focus();
      }
    };
    desktop.addEventListener("change", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    handleResize();
    return () => {
      unlock();
      restoreOverflow.current = null;
      desktop.removeEventListener("change", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => () => cancelScroll.current?.(), []);

  const closeMenu = () => {
    restoreOverflow.current?.();
    setIsOpen(false);
  };

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = event.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    cancelScroll.current?.();
    closeMenu();

    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    const heading = target.querySelector<HTMLElement>("h2") ?? target;
    const previousTabIndex = heading.getAttribute("tabindex");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    if (previousTabIndex === null) heading.removeAttribute("tabindex");
    else heading.setAttribute("tabindex", previousTabIndex);

    const start = window.scrollY;
    const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 80;
    const destination = Math.max(0, Math.min(
      target.getBoundingClientRect().top + start - offset,
      document.documentElement.scrollHeight - window.innerHeight,
    ));
    if (reduceMotion) {
      window.scrollTo({ top: destination, behavior: "instant" });
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", handleScrollKey);
      window.removeEventListener("popstate", stop);
      cancelScroll.current = null;
    };
    const handleScrollKey = (keyEvent: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape", "Tab"].includes(keyEvent.key)) stop();
    };
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / 300, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      // Explicit instant steps avoid competing with CSS smooth scrolling.
      window.scrollTo({ top: start + (destination - start) * eased, behavior: "instant" });
      if (progress < 1) frame = requestAnimationFrame(step);
      else stop();
    };
    cancelScroll.current = stop;
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", handleScrollKey);
    window.addEventListener("popstate", stop);
    frame = requestAnimationFrame(step);
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-[padding] duration-180 motion-reduce:transition-none ${
        isScrolled ? "px-0 pt-0" : "px-3 pt-3 sm:px-6"
      }`}
      role="banner"
    >
      <nav
        className={`border transition-[padding,border-radius,box-shadow] duration-180 ease-out motion-reduce:transition-none ${
          isScrolled
            ? "mx-auto max-w-6xl rounded-b-2xl border-x border-b border-t-0 border-gray-200 bg-white/95 px-4 shadow-[0_8px_20px_-16px_rgba(13,43,82,0.3)] backdrop-blur sm:px-5"
            : "mx-auto max-w-6xl rounded-2xl border-[#0D2B52]/10 bg-white/95 px-4 shadow-[0_12px_28px_-22px_rgba(13,43,82,0.35)] backdrop-blur sm:px-5"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex gap-2.5 rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            aria-label="BeeLearn Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D2B52] text-sm font-bold text-green-400 ring-1 ring-[#0D2B52]/10">
              B
            </span>
            <span>
              <span className="text-[#0D2B52]">Bee</span>
              <span className="text-green-600">Learn</span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={navigateToSection}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#0D2B52] transition-colors hover:bg-[#F7F9FB] hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                <LogIn className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-lg px-3.5 text-sm shadow-sm">
                <UserPlus className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Get Started
              </Button>
            </Link>
          </div>

          <button
            ref={menuToggle}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#0D2B52] hover:bg-[#F7F9FB] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 md:hidden"
            onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
              role="navigation"
              aria-label="Mobile menu"
            >
              <div className="space-y-2 border-t border-gray-100 pb-4 pt-3">
                {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2.5 text-base font-medium text-[#0D2B52] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E5A900]"
                      onClick={navigateToSection}
                    >
                      {link.label}
                    </a>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Link
                    href="/login"
                    className="block w-full text-left px-3 py-2.5 text-base font-medium text-[#0D2B52] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E5A900]"
                    onClick={closeMenu}
                  >
                    <LogIn className="h-5 w-5 inline mr-2" aria-hidden="true" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-left px-3 py-2.5 text-base font-medium text-white bg-[#0B2343] rounded-lg hover:bg-[#123158] focus:outline-none focus:ring-2 focus:ring-[#E5A900] focus:ring-offset-2"
                    onClick={closeMenu}
                  >
                    <UserPlus className="h-5 w-5 inline mr-2" aria-hidden="true" />
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
