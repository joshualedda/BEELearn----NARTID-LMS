"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, User, ArrowRight, Star } from "lucide-react";

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
  image: string;
}

const courses: Course[] = [
  {
    id: "intro-beekeeping",
    title: "Introduction to Beekeeping",
    description:
      "Master the fundamentals of beekeeping including bee biology, hive types, essential equipment, and setting up your first apiary.",
    level: "Beginner",
    lessons: 12,
    duration: "6 hours",
    instructor: "Dr. Maria Santos",
    instructorRole: "Entomologist & Beekeeping Educator",
    students: 1240,
    rating: 4.9,
    image: "/images/landing/course-intro.jpg",
  },
  {
    id: "colony-management",
    title: "Honey Bee Colony Management",
    description:
      "Learn advanced colony management techniques including queen rearing, swarm prevention, disease identification, and seasonal management.",
    level: "Intermediate",
    lessons: 18,
    duration: "10 hours",
    instructor: "Prof. James Chen",
    instructorRole: "Agricultural Extension Specialist",
    students: 890,
    rating: 4.8,
    image: "/images/landing/course-colony.jpg",
  },
  {
    id: "hive-management",
    title: "Beehive Management & Maintenance",
    description:
      "Comprehensive guide to hive inspections, frame management, pest control, and maintaining healthy colonies throughout the seasons.",
    level: "Beginner",
    lessons: 15,
    duration: "8 hours",
    instructor: "Sarah Rodriguez",
    instructorRole: "Master Beekeeper & Apiary Manager",
    students: 670,
    rating: 4.7,
    image: "/images/landing/course-hive.jpg",
  },
  {
    id: "honey-harvesting",
    title: "Honey Harvesting and Processing",
    description:
      "From hive to jar: learn proper harvesting techniques, extraction methods, filtering, bottling, and quality standards for premium honey.",
    level: "Intermediate",
    lessons: 10,
    duration: "5 hours",
    instructor: "Michael Thompson",
    instructorRole: "Commercial Honey Producer",
    students: 530,
    rating: 4.9,
    image: "/images/landing/course-honey.jpg",
  },
];

const levelStyles = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

export function FeaturedCoursesSection() {
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
      id="courses"
      className="py-20 sm:py-28 lg:py-32 bg-[#F7F9FB]"
      aria-labelledby="courses-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
              Featured Courses
            </span>
            <h2
              id="courses-heading"
              className="text-3xl sm:text-4xl font-bold text-[#0D2B52]"
            >
              Popular beekeeping courses
            </h2>
          </div>
          <Link
            href="/learner/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            View All Courses
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Featured courses"
        >
          {courses.map((course, index) => (
            <article
              key={course.id}
              className="group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
              }}
              role="listitem"
            >
              <Card className="h-full border-gray-100 hover:border-[#E5A900]/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={course.image}
                    alt={`${course.title} course thumbnail`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${levelStyles[course.level]}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/90 backdrop-blur-sm text-[#0D2B52] hover:bg-white"
                      aria-label={`Preview ${course.title}`}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-5 pt-6">
                  <h3 className="text-lg font-bold text-[#0D2B52] mb-2 line-clamp-2 group-hover:text-[#E5A900] transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#6B82A6] mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#8FA3BF] mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-[#0D2B52]">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8FA3BF]">
                      <User className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="text-xs">{course.students.toLocaleString()}+ students</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-0">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D2B52]/10">
                      <User className="h-5 w-5 text-[#0D2B52]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0D2B52] truncate">
                        {course.instructor}
                      </p>
                      <p className="text-xs text-[#8FA3BF] truncate">
                        {course.instructorRole}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/learner/courses/${course.id}`}
                    className="block mt-4 text-center"
                  >
                    <Button variant="outline" className="w-full group-hover:border-[#E5A900] group-hover:text-[#E5A900]">
                      View Course
                      <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}