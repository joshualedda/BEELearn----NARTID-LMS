"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CirclePlay, ChartNoAxesCombined } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Choose your path",
    description: "Browse practical courses by topic and experience level, then start with what fits your goals.",
    iconClass: "bg-[#0D2B52] text-[#F7C746]",
  },
  {
    number: "02",
    icon: CirclePlay,
    title: "Learn at your pace",
    description: "Use concise lessons, guides, and resources whenever your schedule allows.",
    iconClass: "bg-[#E5A900] text-[#0D2B52]",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Put it into practice",
    description: "Build skills you can apply to your hive and return whenever you are ready for the next step.",
    iconClass: "bg-green-600 text-white",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-[#F7F9FB] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            align="center"
            headingId="how-it-works-heading"
            eyebrow="How BeeLearn works"
            title="Start learning in three simple steps"
            description="A focused path from your first lesson to better decisions at the hive."
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.number}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_32px_-28px_rgba(13,43,82,0.36)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#E5A900]/50 hover:shadow-[0_22px_38px_-26px_rgba(13,43,82,0.38)]">
                  <span aria-hidden="true" className="absolute right-5 top-5 text-5xl font-bold leading-none tracking-tighter text-[#0D2B52]/[0.06]">
                    {step.number}
                  </span>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.iconClass}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-green-700">Step {step.number}</p>
                  <h3 className="mt-2 font-sans text-xl font-bold tracking-tight text-[#0D2B52]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.18} className="mt-10 text-center">
          <Link href="/register" className="inline-block">
            <Button size="lg" className="rounded-full bg-[#0D2B52] px-7 shadow-[0_14px_24px_-14px_rgba(13,43,82,0.55)] hover:bg-[#16407A]">
              Create your free account <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
