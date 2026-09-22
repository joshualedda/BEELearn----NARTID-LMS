"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BookOpen, FileText, Users, Clock } from "lucide-react";

const stats = [
  { value: "10+", label: "Courses", icon: BookOpen, description: "Expert-led courses" },
  { value: "100+", label: "Lessons", icon: FileText, description: "Video & resources" },
  { value: "500+", label: "Learners", icon: Users, description: "Active students" },
  { value: "24/7", label: "Access", icon: Clock, description: "Anytime, anywhere" },
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
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="statistics-heading"
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-700">Learning together</p>
          <h2 id="statistics-heading" className="mt-3 font-sans text-3xl font-bold tracking-tight text-[#0D2B52] sm:text-4xl">
            Growing community of beekeepers
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-slate-600 sm:text-[15px]">Learn alongside a growing community building practical, field-ready skills.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-[#0D2B52] shadow-[0_26px_60px_-34px_rgba(13,43,82,0.65)] lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const animated = counts[stat.label];
            const isPlus = stat.value.includes("+");
            const display = hasAnimated && animated !== undefined && isPlus ? `${animated}+` : stat.value;
            return (
              <StaggerItem key={stat.label} className="border-white/10 p-6 text-center even:border-l lg:border-l lg:first:border-l-0 lg:p-8">
                <motion.span
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-colors hover:bg-white/15"
                >
                  <Icon className="h-6 w-6 text-[#E5A900]" aria-hidden="true" />
                </motion.span>
                <motion.p
                  key={display}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 font-sans text-3xl font-bold tabular-nums text-white sm:text-4xl"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {display}
                </motion.p>
                <h3 className="mt-1 font-sans text-sm font-semibold text-white">{stat.label}</h3>
                <p className="mt-1 font-sans text-xs text-[#AFC0D8]">{stat.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </motion.section>
  );
}
