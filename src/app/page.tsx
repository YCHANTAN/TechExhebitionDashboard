import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { TextReveal } from "@/components/landing/TextReveal";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { BusinessLines } from "@/components/landing/BusinessLines";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "LIFEVENT — Global Tech Exhibition Intelligence Platform",
  description:
    "The modern exhibition intelligence portal tracking, evaluating, and auditing 500+ global industrial exhibitions, conferences, and AI summits for Lifewood Data Technology.",
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-[#133020] dark:text-white selection:bg-[#FFB347] selection:text-[#133020] transition-colors duration-300 overflow-x-hidden font-manrope">
      {/* Liquid Transparent Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section with Live Dashboard Preview Mockup */}
        <Hero />

        {/* 2. Global Exhibition / Summit Marquee Ticker */}
        <Marquee />

        {/* 3. Scroll Text Reveal */}
        <TextReveal />

        {/* 4. Signature 4-Card Bento Grid */}
        <BentoGrid />

        {/* 5. 6 Core Business Lines Strategic Showcase */}
        <BusinessLines />

        {/* 6. How It Works Sticky Split Section with Connected Timeline */}
        <HowItWorks />

        {/* 7. High-Impact Pre-Footer CTA Card */}
        <CtaSection />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
