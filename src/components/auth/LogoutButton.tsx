"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton({ label = "Sign out", className = "", icon, variant = "outline" }: {
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  variant?: "outline" | "ghost";
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    setPending(true);
    setError("");
    try {
      const result = await signOut();
      if (result.error) setError(result.error);
      else { router.replace("/login"); router.refresh(); }
    } catch { setError("Sign out failed. Please try again."); }
    finally { setPending(false); }
  }
  return <div>
    <Button variant={variant} className={className} onClick={logout} disabled={pending}>
      {icon}{pending ? "Signing out…" : label}
    </Button>
    {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
}
