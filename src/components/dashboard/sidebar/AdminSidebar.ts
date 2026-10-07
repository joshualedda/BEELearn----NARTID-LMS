import { BookOpen, ChartNoAxesCombined, GraduationCap, LayoutDashboard, Settings, UserRound, UserRoundCheck, UsersRound } from "lucide-react";
import type { SidebarItem } from "./types";

export const adminSidebar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", section: "Overview" },
  { label: "Students", icon: GraduationCap, href: "/admin/students", section: "Academic Management" },
  { label: "Instructors", icon: UserRoundCheck, href: "/admin/instructors" },
  { label: "All Courses", icon: BookOpen, href: "/admin/courses" },
  { label: "Reports", icon: ChartNoAxesCombined, href: "/admin/reports", section: "Analytics" },
  { label: "Manage Users", icon: UsersRound, href: "/admin/users", section: "System" },
  { label: "System Settings", icon: Settings },
  { label: "Profile / Settings", icon: UserRound },
];
