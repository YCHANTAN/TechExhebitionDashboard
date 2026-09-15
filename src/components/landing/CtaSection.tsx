"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function CtaSection() {
  const { locale } = useLocaleStore();

  return (
    <section className="w-full px-6 py-20 sm:py-28 bg-transparent">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-4xl bg-[#133020] dark:bg-zinc-950 text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-[#046241]/40 dark:border-white/15">
          {/* Ambient Lighting Circles */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#046241]/60 dark:bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB347]/20 dark:bg-[#FFB347]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(4,98,65,0.3)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#046241] dark:bg-white/10 border border-[#FFB347]/40 dark:border-white/20 text-[#FFB347] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {locale === "zh"
                  ? "2026–2027 战略准入已开启"
                  : "Immediate 2026–2027 Access"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              {locale === "zh" ? (
                <>
                  重构全球展会商业智能 <br />
                  <span className="text-[#FFB347]">立即启动 LIFEVENT</span>
                </>
              ) : (
                <>
                  Ready to Supercharge Your <br />
                  <span className="text-[#FFB347]">Exhibition Intelligence?</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-medium leading-relaxed max-w-xl mb-10">
              {locale === "zh"
                ? "全面赋能 Lifewood 全球业务拓展团队。即刻体验自动化 AI 爬虫采集、27 项严密审核、以及紧扣 6 大业务线的战略契合度评估体系。"
                : "Empower your global business development teams with autonomous crawling, 27-field deep audits, and high-precision strategic fit scoring."}
            </p>

            {/* Signature React Bits CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center cursor-pointer w-full sm:w-auto select-none"
              >
                <span className="absolute right-0 inset-y-0 w-[calc(100%-1.75rem)] rounded-2xl bg-[#FFB347] transition-all duration-300 group-hover:w-full shadow-lg shadow-[#FFB347]/30" />
                <span className="relative z-10 px-8 py-4 rounded-2xl bg-white text-[#133020] font-black text-sm sm:text-base tracking-wide flex-1 sm:flex-none transition-colors group-hover:bg-gray-100">
                  {locale === "zh" ? "进入智能分析平台" : "Enter Intelligence Portal"}
                </span>
                <span className="relative -left-px z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-[#133020] bg-transparent">
                  <ArrowDownRight className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-45 stroke-[2.5]" />
                </span>
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/25 hover:bg-white/10 text-white font-bold text-sm sm:text-base transition-colors w-full sm:w-auto"
              >
                <Globe className="w-4 h-4 text-[#FFB347]" />
                <span>{locale === "zh" ? "浏览展会名录" : "Browse 500+ Summits"}</span>
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-semibold pt-6 border-t border-white/10 w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFB347]" />
                {locale === "zh" ? "企业级 RBAC 权限" : "Enterprise RBAC"}
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FFB347]" />
                {locale === "zh" ? "毫秒级语义检索" : "Real-time AI Crawling"}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFB347]" />
                {locale === "zh" ? "中英双语即时切换" : "Bilingual EN / 中文"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
