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
  return PROTECTED_PREFIXES.some((prefix) => matchesPath(pathname, prefix));
}

function matchesPath(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function normalizeRole(role: unknown): Role | null {
  if (role === "student") return ROLES.LEARNER;
  return isKnownRole(role) ? role : null;
}

export function isKnownRole(role: unknown): role is Role {
  return typeof role === "string" && Object.values(ROLES).includes(role as Role);
}

export function canAccessPath(role: unknown, pathname: string): boolean {
  if (!isKnownRole(role)) return false;
  return ROLE_PREFIXES[role].some((prefix) => matchesPath(pathname, prefix));
}

export function getRoleHome(role: Role): string {
  return ROLE_HOME[role];
}

export function getLoginDestination(role: Role, next?: unknown): string {
  if (typeof next === "string" && next.startsWith("/") && !next.startsWith("//") && !/[\\\u0000-\u0020]/.test(next)) {
    const url = new URL(next, "https://beelearn.invalid");
    if (url.origin === "https://beelearn.invalid" &&
      (canAccessPath(role, url.pathname) || matchesPath(url.pathname, "/courses"))) {
      return `${url.pathname}${url.search}`;
    }
  }
  return getRoleHome(role);
}
