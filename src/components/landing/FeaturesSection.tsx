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
    <section id="features" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="features-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 font-sans text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            Platform Features
          </span>
          <h2 id="features-heading" className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl lg:text-4xl">
            Everything you need to learn beekeeping
          </h2>
          <p className="mt-3 font-sans text-[15px] leading-6 text-[#6B82A6] sm:text-base">
            A comprehensive platform designed to take you from curious beginner to confident beekeeper.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="h-full"
                >
                  <Card className="h-full border-gray-100 transition-all duration-300 hover:border-[#E5A900]/30 hover:shadow-[0_12px_32px_-16px_rgba(13,43,82,0.15)]">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                        aria-hidden="true"
                      >
                        <Icon className={`h-6 w-6 ${feature.iconClass}`} />
                      </motion.div>
                      <h3 className="mt-4 font-sans text-[15px] font-bold text-[#0D2B52]">{feature.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-6 text-[#6B82A6]">{feature.description}</p>
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
