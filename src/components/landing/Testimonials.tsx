"use client";

import React, { useState, useEffect } from "react";
import { useLocaleStore } from "@/stores/locale-store";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quoteEn: string;
  quoteZh: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Marcus Vance",
    role: "VP of Global Business Development @ Lifewood",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quoteEn:
      "LifeScout eliminated weeks of manual research across our European and North American expansion. The 27-point audit and Fit Score pinpoint exactly which summits justify executive attendance.",
    quoteZh:
      "LifeScout 帮我们省去了数周跨欧洲与北美市场的繁琐手动调研。27 项审核参数与契合度评分系统，精准指明了哪些高价值峰会值得高管亲自参展。",
  },
  {
    id: 1,
    name: "Dr. Elena Rostova",
    role: "Head of AI Data Solutions @ Lifewood Geneva",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    quoteEn:
      "Having an automated crawler that maps conference tracks directly to our Multilingual AI and RLHF service lines has completely transformed our sponsor ROI and lead qualification.",
    quoteZh:
      "自动化爬虫能够将全球大会的主题讲座直接映射至我们的多语种 AI 与 RLHF 标注业务线，彻底重构了我们的参展回报率与高价值商机转化。",
  },
  {
    id: 2,
    name: "Arthur Chen",
    role: "Director of Archival Solutions @ Lifewood APAC",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    quoteEn:
      "The coverage gap assessment immediately alerted us to missing scanning & OCR conferences in Q3. We added 4 premier archives summits to our schedule without breaking budget.",
    quoteZh:
      "覆盖盲区检测算法在第三季度立刻预警了全球扫描与 OCR 档案峰会的空缺，让我们在不超预算的前提下即刻补齐了 4 场顶级档案数字化盛会。",
  },
  {
    id: 3,
    name: "Sophia Lindqvist",
    role: "Chief Strategy Officer @ Lifewood Group",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    quoteEn:
      "The 1-click executive PDF report feature is now our standard board briefing tool. Every member of leadership has instant visibility into our 2026–2027 global exhibition footprint.",
    quoteZh:
      "一键导出高管级 PDF 报告已成为我们董事会汇报的标准工具。集团所有领导层都能实时掌握我们 2026–2027 年全球科技展会的战略版图。",
  },
];

export function Testimonials() {
  const { locale } = useLocaleStore();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto advance testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="w-full bg-[#F5EEDB]/60 dark:bg-[#081C12]/80 border-t border-b border-[#D8D2C8]/70 dark:border-white/10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] mb-2">
            {locale === "zh" ? "高管背书与信赖" : "Executive Voices"}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#133020] dark:text-white">
            {locale === "zh"
              ? "深受全球业务决策团队信赖"
              : "Trusted by Global Leadership Teams"}
          </h2>
        </div>

        {/* Tab List & Quote Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center mb-16">
          {/* Avatar Tabs with Animated Circular Progress Ring */}
          <div
            className="flex items-center justify-start gap-4 sm:gap-6"
            role="tablist"
            aria-label="Executive Testimonials"
          >
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="relative group focus:outline-hidden cursor-pointer"
                  role="tab"
                  aria-selected={isSelected}
                >
                  <div
                    className={`relative flex h-14 w-14 sm:h-18 sm:w-18 lg:h-20 lg:w-20 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-[#FFB347] shadow-xl scale-105"
                        : "bg-[#133020]/10 dark:bg-white/10 opacity-60 hover:opacity-100 hover:scale-100"
                    }`}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={`h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full object-cover transition-all duration-300 ${
                        isSelected ? "grayscale-0" : "grayscale"
                      }`}
                    />
                  </div>

                  {/* Circular SVG Progress Ring for Active Item */}
                  {isSelected && (
                    <svg
                      className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90 pointer-events-none"
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#FFB347"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="#046241"
                        strokeWidth="2.5"
                        strokeDasharray="301.59"
                        strokeDashoffset="75"
                        strokeLinecap="round"
                        className="animate-spin duration-3000"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Quote Panel */}
          <div className="flex flex-col justify-center min-h-[180px]">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-[#133020] dark:text-white/90 mb-6 italic">
              “{locale === "zh" ? active.quoteZh : active.quoteEn}”
            </blockquote>
            <div>
              <p className="text-base sm:text-lg font-bold text-[#133020] dark:text-white">
                {active.name}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#046241] dark:text-[#FFB347]">
                {active.role}
              </p>
            </div>
          </div>
        </div>

        {/* Global Tech Event Partner Brands */}
        <div className="pt-10 border-t border-[#D8D2C8]/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-6 opacity-70">
          <span className="text-xs font-black tracking-wider uppercase text-[#133020] dark:text-white/80">
            CES Las Vegas
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-[#133020] dark:text-white/80">
            MWC Barcelona
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-[#133020] dark:text-white/80">
            VivaTech Paris
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-[#133020] dark:text-white/80">
            GITEX Global Dubai
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-[#133020] dark:text-white/80">
            Computex Taipei
          </span>
        </div>
      </div>
    </section>
  );
}
