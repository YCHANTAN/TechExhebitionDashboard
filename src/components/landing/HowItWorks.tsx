"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  ArrowDownRight,
  ShieldAlert,
  DownloadCloud,
} from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function HowItWorks() {
  const { locale } = useLocaleStore();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: "01",
      icon: Compass,
      titleEn: "Automated Global Discovery & AI Web Scraping",
      titleZh: "全网自动化 AI 爬虫智能抓取与聚合",
      descEn:
        "Apify microservice crawls global tech portals, official convention directories, and social channels. Google Gemini Flash extracts dates, organizers, venues, and booth tiers with automatic deduplication.",
      descZh:
        "Apify 微服务自动化检索全球科技峰会目录与官方会务网站，结合 Google Gemini Flash 智能提炼展会时间、举办地点、主办机构与展位赞助层级，并自动滤除重复记录。",
      badge: "STEP 1: INGESTION",
      meta: "12,000+ Pages Crawled Daily",
    },
    {
      stepNumber: "02",
      icon: FileCheck,
      titleEn: "27-Field Deep Audit & Multi-Vector Fit Scoring",
      titleZh: "27 项高精度维度核准与多维契合度计算",
      descEn:
        "Records enter governance queues where Lifewood supervisors verify parameters. The proprietary algorithm calculates a 1.0 to 5.0 Strategic Fit Score based on alignment with our 6 core AI service lines.",
      descZh:
        "新抓取与录入的展会进入专职审核队列，由管理员核准。自研算法根据展会与 Lifewood 六大核心 AI 业务线的重合度，自动生成 1.0 至 5.0 的权威战略契合度评分。",
      badge: "STEP 2: AUDIT & SCORING",
      meta: "Double-Blind Verification Queue",
    },
    {
      stepNumber: "03",
      icon: TrendingUp,
      titleEn: "Executive Reporting, Delegate Tracking & ROI Log",
      titleZh: "一键高管报告导出、参展任务指派与 ROI 闭环",
      descEn:
        "Leadership gains real-time visibility into the 2026–2027 calendar. Export board-ready PDF/Excel briefings, assign international delegates, mark attended events, and build a permanent knowledge base.",
      descZh:
        "高管团队全景掌控 2026–2027 年全球展会日历。支持一键导出董事会汇报级 PDF/Excel 简报，指派参展商务代表，核销参展记录并沉淀为集团永久商业智能资产。",
      badge: "STEP 3: ACTION & ROI",
      meta: "Board-Level Export in PDF & XLSX",
    },
  ];

  return (
    <section id="how-it-works" className="relative w-full bg-transparent px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Sticky Left Column */}
        <div className="lg:sticky lg:top-36 lg:h-fit lg:self-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#046241]/10 text-[#046241] dark:text-[#FFB347] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{locale === "zh" ? "系统闭环工作流" : "Workflow Pipeline"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#133020] dark:text-white leading-[1.1]">
            {locale === "zh" ? "运作机制" : "How It Works"}
          </h2>
          <p className="mt-5 max-w-md text-base sm:text-lg leading-relaxed text-[#133020]/75 dark:text-white/70">
            {locale === "zh"
              ? "从全网自动化线索捕获，到 27 项严密审核，再到董事会级参展决策报告，全链路赋能。"
              : "From autonomous internet discovery to board-level strategic exhibition execution, configured for enterprise teams."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#133020] hover:bg-[#046241] text-white dark:bg-[#FFB347] dark:text-[#133020] dark:hover:bg-[#FFC370] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm"
            >
              <span>{locale === "zh" ? "查看实时工作流" : "Explore Dashboard"}</span>
              <ArrowDownRight className="w-4 h-4 -rotate-45" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Connected Timeline */}
        <div className="relative">
          {/* Vertical continuous accent line */}
          <div
            className="absolute left-6 top-6 h-[calc(100%-5rem)] w-0.5 -translate-x-1/2 bg-[#D8D2C8] dark:bg-white/10"
            aria-hidden="true"
          >
            <div
              className="w-full bg-[#FFB347] transition-all duration-500"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <ol className="relative list-none p-0 m-0 space-y-8 sm:space-y-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className="cursor-pointer"
                >
                  <div
                    className={`relative flex gap-5 sm:gap-6 p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
                      isActive
                        ? "bg-white dark:bg-[#081C12] border border-[#046241]/30 dark:border-[#FFB347]/30 shadow-xl"
                        : "bg-transparent hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {/* Step icon circle with gold halo */}
                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-[#FFB347] text-[#133020] shadow-lg shadow-[#FFB347]/30 border-white dark:border-[#133020] scale-110"
                          : "bg-white dark:bg-[#081C12] text-[#708E7C] dark:text-white/60 border-[#D8D2C8] dark:border-white/15"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>

                    {/* Step details */}
                    <div className="pt-0.5 text-left flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] bg-[#FFB347]/15 px-2.5 py-0.5 rounded-md">
                          {step.badge}
                        </span>
                        <span className="text-[10px] text-[#708E7C] dark:text-white/50 font-semibold">
                          {step.meta}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#133020] dark:text-white leading-tight">
                        {locale === "zh" ? step.titleZh : step.titleEn}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#133020]/75 dark:text-white/70 max-w-md">
                        {locale === "zh" ? step.descZh : step.descEn}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
