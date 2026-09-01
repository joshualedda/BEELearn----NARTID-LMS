"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, BookOpen, Play } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLSectionElement>(null);
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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "10+", label: "Courses" },
    { value: "100+", label: "Lessons" },
    { value: "500+", label: "Learners" },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(13,43,82,0.08)_0%,_transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='%23E5A900' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="text-center lg:text-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Official NARTDI Platform
            </span>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#0D2B52] mb-6"
            >
              <span className="text-white">Bee</span>
              <span className="text-green-400">Learn</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#E5A900] mb-6">
              Learn beekeeping. Anytime, anywhere.
            </h2>

            <p className="text-lg sm:text-xl text-[#6B82A6] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Build practical beekeeping knowledge through guided courses, expert
              resources, and hands-on learning designed for every level.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 px-8 py-3 text-base"
                  aria-label="Get started with BeeLearn"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="#courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 px-8 py-3 text-base border-2 border-[#E5A900] text-[#E5A900] hover:bg-[#E5A900] hover:text-white"
                  aria-label="Explore available courses"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-[#8FA3BF]">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0D2B52]">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#8FA3BF]">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                <span>Certificate on completion</span>
              </div>
            </div>
          </div>

          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
            }}
          >
            <div className="relative">
              <img
                src="/images/landing/hero-beekeeping.svg"
                alt="BeeLearn platform illustration showing honey bees, beehive, and honeycomb patterns"
                className="w-full max-w-lg mx-auto lg:mx-0 drop-shadow-2xl"
                loading="eager"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
                  <Play className="h-7 w-7 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-[#8FA3BF]">Watch Demo Lesson</p>
                  <p className="font-semibold text-[#0D2B52]">Introduction to Beekeeping</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 lg:-right-12 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5A900]/10">
                  <Users className="h-6 w-6 text-[#E5A900]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0D2B52]">500+</p>
                  <p className="text-xs text-[#8FA3BF]">Active Learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6 text-[#8FA3BF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}