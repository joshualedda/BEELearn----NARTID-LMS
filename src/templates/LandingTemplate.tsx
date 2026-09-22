import type { ReactNode } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export function LandingTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0D2B52] antialiased">
      <Navbar />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
