export type EnrollmentResult =
  | { kind: "enrolled"; status: string }
  | { kind: "login" }
  | { kind: "error"; message: string };
