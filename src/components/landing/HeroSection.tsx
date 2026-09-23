"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const stats = [
  { value: "10+", label: "Courses" },
  { value: "100+", label: "Lessons" },
  { value: "500+", label: "Learners" },
];

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-white pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,_rgba(229,169,0,0.14),_transparent_28%),radial-gradient(circle_at_90%_42%,_rgba(22,64,122,0.1),_transparent_33%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full border-[28px] border-green-100/70" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full border-[22px] border-[#E5A900]/10" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 lg:py-28">
        <FadeIn className="mx-auto max-w-3xl">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-4xl font-bold leading-[1.05] tracking-tight text-[#0D2B52] sm:text-5xl lg:text-6xl"
          >
            Grow your confidence. <span className="text-green-700">Care for every hive.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Build practical beekeeping knowledge through guided courses, expert resources, and hands-on learning—designed for beginners to advanced beekeepers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-full bg-[#0D2B52] px-7 shadow-[0_14px_24px_-14px_rgba(13,43,82,0.55)] hover:bg-[#16407A] sm:w-auto">
                Start learning <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="#courses" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full rounded-full border-[#0D2B52]/20 bg-white/80 px-7 hover:border-[#E5A900] hover:bg-[#FFF9E8] sm:w-auto">
                <BookOpen className="h-4 w-4 text-green-700" aria-hidden="true" />
                Explore courses
              </Button>
            </Link>
          </motion.div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-[#F7F9FB]/90 px-5 py-6 shadow-[0_16px_32px_-28px_rgba(13,43,82,0.35)] sm:px-8"
        >
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex items-baseline gap-2">
                <span className="font-sans text-2xl font-bold text-[#0D2B52]">{stat.value}</span>
                <span className="font-sans text-sm text-slate-600">{stat.label}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
            {["Free to start", "Self-paced", "Certificate included"].map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                {benefit}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
