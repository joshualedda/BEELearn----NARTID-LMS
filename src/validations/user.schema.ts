import { ROLES, type Role } from "@/constants/roles";

export interface CreateUserInput {
  email: string;
  fullName: string;
  role: Role;
}

export interface UpdateUserInput {
  id: string;
  fullName?: string;
  role?: Role;
  avatarUrl?: string;
}

export function validateCreateUserInput(input: CreateUserInput): string[] {
  const errors: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Email is invalid.");
  }
  if (input.fullName.trim().length === 0) {
    errors.push("Full name is required.");
  }
  if (!Object.values(ROLES).includes(input.role)) {
    errors.push("Role is invalid.");
  }
  return errors;
}
