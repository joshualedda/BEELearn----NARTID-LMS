"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1 font-sans text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            Why BeeLearn
          </span>
          <h2 id="why-beelearn-heading" className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl lg:text-4xl">
            Learn. Practice. Grow.
          </h2>
          <p className="mt-3 font-sans text-[15px] leading-6 text-[#6B82A6]">
            BeeLearn brings structured learning materials together in one trusted platform for beekeepers at every level.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <StaggerItem key={benefit.title}>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="h-full border-gray-100 transition-all duration-300 hover:border-[#E5A900]/30 hover:shadow-[0_12px_32px_-16px_rgba(13,43,82,0.15)]">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg}`}
                      >
                        <Icon className={`h-6 w-6 ${benefit.iconClass}`} />
                      </motion.div>
                      <h3 className="mt-4 font-sans text-[15px] font-bold text-[#0D2B52]">{benefit.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-6 text-[#6B82A6]">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
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
