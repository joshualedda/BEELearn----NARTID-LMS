import { ROLES, type Role } from "@/constants/roles";

const PROTECTED_PREFIXES = ["/admin", "/instructor", "/learner"] as const;

const ROLE_PREFIXES: Record<Role, readonly string[]> = {
  [ROLES.ADMIN]: ["/admin"],
  [ROLES.INSTRUCTOR]: ["/instructor"],
  [ROLES.LEARNER]: ["/learner"],
};

const ROLE_HOME: Record<Role, string> = {
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.INSTRUCTOR]: "/instructor/dashboard",
  [ROLES.LEARNER]: "/learner/dashboard",
};

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isKnownRole(role: unknown): role is Role {
  return typeof role === "string" && Object.values(ROLES).includes(role as Role);
}

export function canAccessPath(role: unknown, pathname: string): boolean {
  if (!isKnownRole(role)) return false;
  return ROLE_PREFIXES[role].some((prefix) => pathname.startsWith(prefix));
}

export function getRoleHome(role: Role): string {
  return ROLE_HOME[role];
}
