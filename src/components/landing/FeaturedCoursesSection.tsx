"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookOpen, Clock, PackageCheck, ShieldCheck, Sprout, Star, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  duration: string;
  instructor: string;
  instructorRole: string;
  students: number;
  rating: number;
  icon: LucideIcon;
  iconClass: string;
}

const courses: Course[] = [
  {
    id: "intro-beekeeping",
    title: "Introduction to Beekeeping",
    description: "Bee biology, hive types, essential equipment, and setting up your first apiary.",
    level: "Beginner",
    lessons: 12,
    duration: "6h",
    instructor: "Dr. Maria Santos",
    instructorRole: "Entomologist",
    students: 1240,
    rating: 4.9,
    icon: Sprout,
    iconClass: "bg-green-100 text-green-700",
  },
  {
    id: "colony-management",
    title: "Honey Bee Colony Management",
    description: "Queen rearing, swarm prevention, disease identification, and seasonal management.",
    level: "Intermediate",
    lessons: 18,
    duration: "10h",
    instructor: "Prof. James Chen",
    instructorRole: "Extension Specialist",
    students: 890,
    rating: 4.8,
    icon: ShieldCheck,
    iconClass: "bg-[#FFF3D0] text-[#9A6700]",
  },
  {
    id: "hive-management",
    title: "Beehive Management & Maintenance",
    description: "Hive inspections, frame management, pest control, and healthy colonies year-round.",
    level: "Beginner",
    lessons: 15,
    duration: "8h",
    instructor: "Sarah Rodriguez",
    instructorRole: "Master Beekeeper",
    students: 670,
    rating: 4.7,
    icon: Wrench,
    iconClass: "bg-blue-100 text-[#0D2B52]",
  },
  {
    id: "honey-harvesting",
    title: "Honey Harvesting and Processing",
    description: "Proper harvesting, extraction, filtering, bottling, and quality standards.",
    level: "Intermediate",
    lessons: 10,
    duration: "5h",
    instructor: "Michael Thompson",
    instructorRole: "Honey Producer",
    students: 530,
    rating: 4.9,
    icon: PackageCheck,
    iconClass: "bg-[#0D2B52] text-[#F7C746]",
  },
];

const levelStyles = {
  Beginner: "border-green-200 bg-green-50 text-green-700",
  Intermediate: "border-amber-200 bg-amber-50 text-amber-700",
  Advanced: "border-red-200 bg-red-50 text-red-700",
};

export function FeaturedCoursesSection() {
  return (
    <section id="courses" aria-labelledby="courses-heading" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <LandingSectionHeader
            headingId="courses-heading"
            eyebrow="Featured learning paths"
            title="Popular beekeeping courses"
            description="Curated by NARTDI experts—practical, accessible, and field-tested."
            action={
              <Link href="/learner/courses" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2">
                View all courses <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <StaggerItem key={course.id} className="h-full">
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F7F9FB] p-5 shadow-[0_16px_32px_-28px_rgba(13,43,82,0.36)] transition-[border-color,box-shadow] duration-300 hover:border-[#E5A900]/55 hover:bg-white hover:shadow-[0_22px_38px_-26px_rgba(13,43,82,0.38)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${course.iconClass}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${levelStyles[course.level]}`}>{course.level}</span>
                  </div>

                  <h3 className="mt-6 min-h-12 font-sans text-lg font-bold leading-6 text-[#0D2B52]">{course.title}</h3>
                  <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">{course.description}</p>

                  <div className="mt-5 grid grid-cols-2 gap-2 border-y border-slate-200 py-4 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-green-700" aria-hidden="true" />
                      <strong className="text-[#0D2B52]">{course.lessons}</strong> lessons
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-green-700" aria-hidden="true" />
                      <strong className="text-[#0D2B52]">{course.duration}</strong> total
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-[#0D2B52]">
                      <Star className="h-3.5 w-3.5 fill-[#E5A900] text-[#E5A900]" aria-hidden="true" />
                      <strong>{course.rating}</strong>
                      <span className="text-slate-500">({course.students.toLocaleString()})</span>
                    </span>
                    <span className="inline-flex min-w-0 items-center gap-1.5 text-slate-600">
                      <User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{course.instructor}</span>
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">{course.instructorRole}</p>
                  <Link href={`/learner/courses/${course.id}`} className="mt-5 w-full">
                    <Button variant="outline" size="sm" className="w-full rounded-full border-[#0D2B52]/15 bg-white hover:border-[#E5A900] hover:bg-[#FFF9E8]">
                      View course <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </Link>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
