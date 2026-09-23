"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight, Check } from "lucide-react";

export function CTASection() {
  return (
    <section id="cta" className="bg-[#F7F9FB] py-14 sm:py-16 lg:py-20" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#0D2B52] px-6 py-8 shadow-[0_24px_48px_-30px_rgba(13,43,82,0.7)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#E5A900]/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.6fr)] lg:items-center lg:gap-12">
            <div>
              <FadeIn>
                <h2 id="cta-heading" className="max-w-2xl font-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Ready to start your beekeeping journey?
                </h2>
              </FadeIn>

              <FadeIn delay={0.06}>
                <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-[#C7D5EA] sm:text-[15px]">
                  Join 500+ learners building practical beekeeping skills with trusted, field-tested courses.
                </p>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-sans text-xs text-[#C7D5EA]">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-400" aria-hidden="true" /> Free to start
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-400" aria-hidden="true" /> Lifetime access
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-400" aria-hidden="true" /> Certificate included
                </span>
              </FadeIn>
            </div>

            <FadeIn delay={0.12} className="w-full lg:justify-self-end lg:max-w-xs">
              <div className="flex flex-col gap-3">
                <Link href="/register" className="w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full rounded-lg bg-[#E5A900] px-7 font-sans text-[#0D2B52] shadow-[0_14px_28px_-14px_rgba(229,169,0,0.85)] hover:bg-[#F4C430] hover:shadow-[0_18px_32px_-14px_rgba(229,169,0,0.95)]">
                      Start Learning <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/learner/courses" className="w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" className="w-full rounded-lg !border-white/20 !bg-transparent px-7 font-sans !text-white hover:!border-white/35 hover:!bg-white/10 hover:!text-white">
                      Explore Courses
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
