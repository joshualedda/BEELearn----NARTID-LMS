export function authErrorMessage(error: { code?: string }, fallback: string): string {
  switch (error.code) {
    case "invalid_credentials": return "Email or password is incorrect.";
    case "email_not_confirmed": return "Please verify your email before signing in.";
    case "user_already_exists":
    case "email_exists": return "This email is already registered. Please sign in.";
    case "weak_password": return "Please choose a stronger password with at least 8 characters.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit": return "Too many attempts. Please wait a few minutes and try again.";
    default: return fallback;
  }
}
