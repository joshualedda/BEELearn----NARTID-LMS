export const ROLES = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  LEARNER: "learner",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
