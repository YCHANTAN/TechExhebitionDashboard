"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { LivingWoodNetwork } from "@/components/ui/LivingWoodNetwork";
import { useLocaleStore } from "@/stores/locale-store";

export function Hero() {
  const { locale } = useLocaleStore();

  return (
    <section
      id="overview"
      className="relative flex flex-col pt-28 sm:pt-36 pb-16 overflow-hidden"
    >
      {/* Dynamic Aura & Background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-white dark:bg-black border-b border-gray-200/80 dark:border-white/10"
        aria-hidden="true"
      >
        {/* Ambient Radial Highlights */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#FFB347]/10 dark:bg-[#046241]/25 rounded-full blur-3xl" />
        <div className="absolute -top-24 left-10 w-96 h-96 bg-[#046241]/8 dark:bg-[#FFB347]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-3xl" />

        {/* Lifewood Canvas Particles */}
        <LivingWoodNetwork variant="dark" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center z-10">
        {/* Main Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#133020] dark:text-white mb-4 max-w-4xl">
          <span className="block">
            {locale === "zh" ? "全球科技展会" : "Global Tech Exhibition"}
          </span>
          <span className="block">
            {locale === "zh" ? "智能决策与 " : "Intelligence with "}
            <span className="italic font-serif font-normal text-[#C17110] dark:text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-6">
              {locale === "zh" ? "精准 AI 赋能" : "Precision AI"}
            </span>
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl text-sm sm:text-base text-[#133020]/75 dark:text-white/80 font-normal leading-relaxed mb-8">
          {locale === "zh"
            ? "专为 Lifewood 商务开拓与高管团队打造。涵盖 500+ 场全球顶级工业峰会追踪、27 项标准审核维度、AI 自动化抓取引擎，以及贯穿 6 大核心数据业务线的战略契合度评估。"
            : "The unified market intelligence portal empowering Lifewood's BD and executive teams to discover, audit, score, and conquer 500+ global industrial exhibitions across 6 core AI data service lines."}
        </p>

        {/* Refined Call-to-Action */}
        <div className="flex items-center justify-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#133020] text-white hover:bg-[#046241] dark:bg-[#FFB347] dark:text-[#133020] dark:hover:bg-[#FFC370] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
          >
            <span>{locale === "zh" ? "立即启动仪表板" : "Launch Intelligence Hub"}</span>
            <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
          </Link>
        </div>

        {/* Quick Highlights Counters */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#133020] dark:text-white">520+</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-white/70">
              {locale === "zh" ? "全球科技峰会" : "Audited Exhibitions"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#046241] dark:text-[#FFB347]">4.8 / 5</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-white/70">
              {locale === "zh" ? "平均战略契合度" : "Average Fit Score"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#133020] dark:text-white">6 大</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-white/70">
              {locale === "zh" ? "核心 AI 业务线" : "Core Business Lines"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#C17110] dark:text-[#FFB347]">100%</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-white/70">
              {locale === "zh" ? "双重审查治理" : "Verified Governance"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
