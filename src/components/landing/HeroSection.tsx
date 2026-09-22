"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowRight, Check, Users, BookOpen, Play } from "lucide-react";

export function HeroSection() {
  const stats = [
    { value: "10+", label: "Courses" },
    { value: "100+", label: "Lessons" },
    { value: "500+", label: "Learners" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-16"
      aria-labelledby="hero-heading"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,43,82,0.07),_transparent_60%)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='%23E5A900' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* left */}
          <FadeIn className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-green-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Official NARTDI • DMMMSU Platform
            </motion.span>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-sans text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              <span className="text-[#0D2B52]">Bee</span>
              <span className="text-[#E5A900]">Learn</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-3 font-sans text-xl font-bold leading-tight text-[#0D2B52] sm:text-2xl lg:text-[1.7rem]"
            >
              Learn beekeeping. <span className="text-[#E5A900]">Anytime, anywhere.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mx-auto mt-4 max-w-xl font-sans text-[15px] leading-7 text-[#5B6B8A] lg:mx-0 sm:text-base"
            >
              Build practical beekeeping knowledge through guided courses, expert resources, and hands-on learning — designed for beginners to advanced beekeepers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 shadow-md">
                  Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="#courses" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 border-[#E5A900]/30 text-[#0D2B52] hover:border-[#E5A900] hover:bg-[#E5A900]/10"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-6 sm:gap-8 lg:justify-start"
            >
              <StaggerContainer className="flex flex-wrap items-center gap-6 sm:gap-8">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label} className="flex items-baseline gap-2">
                    <span className="font-sans text-xl font-bold text-[#0D2B52]">{stat.value}</span>
                    <span className="font-sans text-sm text-[#8FA3BF]">{stat.label}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <span className="hidden h-4 w-px bg-gray-200 sm:block" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-[#8FA3BF]">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-500" /> Free to start
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-500" /> Self-paced
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-500" /> Certificate
                </span>
              </div>
            </motion.div>
          </FadeIn>

          {/* right visual */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
          >
            <div className="relative overflow-hidden rounded-[24px] border border-gray-100 bg-gradient-to-br from-[#F7F9FB] to-white p-6 shadow-[0_20px_60px_-24px_rgba(13,43,82,0.25)] sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D2B52] text-[#E5A900]">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-[#0D2B52]">Active Learning</p>
                    <p className="font-sans text-xs text-[#8FA3BF]">Your progress overview</p>
                  </div>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="rounded-full bg-green-50 px-2.5 py-1 font-sans text-xs font-medium text-green-700"
                >
                  Live
                </motion.span>
              </div>

              <div className="relative flex justify-center">
                <motion.img
                  src="/images/landing/hero-beekeeping.svg"
                  alt="BeeLearn platform illustration"
                  className="h-auto w-full max-w-[360px] drop-shadow-xl"
                  loading="eager"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,_rgba(229,169,0,0.12),_transparent_50%),_radial-gradient(circle_at_80%_80%,_rgba(13,43,82,0.06),_transparent_50%)]" aria-hidden="true" />
              </div>

              <StaggerContainer className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: "Lessons", v: "12/18", p: "66%" },
                  { k: "Quizzes", v: "8/10", p: "80%" },
                  { k: "Streak", v: "14 days", p: "🔥" },
                ].map((item) => (
                  <StaggerItem key={item.k} className="rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm">
                    <p className="font-sans text-xs text-[#8FA3BF]">{item.k}</p>
                    <p className="mt-1 font-sans text-sm font-bold text-[#0D2B52]">{item.v}</p>
                    <p className="font-sans text-[11px] font-medium text-green-600">{item.p}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12, x: -8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="absolute -bottom-4 -left-2 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:flex sm:-left-6"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50"
              >
                <Play className="h-5 w-5 text-green-600" aria-hidden="true" />
              </motion.span>
              <div>
                <p className="font-sans text-xs text-[#8FA3BF]">Featured Lesson</p>
                <p className="font-sans text-sm font-semibold text-[#0D2B52]">Intro to Beekeeping</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12, x: 8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="absolute -right-2 -top-4 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:flex sm:-right-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5A900]/10">
                <Users className="h-5 w-5 text-[#E5A900]" aria-hidden="true" />
              </span>
              <div>
                <p className="font-sans text-lg font-bold leading-none text-[#0D2B52]">500+</p>
                <p className="font-sans text-xs text-[#8FA3BF]">Active learners</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
