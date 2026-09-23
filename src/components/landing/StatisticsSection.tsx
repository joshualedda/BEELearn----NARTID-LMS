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
      className="relative overflow-hidden bg-[#0D2B52] py-16 sm:py-20 lg:py-24"
      aria-labelledby="statistics-heading"
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='%23E5A900' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="statistics-heading" className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Growing community of beekeepers
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-[#8FA3BF] sm:text-[15px]">Join thousands of learners mastering the art and science of beekeeping.</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const animated = counts[stat.label];
            const isPlus = stat.value.includes("+");
            const display = hasAnimated && animated !== undefined && isPlus ? `${animated}+` : stat.value;
            return (
              <StaggerItem key={stat.label} className="text-center">
                <motion.span
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10"
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
                <p className="mt-1 font-sans text-xs text-[#8FA3BF]">{stat.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </motion.section>
  );
}
