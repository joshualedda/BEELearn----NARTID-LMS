"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BeeIcon } from "@/components/icons/BeeIcon";
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
      className="bg-[#0D2B52] text-white"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold mb-6"
              aria-label="BeeLearn Home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#E5A900]">
                <BeeIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="text-white">Bee</span>
                <span className="text-[#E5A900]">Learn</span>
              </span>
            </Link>

            <p className="text-[#8FA3BF] mb-6 max-w-xs leading-relaxed">
              The official Beekeeping Learning Management System of NARTDI.
              Empowering beekeepers with practical knowledge and skills.
            </p>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#8FA3BF] hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#8FA3BF] hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Bird className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#8FA3BF] hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#8FA3BF] hover:bg-white/20 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Video className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav className="col-span-1" aria-label="Platform">
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-1" aria-label="Support">
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-1" aria-label="Legal">
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8FA3BF] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-[#8FA3BF] text-sm mb-4">
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
                    className="bg-white/5 border-white/10 focus:border-[#E5A900] focus:ring-[#E5A900]/20"
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
                  className="w-full bg-[#E5A900] hover:bg-[#F4C430] text-[#0D2B52] font-semibold"
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