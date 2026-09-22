"use client";

import { motion } from "framer-motion";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
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
    <section id="features" className="relative overflow-hidden bg-[#F7F9FB] py-16 sm:py-20 lg:py-24" aria-labelledby="features-heading">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#E5A900]/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            align="center"
            headingId="features-heading"
            eyebrow="Your learning toolkit"
            title="Everything you need to learn beekeeping"
            description="Structured lessons, practical resources, and clear progress—all in one place."
          />
        </FadeIn>

        <StaggerContainer className="relative mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_35px_-26px_rgba(13,43,82,0.42)] transition-[border-color,box-shadow] duration-300 hover:border-[#E5A900]/60 hover:shadow-[0_24px_45px_-24px_rgba(13,43,82,0.32)]"
                >
                  <span aria-hidden="true" className="absolute right-5 top-4 text-5xl font-bold tracking-tighter text-[#0D2B52]/[0.05]">0{index + 1}</span>
                  <span className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${feature.bg}`} aria-hidden="true">
                    <Icon className={`h-6 w-6 ${feature.iconClass}`} />
                  </span>
                  <h3 className="mt-6 font-sans text-lg font-bold text-[#0D2B52]">{feature.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-6 text-slate-600">{feature.description}</p>
                  <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-[#E5A900] transition-transform duration-300 group-hover:scale-x-100" />
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
