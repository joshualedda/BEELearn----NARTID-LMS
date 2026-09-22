"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Clock, BookOpen, User, ArrowRight, Star, GraduationCap, Hexagon } from "lucide-react";

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
  },
];

const levelStyles = {
  Beginner: "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

const coverGradients = [
  "from-[#0D2B52] to-[#1a4a8a]",
  "from-[#E5A900] to-[#f4c430]",
  "from-green-600 to-emerald-500",
  "from-blue-600 to-cyan-500",
];

export function FeaturedCoursesSection() {
  return (
    <section id="courses" className="bg-[#F7F9FB] py-16 sm:py-20 lg:py-24" aria-labelledby="courses-heading">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 font-sans text-xs font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
              Featured Courses
            </span>
            <h2 id="courses-heading" className="mt-3 font-sans text-2xl font-bold tracking-tight text-[#0D2B52] sm:text-3xl lg:text-4xl">
              Popular beekeeping courses
            </h2>
            <p className="mt-2 max-w-xl font-sans text-sm leading-6 text-[#6B82A6] sm:text-[15px]">
              Curated by NARTDI experts — practical, accessible, and field-tested.
            </p>
          </div>
          <motion.div whileHover={{ x: 3 }}>
            <Link href="/learner/courses" className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-green-600 hover:text-green-700">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <StaggerItem key={course.id}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col overflow-hidden border-gray-100 transition-all duration-300 hover:border-[#E5A900]/30 hover:shadow-[0_16px_40px_-16px_rgba(13,43,82,0.18)]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                    className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${coverGradients[index % coverGradients.length]} p-5`}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L50 10.4 L50 30.6 L30 41 L10 30.6 L10 10.4 Z' fill='none' stroke='white' stroke-width='0.7'/%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 font-sans text-xs font-medium ${levelStyles[course.level]}`}>{course.level}</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                          <Hexagon className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <motion.div
                        initial={{ rotate: -4 }}
                        whileInView={{ rotate: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 shadow-sm"
                      >
                        <GraduationCap className="h-6 w-6 text-[#0D2B52]" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <CardContent className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 font-sans text-[15px] font-bold leading-5 text-[#0D2B52] group-hover:text-[#E5A900] transition-colors">{course.title}</h3>
                    <p className="mt-1.5 line-clamp-2 font-sans text-xs leading-5 text-[#6B82A6]">{course.description}</p>

                    <div className="mt-3 flex items-center gap-3 font-sans text-xs text-[#8FA3BF]">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {course.duration}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3 font-sans">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0D2B52]">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#8FA3BF]">
                        <User className="h-3.5 w-3.5" /> {course.students.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2.5 border-t border-gray-100 pt-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D2B52]/10 text-[#0D2B52]">
                        <User className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-sans text-xs font-semibold text-[#0D2B52]">{course.instructor}</p>
                        <p className="truncate font-sans text-[11px] text-[#8FA3BF]">{course.instructorRole}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Link href={`/learner/courses/${course.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        View Course <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
