"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Play, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Choose a Course",
    description:
      "Explore courses based on your interests and experience level. From beginner fundamentals to advanced techniques, find the perfect learning path for your beekeeping journey.",
    color: "bg-[#0D2B52]",
    iconColor: "text-[#0D2B52]",
    bgColor: "bg-[#0D2B52]/10",
  },
  {
    number: "02",
    icon: Play,
    title: "Learn at Your Own Pace",
    description:
      "Study lessons, watch videos, and access learning resources anytime, anywhere. Our self-paced format fits your schedule with lifetime access to all course materials.",
    color: "bg-[#E5A900]",
    iconColor: "text-[#E5A900]",
    bgColor: "bg-[#E5A900]/10",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Complete lessons and monitor your progress as you develop your beekeeping skills. Earn certificates, unlock achievements, and apply knowledge to your own hives.",
    color: "bg-green-600",
    iconColor: "text-green-600",
    bgColor: "bg-green-600/10",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 sm:py-28 lg:py-32 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0D2B52] mb-4"
          >
            Start learning in three simple steps
          </h2>
          <p className="text-lg text-[#6B82A6]">
            BeeLearn makes it easy to begin your beekeeping education journey.
          </p>
        </div>

        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
          }}
        >
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E5A900]/30 to-transparent pointer-events-none" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                  }}
                >
                  <div className="mb-6">
                    <span className="inline-flex items-center justify-center text-3xl sm:text-4xl font-bold text-[#E5A900] mb-4">
                      {step.number}
                    </span>
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl mx-auto mb-5 ${step.bgColor}`}
                      aria-hidden="true"
                    >
                      <Icon className={`h-8 w-8 ${step.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0D2B52] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6B82A6] leading-relaxed">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className="mt-16 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s",
          }}
        >
          <p className="text-[#6B82A6] mb-4">Ready to begin your journey?</p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            Create your free account
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}