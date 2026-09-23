"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BookOpen, FileText, Users, Clock } from "lucide-react";

const stats = [
  { value: "10+", label: "Courses", icon: BookOpen, description: "Expert-led courses", iconBackground: "bg-[#0D2B52]/10", iconColor: "text-[#0D2B52]" },
  { value: "100+", label: "Lessons", icon: FileText, description: "Video & resources", iconBackground: "bg-[#E5A900]/10", iconColor: "text-[#E5A900]" },
  { value: "500+", label: "Learners", icon: Users, description: "Active students", iconBackground: "bg-green-600/10", iconColor: "text-green-600" },
  { value: "24/7", label: "Access", icon: Clock, description: "Anytime, anywhere", iconBackground: "bg-blue-600/10", iconColor: "text-blue-600" },
];

export function StatisticsSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  // Start the counter once when its section first enters the viewport.
  const handleViewportEnter = () => {
    setHasAnimated(true);
    setCounts({});
    stats.forEach((stat) => {
      if (stat.value.includes("+")) {
        const target = parseInt(stat.value.replace(/\D/g, ""), 10);
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * eased);
          setCounts((prev) => ({ ...prev, [stat.label]: current }));
          if (progress < 1) requestAnimationFrame(tick);
          else setCounts((prev) => ({ ...prev, [stat.label]: target }));
        };
        requestAnimationFrame(tick);
      }
    });
  };

  return (
    <motion.section
      id="statistics"
      className="bg-[#F7F9FB] py-14 sm:py-16 lg:py-20"
      aria-labelledby="statistics-heading"
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 id="statistics-heading" className="font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl">
            Growing community of beekeepers
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-[#6B82A6] sm:text-[15px]">Join thousands of learners mastering the art and science of beekeeping.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const animated = counts[stat.label];
            const isPlus = stat.value.includes("+");
            const display = hasAnimated && animated !== undefined && isPlus ? `${animated}+` : stat.value;
            return (
              <StaggerItem key={stat.label} className="h-full">
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-[0_12px_32px_-24px_rgba(13,43,82,0.22)] transition-shadow hover:shadow-[0_16px_32px_-22px_rgba(13,43,82,0.3)] sm:p-6"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBackground}`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} aria-hidden="true" />
                  </span>
                  <motion.p
                    key={display}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 font-sans text-3xl font-bold tabular-nums text-[#0D2B52] sm:text-4xl"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {display}
                  </motion.p>
                  <h3 className="mt-1 font-sans text-sm font-semibold text-[#0D2B52]">{stat.label}</h3>
                  <p className="mt-1 font-sans text-xs leading-5 text-[#6B82A6]">{stat.description}</p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </motion.section>
  );
}
