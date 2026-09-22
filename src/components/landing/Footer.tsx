"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Globe,
  Bird,
  Camera,
  Video,
  ArrowRight,
  Check,
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Courses", href: "/learner/courses" },
    { label: "About Us", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Contact", href: "#contact" },
    { label: "Instructors", href: "/instructors" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/faq" },
    { label: "Community Forum", href: "/forum" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "API Docs", href: "/api-docs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
  resources: [
    { label: "Beekeeping Blog", href: "/blog" },
    { label: "Free Guides", href: "/guides" },
    { label: "Seasonal Calendar", href: "/calendar" },
    { label: "Equipment Checklist", href: "/checklist" },
    { label: "Glossary", href: "/glossary" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer
      className="border-t-4 border-[#E5A900] bg-[#0D2B52] text-white"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-2 lg:col-span-3">
            <Link
              href="/"
              className="mb-5 flex items-center gap-2.5 text-xl font-bold"
              aria-label="BeeLearn Home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-green-400 ring-1 ring-white/15">
                B
              </span>
              <span>
                <span className="text-white">Bee</span>
                <span className="text-green-400">Learn</span>
              </span>
            </Link>

            <p className="mb-6 max-w-sm leading-relaxed text-[#C7D5EA]">
              The official Beekeeping Learning Management System of NARTDI.
              Empowering beekeepers with practical knowledge and skills.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C7D5EA] transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Facebook"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C7D5EA] transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Twitter"
              >
                <Bird className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C7D5EA] transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#C7D5EA] transition-colors hover:bg-white/20 hover:text-white"
                aria-label="YouTube"
              >
                <Video className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav className="col-span-1 lg:col-span-2" aria-label="Platform">
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-1 lg:col-span-2" aria-label="Support">
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-1 lg:col-span-2" aria-label="Legal">
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 self-start rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-3">
            <h3 className="mb-2 font-semibold text-white">Newsletter</h3>
            <p className="mb-4 text-sm text-[#C7D5EA]">
              Get beekeeping tips, course updates, and seasonal advice delivered
              to your inbox.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
                <p className="text-green-300">
                  Thanks for subscribing! Check your inbox soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Label htmlFor="footer-email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="footer-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputClassName="border-white/15 bg-white/10 text-white placeholder:text-[#8FA3BF] focus:border-[#E5A900] focus:ring-[#E5A900]/20 disabled:bg-white/5"
                    aria-describedby={error ? "footer-email-error" : undefined}
                    disabled={submitted}
                  />
                </div>
                {error && (
                  <p id="footer-email-error" className="text-red-400 text-sm" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-[#E5A900] font-semibold text-[#0D2B52] hover:bg-[#F4C430]"
                  disabled={submitted}
                >
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-[#6B82A6] text-sm">
              © 2026 NARTDI — Don Mariano Marcos Memorial State University. All
              rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-[#6B82A6]">
              <span className="font-medium text-white">BeeLearn</span>
              <span>Official NARTDI Portal</span>
              <span>DMMMSU</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
