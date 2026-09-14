"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  CheckCircle,
  TrendingUp,
  Star,
  Globe,
  Radio,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Sliders,
  Check,
} from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function BentoGrid() {
  const { locale } = useLocaleStore();

  // Interactive weights for Card 2: Strategic Fit Calculator
  const [buyerWeight, setBuyerWeight] = useState(true);
  const [sponsorWeight, setSponsorWeight] = useState(true);
  const [serviceWeight, setServiceWeight] = useState(true);

  // Dynamic calculated score
  const baseScore = 3.6;
  const calculatedScore = (
    baseScore +
    (buyerWeight ? 0.4 : 0) +
    (sponsorWeight ? 0.4 : 0) +
    (serviceWeight ? 0.4 : 0)
  ).toFixed(1);

  // Mouse spotlight state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="capabilities" className="w-full px-6 mb-28 bg-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#133020] dark:text-white">
            {locale === "zh"
              ? "为战略级商务决策打造的智能矩阵"
              : "Built for Strategic Market Intelligence"}
          </h2>
        </div>

        {/* Asymmetric 4-Card Bento Grid with Cursor Spotlight Effect */}
        <div
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5 relative"
        >
          {/* Card 1: Tall Vertical Card (Left Column) */}
          <div className="group relative bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 rounded-4xl p-6 sm:p-8 pb-0 overflow-hidden min-h-[520px] md:row-span-2 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Ambient Radial Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,179,71,0.09), transparent 70%)`,
              }}
            />

            <div className="relative z-10 text-center mb-6 transition-transform duration-300 group-hover:scale-[1.02]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] bg-[#FFB347]/15 px-3 py-1 rounded-full inline-block mb-3">
                {locale === "zh" ? "自动化发现" : "AI Discovery Microservice"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#133020] dark:text-white leading-tight mb-2">
                {locale === "zh"
                  ? "AI 自动化全网展会采集"
                  : "Autonomous AI Crawler Engine"}
              </h3>
              <p className="text-[#133020]/75 dark:text-white/70 text-xs sm:text-sm max-w-sm mx-auto">
                {locale === "zh"
                  ? "结合 Apify 搜索引擎与 Google Gemini 模型，自动提取峰会日期、展位规格与买家画像"
                  : "Continuous multi-directory scraping + Gemini Flash semantic extraction across global tech directories."}
              </p>
            </div>

            {/* Simulated Phone Screen Mockup */}
            <div className="flex-1 flex justify-center items-end transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="relative bg-white dark:bg-[#133020] shadow-2xl border-[#133020] dark:border-white/20 overflow-hidden z-10 w-60 sm:w-68 h-96 sm:h-108 rounded-t-4xl border-4 sm:border-6 border-b-0">
                {/* Top Notch */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-[#133020] dark:bg-black rounded-full z-20 top-2 w-20 h-4.5" />

                {/* Device Screen Content */}
                <div className="absolute inset-0 pt-10 px-4 bg-[#F9F7F7] dark:bg-[#0c2419]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#133020] dark:text-white flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-[#046241] dark:text-[#FFB347] animate-pulse" />
                      Live Feed
                    </span>
                    <span className="text-[10px] font-semibold text-[#046241] dark:text-[#FFB347] bg-[#FFB347]/20 px-2 py-0.5 rounded-full">
                      42 New
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-[#133020] dark:text-white leading-tight">
                    Discovery Queue
                  </h4>
                  <p className="text-[11px] text-[#708E7C] dark:text-white/60 mb-4">
                    Ready for supervisor audit & fit verification.
                  </p>

                  {/* Gradient Card Inside Phone */}
                  <div className="relative bg-gradient-to-br from-[#FFB347] via-[#FFC370] to-[#E89131] rounded-2xl p-4 shadow-lg text-[#133020] overflow-hidden mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#133020]/70">
                          Exhibition
                        </p>
                        <p className="text-base font-black">MWC Barcelona 2027</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-[#133020]" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold pt-2 border-t border-[#133020]/20">
                      <span>FIT SCORE: 4.8 / 5.0</span>
                      <span className="bg-[#133020] text-white px-2 py-0.5 rounded-md text-[10px]">
                        HIGH PRIORITY
                      </span>
                    </div>
                  </div>

                  {/* Second Item */}
                  <div className="p-3 bg-white dark:bg-[#133020] rounded-xl border border-[#D8D2C8] dark:border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#133020] dark:text-white">
                        VivaTech Paris 2027
                      </p>
                      <p className="text-[10px] text-[#708E7C] dark:text-white/60">
                        AIGC & Foundation Models
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#046241] dark:text-[#FFB347]">
                      4.7★
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Wide Card (Top Right) with Interactive Weight Simulation */}
          <div className="group relative bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 rounded-4xl p-6 sm:p-8 overflow-hidden min-h-[300px] flex flex-col md:flex-row justify-between items-center shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Ambient Radial Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,179,71,0.09), transparent 70%)`,
              }}
            />

            <div className="relative z-10 max-w-sm mb-6 md:mb-0 transition-transform duration-300 group-hover:scale-[1.01]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C17110] dark:text-[#FFB347] bg-[#FFB347]/15 px-3 py-1 rounded-full inline-block mb-3">
                {locale === "zh" ? "多维契合度" : "Multi-Vector Fit"}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#133020] dark:text-white leading-tight mb-2">
                {locale === "zh"
                  ? "实时战略契合度评分系统"
                  : "Real-Time Strategic Fit Scoring"}
              </h3>
              <p className="text-[#133020]/75 dark:text-white/70 text-xs sm:text-sm mb-4">
                {locale === "zh"
                  ? "依据 27 项审核参数，将全球展会一键对齐 Lifewood 6 大核心 AI 数据与数据标注业务线"
                  : "Instant 1.0 to 5.0 rating calibrated against Lifewood's core data labeling and autonomous driving offerings."}
              </p>

              {/* Interactive Vector Toggle Pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setBuyerWeight(!buyerWeight)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                    buyerWeight
                      ? "bg-[#046241] text-white border-[#046241]"
                      : "bg-transparent text-[#708E7C] dark:text-white/50 border-[#D8D2C8] dark:border-white/10"
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>Buyer Alignment</span>
                </button>
                <button
                  onClick={() => setSponsorWeight(!sponsorWeight)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                    sponsorWeight
                      ? "bg-[#046241] text-white border-[#046241]"
                      : "bg-transparent text-[#708E7C] dark:text-white/50 border-[#D8D2C8] dark:border-white/10"
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>Sponsor ROI</span>
                </button>
                <button
                  onClick={() => setServiceWeight(!serviceWeight)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                    serviceWeight
                      ? "bg-[#046241] text-white border-[#046241]"
                      : "bg-transparent text-[#708E7C] dark:text-white/50 border-[#D8D2C8] dark:border-white/10"
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>6 Core Services</span>
                </button>
              </div>
            </div>

            {/* Concentric Radar Circles & Animated Scoring Pill */}
            <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
              {/* Concentric pulse rings */}
              <div className="absolute size-36 border border-[#FFB347]/80 rounded-full animate-pulse" />
              <div className="absolute size-44 border border-[#FFB347]/50 rounded-full" />
              <div className="absolute size-52 border border-[#046241]/30 dark:border-white/10 rounded-full" />

              {/* Center Scoring Pill */}
              <div className="relative z-20 bg-[#133020] text-white p-4 rounded-2xl shadow-xl text-center border border-[#FFB347]/40 transition-transform group-hover:scale-110">
                <p className="text-[10px] uppercase font-bold text-[#FFB347]">
                  FIT VERIFIED
                </p>
                <p className="text-3xl font-black">{calculatedScore} / 5.0</p>
                <div className="flex items-center gap-1 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#FFB347] text-[#FFB347]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sub-grid for Bottom Right (Cards 3 & 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 3: Global Market Coverage */}
            <div className="group relative bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 rounded-4xl p-6 flex flex-col justify-between items-center text-center min-h-[220px] shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] mb-1 block">
                  {locale === "zh" ? "全球覆盖" : "Global Footprint"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#133020] dark:text-white">
                  38+ {locale === "zh" ? "个国家" : "Countries"}
                </h3>
                <p className="text-xs text-[#708E7C] dark:text-white/60 mt-1">
                  {locale === "zh"
                    ? "亚太、北美、欧洲、中东"
                    : "APAC • North America • EMEA"}
                </p>
              </div>

              {/* Avatar Stack */}
              <div className="flex items-center -space-x-3 my-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-[#133020] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-[#133020] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-[#133020] object-cover"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#133020] bg-[#FFB347] text-[#133020] font-black text-xs flex items-center justify-center">
                  50+
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#133020] dark:text-white">
                <Star className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />
                <span>4.9 / 5 {locale === "zh" ? "商务团队好评" : "from BD Team"}</span>
              </div>
            </div>

            {/* Card 4: Enterprise Scale */}
            <div className="group relative bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 rounded-4xl p-6 flex flex-col justify-between min-h-[220px] shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] mb-1 block">
                  {locale === "zh" ? "治理体系" : "Data Accuracy"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#133020] dark:text-white">
                  {locale === "zh" ? "企业级准入" : "Built for Governance"}
                </h3>
                <p className="text-xs text-[#708E7C] dark:text-white/60 mt-1">
                  {locale === "zh" ? "27 项全景审核与双重核准" : "Double-blind review queues"}
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F9F7F7] dark:bg-white/5 border border-[#D8D2C8]/40 dark:border-white/10 text-xs font-bold text-[#133020] dark:text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-base">🚀</span>
                    520+ {locale === "zh" ? "场已核验" : "Audited"}
                  </span>
                  <span className="text-[#046241] dark:text-[#FFB347]">+28% YoY</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F9F7F7] dark:bg-white/5 border border-[#D8D2C8]/40 dark:border-white/10 text-xs font-bold text-[#133020] dark:text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-base">⚡</span>
                    99.8% {locale === "zh" ? "数据准确率" : "Accuracy"}
                  </span>
                  <span className="text-[#046241] dark:text-[#FFB347]">+0.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
