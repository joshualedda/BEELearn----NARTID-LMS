"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BookOpen, Play, FileText, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description: "Organized lessons from beginner to advanced. Curriculum designed by beekeeping experts and agricultural educators.",
    bg: "bg-[#0D2B52]/10",
    iconClass: "text-[#0D2B52]",
  },
  {
    icon: Play,
    title: "Video Lessons",
    description: "Practical demonstrations and high-quality videos — hive inspections, honey harvesting, and field techniques.",
    bg: "bg-[#E5A900]/10",
    iconClass: "text-[#E5A900]",
  },
  {
    icon: FileText,
    title: "Learning Resources",
    description: "Downloadable guides, checklists, seasonal calendars and troubleshooting resources for every situation.",
    bg: "bg-green-600/10",
    iconClass: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Personal dashboard with progress tracking, badges, and personalized next steps for your journey.",
    bg: "bg-blue-600/10",
    iconClass: "text-blue-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[#F7F9FB] py-16 sm:py-20 lg:py-24" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-10 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <h2 id="features-heading" className="font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl">
              Everything you need to learn beekeeping
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-[15px] leading-6 text-slate-500 sm:text-base">
              A comprehensive platform designed to take you from curious beginner to confident beekeeper.
            </p>
          </div>
          <div className="rounded-2xl bg-[#0D2B52] p-5 text-white shadow-[0_16px_32px_-24px_rgba(13,43,82,0.75)]">
            <p className="text-sm font-semibold">Built for learning that fits your schedule.</p>
            <p className="mt-1 text-sm leading-6 text-[#C7D5EA]">Study lessons, revisit resources, and track every step forward.</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="h-full"
                >
                  <Card className="h-full rounded-2xl border-gray-200 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#0D2B52]/20 hover:shadow-[0_16px_32px_-24px_rgba(13,43,82,0.3)]">
                    <CardContent className="flex h-full flex-col p-6">
                      <span className="text-xs font-semibold tracking-[0.14em] text-slate-400">0{index + 1}</span>
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className={`mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}
                        aria-hidden="true"
                      >
                        <Icon className={`h-6 w-6 ${feature.iconClass}`} />
                      </motion.div>
                      <h3 className="mt-5 font-sans text-base font-bold text-[#0D2B52]">{feature.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-6 text-slate-500">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
