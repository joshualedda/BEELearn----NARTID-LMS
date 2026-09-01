"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Play,
  FileText,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Courses",
    description:
      "Learn through organized lessons from beginner to advanced topics. Our curriculum is designed by beekeeping experts and agricultural educators.",
    color: "bg-[#0D2B52]",
    iconColor: "text-[#0D2B52]",
    bgColor: "bg-[#0D2B52]/10",
  },
  {
    icon: Play,
    title: "Video Lessons",
    description:
      "Watch practical demonstrations and educational content. High-quality videos show real beekeeping techniques, hive inspections, and honey harvesting.",
    color: "bg-[#E5A900]",
    iconColor: "text-[#E5A900]",
    bgColor: "bg-[#E5A900]/10",
  },
  {
    icon: FileText,
    title: "Learning Resources",
    description:
      "Access guides, materials, and reference resources. Downloadable PDFs, checklists, seasonal calendars, and troubleshooting guides for every situation.",
    color: "bg-green-600",
    iconColor: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description:
      "Monitor completed lessons and your learning journey. Personal dashboard with progress tracking, achievement badges, and personalized recommendations.",
    color: "bg-blue-600",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
];

export function FeaturesSection() {
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
      id="features"
      className="py-20 sm:py-28 lg:py-32 bg-white"
      aria-labelledby="features-heading"
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
            Platform Features
          </span>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0D2B52] mb-4"
          >
            Everything you need to learn beekeeping
          </h2>
          <p className="text-lg text-[#6B82A6]">
            A comprehensive learning platform designed to take you from curious
            beginner to confident beekeeper.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Platform features"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
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
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5 ${feature.bgColor} group-hover:${feature.color} group-hover:text-white transition-all duration-300`}
                      aria-hidden="true"
                    >
                      <Icon className={`h-7 w-7 ${feature.iconColor} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0D2B52] mb-3 group-hover:text-[#E5A900] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#6B82A6] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}