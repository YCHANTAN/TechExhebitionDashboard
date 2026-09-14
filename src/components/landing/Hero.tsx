"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  TrendingUp,
  Radar,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
  Radio,
  ExternalLink,
} from "lucide-react";
import { LivingWoodNetwork } from "@/components/ui/LivingWoodNetwork";
import { useLocaleStore } from "@/stores/locale-store";

export function Hero() {
  const { locale } = useLocaleStore();
  const [activeTab, setActiveTab] = useState<"preview" | "scraper" | "radar">("preview");
  const [selectedRadarEvent, setSelectedRadarEvent] = useState(0);

  // 3D Perspective Tilt Physics
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const radarEvents = [
    {
      name: "MWC Barcelona 2027",
      category: "Telecom & Edge AI",
      overall: "4.8",
      vectors: [
        { label: "Enterprise Buyer Match", score: 96 },
        { label: "Sponsor Tier ROI", score: 92 },
        { label: "6 Core Service Alignment", score: 98 },
        { label: "Executive Speaker Tracks", score: 94 },
      ],
    },
    {
      name: "CES Las Vegas 2027",
      category: "Smart Hardware & Silicon",
      overall: "4.9",
      vectors: [
        { label: "Enterprise Buyer Match", score: 98 },
        { label: "Sponsor Tier ROI", score: 95 },
        { label: "6 Core Service Alignment", score: 96 },
        { label: "Executive Speaker Tracks", score: 97 },
      ],
    },
    {
      name: "VivaTech Paris 2027",
      category: "AIGC & Foundation Models",
      overall: "4.7",
      vectors: [
        { label: "Enterprise Buyer Match", score: 94 },
        { label: "Sponsor Tier ROI", score: 90 },
        { label: "6 Core Service Alignment", score: 97 },
        { label: "Executive Speaker Tracks", score: 93 },
      ],
    },
  ];

  return (
    <section
      id="overview"
      className="relative flex flex-col pt-28 sm:pt-36 pb-16 overflow-hidden"
    >
      {/* Dynamic Aura & Background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-[#F5EEDB] via-[#F9F7F7] to-[#F5EEDB] dark:from-[#081C12] dark:via-[#0c2419] dark:to-[#081C12] border-b border-[#D8D2C8]/50 dark:border-white/10"
        aria-hidden="true"
      >
        {/* Ambient Radial Highlights */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#FFB347]/18 dark:bg-[#046241]/30 rounded-full blur-3xl" />
        <div className="absolute -top-24 left-10 w-96 h-96 bg-[#046241]/12 dark:bg-[#FFB347]/12 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FFB347]/15 rounded-full blur-3xl" />

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
        <p className="max-w-2xl text-sm sm:text-base text-[#133020]/75 dark:text-[#F5EEDB]/80 font-normal leading-relaxed mb-8">
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
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl pt-8 border-t border-[#D8D2C8]/60 dark:border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#133020] dark:text-white">520+</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-[#F5EEDB]/70">
              {locale === "zh" ? "全球科技峰会" : "Audited Exhibitions"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#046241] dark:text-[#FFB347]">4.8 / 5</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-[#F5EEDB]/70">
              {locale === "zh" ? "平均战略契合度" : "Average Fit Score"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#133020] dark:text-white">6 大</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-[#F5EEDB]/70">
              {locale === "zh" ? "核心 AI 业务线" : "Core Business Lines"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-[#C17110] dark:text-[#FFB347]">100%</span>
            <span className="text-xs font-semibold text-[#708E7C] dark:text-[#F5EEDB]/70">
              {locale === "zh" ? "双重审查治理" : "Verified Governance"}
            </span>
          </div>
        </div>

        {/* 3D Interactive Dashboard Command Center */}
        <div className="relative w-full mt-12 perspective-1000">
          {/* Subtle Ambient Halo Glow */}
          <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-r from-[#046241]/25 via-[#FFB347]/20 to-[#046241]/25 rounded-[32px] blur-2xl -z-10 pointer-events-none opacity-75 dark:opacity-90 transition-opacity duration-300" />

          {/* Mouse-reactive 3D Tilting Card */}
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "scale3d(1.01, 1.01, 1.01)" : "scale3d(1, 1, 1)"}`,
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
            className="relative mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#133020]/20 via-[#133020]/10 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent border border-[#D8D2C8] dark:border-white/15 shadow-2xl backdrop-blur-md transform-style-3d cursor-default"
          >
            {/* Command Center Window Chrome Header */}
            <div className="h-11 px-3 sm:px-4 flex items-center justify-between rounded-t-2xl bg-[#133020] dark:bg-[#081C12] text-white">
              {/* Left: Window Dots & Protocol URL */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 text-[11px] tracking-wider text-white/50 font-mono hidden sm:inline">
                  lifewood.intelligence/command-center
                </span>
              </div>

              {/* Center: Interactive Tabs */}
              <div className="flex items-center bg-black/20 dark:bg-white/5 rounded-xl p-0.5 border border-white/10">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "preview"
                      ? "bg-[#FFB347] text-[#133020]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab("scraper")}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "scraper"
                      ? "bg-[#FFB347] text-[#133020]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>AI Crawler</span>
                </button>
                <button
                  onClick={() => setActiveTab("radar")}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === "radar"
                      ? "bg-[#FFB347] text-[#133020]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Radar className="w-3 h-3" />
                  <span>Fit Radar</span>
                </button>
              </div>

              {/* Right: Live Stream Pulse */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[10px] font-bold text-[#FFB347] uppercase tracking-wider hidden md:inline">
                  LIVE SYSTEM
                </span>
              </div>
            </div>

            {/* Command Center Dynamic View Area */}
            <div className="relative overflow-hidden rounded-b-2xl bg-[#081C12] text-white min-h-[440px] sm:min-h-[520px] flex flex-col justify-center">
              {/* TAB 1: LIVE DASHBOARD SCREENSHOT WITH FLOATING INTERACTIVE BADGES */}
              {activeTab === "preview" && (
                <div className="relative w-full aspect-[16/9] max-h-[560px] overflow-hidden mask-fade-b animate-in fade-in duration-200">
                  <img
                    src="/LifeScout Light Mode.png"
                    alt="LifeScout Exhibition Intelligence Dashboard"
                    className="w-full h-full object-cover object-top dark:hidden"
                  />
                  <img
                    src="/LifeScout Dark Mode.png"
                    alt="LifeScout Exhibition Intelligence Dashboard Dark"
                    className="w-full h-full object-cover object-top hidden dark:block"
                  />

                  {/* Floating Holographic Badge: Pipeline Metric */}
                  <div className="absolute top-6 left-6 p-3.5 rounded-2xl bg-white/90 dark:bg-[#133020]/95 backdrop-blur-md border border-[#D8D2C8] dark:border-white/20 shadow-xl hidden sm:flex items-center gap-3 hover:scale-105 transition-transform">
                    <div className="w-9 h-9 rounded-xl bg-[#046241] text-white flex items-center justify-center">
                      <TrendingUp className="w-4.5 h-4.5 text-[#FFB347]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#708E7C] dark:text-white/60 uppercase tracking-wider">
                        Forward Pipeline
                      </p>
                      <p className="text-xs sm:text-sm font-black text-[#133020] dark:text-white">
                        +148 Events for 2027
                      </p>
                    </div>
                  </div>

                  {/* Floating Holographic Badge: Radar Engine */}
                  <div className="absolute bottom-16 right-6 p-3.5 rounded-2xl bg-white/90 dark:bg-[#133020]/95 backdrop-blur-md border border-[#D8D2C8] dark:border-white/20 shadow-xl hidden sm:flex items-center gap-3 hover:scale-105 transition-transform">
                    <div className="w-9 h-9 rounded-xl bg-[#FFB347]/20 border border-[#FFB347]/40 text-[#C17110] dark:text-[#FFB347] flex items-center justify-center">
                      <Radar className="w-4.5 h-4.5 animate-spin duration-1000" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#708E7C] dark:text-white/60 uppercase tracking-wider">
                        Active Crawler Scan
                      </p>
                      <p className="text-xs sm:text-sm font-black text-[#133020] dark:text-white">
                        MWC Barcelona 2027
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE SIMULATED AI CRAWLER TERMINAL */}
              {activeTab === "scraper" && (
                <div className="p-6 sm:p-8 font-mono text-left w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#FFB347]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Autonomous Discovery Daemon v2.4
                        </span>
                      </div>
                      <span className="text-[11px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                        Crawling (4 concurrent workers)
                      </span>
                    </div>

                    {/* Console Log Lines */}
                    <div className="space-y-3 text-xs sm:text-[13px] text-white/80">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">[09:42:10]</span>
                        <span className="text-yellow-400 font-semibold">[APIFY]</span>
                        <span>Ingesting URL target: https://mwcbarcelona.com/exhibitors-2027</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">[09:42:13]</span>
                        <span className="text-cyan-400 font-semibold">[GEMINI]</span>
                        <span>
                          Extracted & validated 2,400+ exhibitors • Industry: Telecom, Edge AI & Cloud
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">[09:42:15]</span>
                        <span className="text-[#FFB347] font-semibold">[FIT-ENGINE]</span>
                        <span>
                          Strategic Fit Score: <strong className="text-white">4.8 / 5.0</strong> against Lifewood AI Data & RLHF lines
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">[09:42:18]</span>
                        <span className="text-purple-400 font-semibold">[GOVERNANCE]</span>
                        <span>Pushed to supervisor review queue #Q-2027-048 • Duplicate check passed (0 duplicates)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">[09:42:22]</span>
                        <span className="text-emerald-400 font-semibold">[PIPELINE]</span>
                        <span>Target calendar synchronization completed for EMEA & APAC regions.</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50 pt-2">
                        <span className="animate-pulse">❯ listening for upstream discovery triggers...</span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Bottom Controls */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-white/60 font-sans">
                      Next automatic crawl scheduled in <strong className="text-white">12m 40s</strong>
                    </span>
                    <Link
                      href="/scraper"
                      className="px-4 py-2 rounded-xl bg-[#046241] hover:bg-[#034E34] text-white font-sans font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Open Full Scraper Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 3: STRATEGIC FIT RADAR CALCULATOR */}
              {activeTab === "radar" && (
                <div className="p-6 sm:p-8 text-left w-full h-full flex flex-col justify-between animate-in fade-in duration-200">
                  <div>
                    {/* Header with Event Selectors */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-6">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          <Radar className="w-4 h-4 text-[#FFB347]" />
                          Interactive Strategic Fit Scoring Matrix
                        </h4>
                        <p className="text-xs text-white/60 mt-0.5">
                          Select an exhibition to observe multi-vector parameter weighting in real-time.
                        </p>
                      </div>

                      {/* Summit Selector Buttons */}
                      <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                        {radarEvents.map((item, idx) => (
                          <button
                            key={item.name}
                            onClick={() => setSelectedRadarEvent(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              selectedRadarEvent === idx
                                ? "bg-[#FFB347] text-[#133020] shadow-sm"
                                : "text-white/70 hover:text-white"
                            }`}
                          >
                            {item.name.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Score Grid & Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-6 items-center">
                      {/* Left: Overall Score Dial */}
                      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#FFB347] mb-1">
                          Verified Score
                        </span>
                        <div className="text-5xl font-black text-white tracking-tight mb-2">
                          {radarEvents[selectedRadarEvent].overall}
                          <span className="text-xl text-white/40 font-normal"> / 5.0</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold uppercase tracking-wider">
                          TIER-1 PRIORITY
                        </span>
                        <p className="text-[11px] text-white/60 mt-3 max-w-[200px]">
                          {radarEvents[selectedRadarEvent].category}
                        </p>
                      </div>

                      {/* Right: 4 Vector Breakdown Bars */}
                      <div className="space-y-4">
                        {radarEvents[selectedRadarEvent].vectors.map((vector) => (
                          <div key={vector.label} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-white/80">{vector.label}</span>
                              <span className="text-[#FFB347] font-bold">{vector.score}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#046241] to-[#FFB347] rounded-full transition-all duration-500"
                                style={{ width: `${vector.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Radar Bottom CTA */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/60">
                      Evaluated against 27 proprietary enterprise governance parameters.
                    </span>
                    <Link
                      href="/events"
                      className="text-[#FFB347] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Explore 500+ Scored Events</span>
                      <ArrowDownRight className="w-3.5 h-3.5 -rotate-45" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
