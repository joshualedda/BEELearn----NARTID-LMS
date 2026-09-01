"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Zap, Clock, Leaf, Shield, Award } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Learn from Anywhere",
    description:
      "Access courses on any device — desktop, tablet, or mobile. Download lessons for offline viewing when you're out in the field with your hives.",
    color: "bg-[#0D2B52]",
    iconColor: "text-[#0D2B52]",
    bgColor: "bg-[#0D2B52]/10",
  },
  {
    icon: Zap,
    title: "Practical & Accessible",
    description:
      "Real-world beekeeping techniques demonstrated by experienced practitioners. No academic jargon — just clear, actionable knowledge you can apply immediately.",
    color: "bg-[#E5A900]",
    iconColor: "text-[#E5A900]",
    bgColor: "bg-[#E5A900]/10",
  },
  {
    icon: Clock,
    title: "Progress at Your Own Pace",
    description:
      "No deadlines, no pressure. Lifetime access means you can revisit lessons season after season as your beekeeping skills and apiary grow.",
    color: "bg-green-600",
    iconColor: "text-green-600",
    bgColor: "bg-green-600/10",
  },
];

const trustSignals = [
  { icon: Shield, label: "Expert Instructors", description: "Taught by certified beekeepers & researchers" },
  { icon: Award, label: "Accredited Content", description: "NARTDI & DMMMSU approved curriculum" },
  { icon: Leaf, label: "Sustainable Practices", description: "Eco-friendly, science-based methods" },
];

export function WhyBeeLearnSection() {
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
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-[#F7F9FB]"
      aria-labelledby="why-beelearn-heading"
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
            Why BeeLearn
          </span>
          <h2
            id="why-beelearn-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0D2B52] mb-4"
          >
            Learn. Practice. Grow.
          </h2>
          <p className="text-lg text-[#6B82A6]">
            BeeLearn makes beekeeping education more accessible by bringing
            structured learning materials together in one trusted platform.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          role="list"
          aria-label="Key benefits"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
                }}
                role="listitem"
              >
                <Card className="h-full border-gray-100 hover:border-[#E5A900]/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 pt-8">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5 ${benefit.bgColor} group-hover:${benefit.color} group-hover:text-white transition-all duration-300`}
                      aria-hidden="true"
                    >
                      <Icon className={`h-7 w-7 ${benefit.iconColor} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0D2B52] mb-3 group-hover:text-[#E5A900] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-[#6B82A6] leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Trust signals"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s",
          }}
        >
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <article
                key={signal.label}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#E5A900]/50 hover:shadow-lg transition-all duration-300"
                role="listitem"
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className="flex-shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-green-50"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0D2B52] mb-1">
                    {signal.label}
                  </h4>
                  <p className="text-sm text-[#6B82A6]">
                    {signal.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}