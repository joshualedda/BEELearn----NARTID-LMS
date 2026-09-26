import { BookOpen, ChartNoAxesCombined, ClipboardList, Compass, LayoutDashboard, ListChecks, UserRound } from "lucide-react";
import type { SidebarItem } from "./types";

export const learnerSidebar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/learner/dashboard" },
  { label: "My Courses", icon: BookOpen, href: "/learner/dashboard#my-courses" },
  { label: "Assignments", icon: ClipboardList },
  { label: "Quizzes", icon: ListChecks },
  { label: "My Progress", icon: ChartNoAxesCombined },
  { label: "Browse Courses", icon: Compass, href: "/courses" },
  { label: "Profile / Settings", icon: UserRound },
];
