import { BookOpen, ChartNoAxesCombined, LayoutDashboard, Settings, UserRound, UsersRound } from "lucide-react";
import type { SidebarItem } from "./types";

export const adminSidebar: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Manage Users", icon: UsersRound },
  { label: "All Courses", icon: BookOpen },
  { label: "Reports", icon: ChartNoAxesCombined },
  { label: "System Settings", icon: Settings },
  { label: "Profile / Settings", icon: UserRound },
];
