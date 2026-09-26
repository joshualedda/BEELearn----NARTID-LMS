import { BookOpen, ChartNoAxesCombined, ClipboardList, LayoutDashboard, ListChecks, UserRound, UsersRound } from "lucide-react";
import type { SidebarItem } from "./types";

export const instructorSidebar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/instructor/dashboard" },
  { label: "My Courses", icon: BookOpen, href: "/instructor/courses" },
  { label: "Students", icon: UsersRound },
  { label: "Assignments", icon: ClipboardList },
  { label: "Quizzes", icon: ListChecks },
  { label: "Student Insights", icon: ChartNoAxesCombined },
  { label: "Profile / Settings", icon: UserRound },
];
