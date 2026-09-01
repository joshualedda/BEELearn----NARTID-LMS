"use client";

import { useRef, useEffect, useState } from "react";
import { BookOpen, FileText, Users, Clock } from "lucide-react";

const stats = [
  {
    value: "10+",
    label: "Courses",
    icon: BookOpen,
    description: "Expert-led beekeeping courses",
  },
  {
    value: "100+",
    label: "Lessons",
    icon: FileText,
    description: "Video lessons & resources",
  },
  {
    value: "500+",
    label: "Learners",
    icon: Users,
    description: "Active students worldwide",
  },
  {
    value: "24/7",
    label: "Access",
    icon: Clock,
    description: "Learn anytime, anywhere",
  },
];

export function StatisticsSection() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCount = (target: number, duration: number = 2000) => {
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        return Math.floor(target * eased);
      };

      const animateLoop = (timestamp: number) => {
        const value = animate(timestamp);
        setAnimatedValues((prev) => ({ ...prev, [target.toString()]: value }));
        if (progress < 1) {
          requestAnimationFrame(animateLoop);
        }
      };

      requestAnimationFrame(animateLoop);
    };

    stats.forEach((stat) => {
      const numericValue = parseInt(stat.value.replace(/\D/g, ""));
      if (stat.value.includes("+")) {
        animateCount(numericValue);
      }
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="statistics-heading"
    >
      <div className="absolute inset-0 bg-[#0D2B52]" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='%23E5A900' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E5A900]/20 px-3 py-1 text-xs font-medium text-[#E5A900] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A900]" aria-hidden="true" />
            Platform Statistics
          </span>
          <h2
            id="statistics-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Growing community of beekeepers
          </h2>
          <p className="text-lg text-[#8FA3BF]">
            Join thousands of learners mastering the art and science of beekeeping.
          </p>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Platform statistics"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const numericValue = parseInt(stat.value.replace(/\D/g, ""));
            const animatedValue = animatedValues[numericValue.toString()];
            const displayValue = isVisible && animatedValue !== undefined
              ? `${animatedValue}${stat.value.includes("+") ? "+" : ""}${stat.value.includes("/") ? "/7" : ""}`
              : isVisible && !stat.value.includes("/")
                ? `${numericValue}+`
                : stat.value;

            return (
              <article
                key={stat.label}
                className="text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
                }}
                role="listitem"
              >
                <div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 mb-5"
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7 text-[#E5A900]" />
                </div>
                <div className="mb-2">
                  <span
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {displayValue}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-[#8FA3BF]">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}