"use client";

import { BadgeCheck, Compass, Sprout } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const highlights = [
  {
    icon: Compass,
    title: "Clear learning paths",
    description: "Know exactly where to begin and what to learn next.",
    iconClass: "bg-[#0D2B52] text-[#F7C746]",
  },
  {
    icon: Sprout,
    title: "Built for the field",
    description: "Turn each lesson into practical care for your hives.",
    iconClass: "bg-green-600 text-white",
  },
  {
    icon: BadgeCheck,
    title: "Learn with confidence",
    description: "Trusted guidance for every stage of your beekeeping journey.",
    iconClass: "bg-[#E5A900] text-[#0D2B52]",
  },
];

export function TrustedBySection() {
  return (
    <section aria-labelledby="learning-foundation-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            align="center"
            headingId="learning-foundation-heading"
            eyebrow="Everything you need to begin"
            title="A simpler way to build real beekeeping skills."
            description="BeeLearn brings useful lessons, practical resources, and a clear next step into one focused learning experience."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <StaggerItem key={highlight.title}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-[#F7F9FB] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#E5A900]/50 hover:bg-white hover:shadow-[0_18px_36px_-28px_rgba(13,43,82,0.45)]">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${highlight.iconClass}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-bold text-[#0D2B52]">{highlight.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{highlight.description}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
