"use client";

import { motion } from "framer-motion";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Globe, Zap, Clock, Leaf, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Learn from Anywhere",
    description: "Access courses on any device. Download lessons for offline viewing when you're out with your hives.",
    bg: "bg-[#0D2B52]/10",
    iconClass: "text-[#0D2B52]",
  },
  {
    icon: Zap,
    title: "Practical & Accessible",
    description: "Real-world techniques from experienced practitioners — clear, actionable knowledge you can apply immediately.",
    bg: "bg-[#E5A900]/10",
    iconClass: "text-[#E5A900]",
  },
  {
    icon: Clock,
    title: "Progress at Your Own Pace",
    description: "No deadlines, no pressure. Lifetime access so you can revisit lessons season after season.",
    bg: "bg-green-600/10",
    iconClass: "text-green-600",
  },
];

const trustSignals = [
  { icon: Shield, label: "Expert Instructors", description: "Certified beekeepers & researchers" },
  { icon: Award, label: "Accredited Content", description: "NARTDI & DMMMSU approved" },
  { icon: Leaf, label: "Sustainable Practices", description: "Eco-friendly, science-based" },
];

export function WhyBeeLearnSection() {
  return (
    <section id="about" className="bg-[#F7F9FB] py-16 sm:py-20 lg:py-24" aria-labelledby="why-beelearn-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            align="center"
            headingId="why-beelearn-heading"
            eyebrow="Why BeeLearn"
            title="Learn. Practice. Grow."
            description="Trusted guidance that moves with you—from the first lesson to the next season at the hive."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <StaggerItem key={benefit.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_14px_34px_-26px_rgba(13,43,82,0.45)] transition-[border-color,box-shadow] duration-300 hover:border-[#E5A900]/55 hover:shadow-[0_24px_44px_-24px_rgba(13,43,82,0.32)]"
                >
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${benefit.bg}`} aria-hidden="true">
                    <Icon className={`h-6 w-6 ${benefit.iconClass}`} />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-bold text-[#0D2B52]">{benefit.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-6 text-slate-600">{benefit.description}</p>
                  <span aria-hidden="true" className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-[#E5A900]/0 transition-colors duration-300 group-hover:bg-[#E5A900]/10" />
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <StaggerItem key={signal.label}>
                <motion.article
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-[#E5A900]/20 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <Icon className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#0D2B52]">{signal.label}</h4>
                    <p className="font-sans text-xs leading-5 text-[#6B82A6]">{signal.description}</p>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
