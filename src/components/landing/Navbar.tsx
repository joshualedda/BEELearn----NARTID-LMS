"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BeeIcon } from "@/components/icons/BeeIcon";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#courses", label: "Courses" },
  { href: "/#about", label: "About" },
  { href: "/#resources", label: "Resources" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-6"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#E5A900] focus:ring-offset-2 rounded-md"
            aria-label="BeeLearn Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D2B52] text-[#E5A900]">
              <BeeIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="text-[#0D2B52]">Bee</span>
              <span className="text-[#E5A900]">Learn</span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0D2B52] transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#E5A900] focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {link.label}
              </Link>
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
              <Button size="sm" className="text-sm">
                <UserPlus className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Get Started
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#0D2B52] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E5A900] focus:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
              role="navigation"
              aria-label="Mobile menu"
            >
              <div className="pt-4 space-y-2 border-t border-gray-100 pb-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-3 py-2.5 text-base font-medium text-[#0D2B52] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E5A900]"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
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