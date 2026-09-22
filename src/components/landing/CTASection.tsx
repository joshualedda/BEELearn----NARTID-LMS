"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0D2B52] py-16 sm:py-20 lg:py-24" aria-labelledby="cta-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,#0D2B52_0%,#123B6D_58%,#0D2B52_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='%23E5A900' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E5A900]/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 id="cta-heading" className="font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready to start your beekeeping journey?
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-6 text-[#C7D5EA] sm:text-[15px]">
            Join 500+ learners building practical beekeeping skills with trusted, field-tested courses.
          </p>
        </FadeIn>

        <FadeIn delay={0.14} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="w-full rounded-lg bg-[#E5A900] px-7 font-sans text-[#0D2B52] shadow-[0_14px_28px_-14px_rgba(229,169,0,0.85)] hover:bg-[#F4C430] hover:shadow-[0_18px_32px_-14px_rgba(229,169,0,0.95)]">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
          <Link href="#courses" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" className="w-full rounded-lg border-white/35 bg-white/5 px-7 font-sans text-white shadow-none hover:border-white/60 hover:bg-white hover:text-[#0D2B52]">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Explore Courses
              </Button>
            </motion.div>
          </Link>
        </FadeIn>

        <FadeIn delay={0.22} className="mt-8 flex flex-wrap items-center justify-center gap-5 font-sans text-xs text-[#C7D5EA]">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-400" /> Free to start
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-400" /> Lifetime access
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-400" /> Certificate included
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
