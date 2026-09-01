export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export function validateLoginInput(input: LoginInput): string[] {
  const errors: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Email is invalid.");
  }
  if (input.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }
  return errors;
}

export function validateForgotPasswordInput(input: ForgotPasswordInput): string[] {
  const errors: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Email is invalid.");
  }
  return errors;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function validateRegisterInput(input: RegisterInput): string[] {
  const errors: string[] = [];
  if (!input.fullName.trim()) {
    errors.push("Full name is required.");
  } else if (input.fullName.trim().length < 2) {
    errors.push("Full name must be at least 2 characters.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Email is invalid.");
  }
  if (input.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }
  if (input.password !== input.confirmPassword) {
    errors.push("Passwords do not match.");
  }
  return errors;
}
