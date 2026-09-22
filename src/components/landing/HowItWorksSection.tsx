"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Target, Play, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Choose a Course",
    description: "Browse by level and interest — from fundamentals to advanced techniques. Find your perfect path.",
    bg: "bg-[#0D2B52]/10",
    iconClass: "text-[#0D2B52]",
  },
  {
    number: "02",
    icon: Play,
    title: "Learn at Your Own Pace",
    description: "Watch lessons, read guides, and access resources anytime. Lifetime access fits your schedule.",
    bg: "bg-[#E5A900]/10",
    iconClass: "text-[#E5A900]",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Complete lessons, earn certificates, and apply knowledge to your own hives with confidence.",
    bg: "bg-green-600/10",
    iconClass: "text-green-600",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 font-sans text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            How It Works
          </span>
          <h2 id="how-it-works-heading" className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl lg:text-4xl">
            Start learning in three simple steps
          </h2>
          <p className="mt-3 font-sans text-[15px] leading-6 text-[#6B82A6]">BeeLearn makes beekeeping education easy to start.</p>
        </FadeIn>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5 }}
            className="pointer-events-none absolute left-0 top-[48px] hidden h-px w-full bg-gradient-to-r from-transparent via-[#E5A900]/25 to-transparent lg:block"
            aria-hidden="true"
          />

          <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.number} className="text-center">
                  <motion.div whileHover={{ y: -4 }} className="mx-auto mb-5 flex flex-col items-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.45 }}
                      className="font-sans text-3xl font-bold tracking-tight text-[#E5A900]/80"
                    >
                      {step.number}
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className={`mt-3 flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg}`}
                    >
                      <Icon className={`h-7 w-7 ${step.iconClass}`} />
                    </motion.span>
                  </motion.div>
                  <h3 className="font-sans text-[15px] font-bold text-[#0D2B52]">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-sm font-sans text-sm leading-6 text-[#6B82A6]">{step.description}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <p className="font-sans text-sm text-[#6B82A6]">Ready to begin?</p>
          <Link href="/register" className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-green-600 hover:text-green-700">
            Create your free account <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>→</motion.span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
