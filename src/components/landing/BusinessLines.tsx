"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Sparkles,
  FileText,
  Car,
  Search,
  Cpu,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function BusinessLines() {
  const { locale } = useLocaleStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const lines = [
    {
      id: "ai-data",
      icon: Globe,
      color: "#046241",
      badge: "CORE DATA",
      category: "data",
      titleEn: "Global AI Data Collection & Annotation",
      titleZh: "全球 AI 数据采集与高精度标注",
      descEn:
        "Multilingual speech, text, image, and multimodal data collection across 50+ languages with RLHF human-in-the-loop workflows.",
      descZh:
        "涵盖 50+ 语言的多语种语音、文本、图像与多模态数据采集与标注，全面赋能大模型训练与 RLHF 人工反馈强化学习。",
      targetSummits: ["CES Las Vegas", "MWC Barcelona", "AI Summit London"],
      averageScore: "4.8 / 5.0",
      matchedEvents: 142,
    },
    {
      id: "aigc",
      icon: Sparkles,
      color: "#133020",
      badge: "GENERATIVE AI",
      category: "ai",
      titleEn: "AIGC, Prompt Engineering & Safety",
      titleZh: "AIGC 生成式 AI 提示词与模型安全",
      descEn:
        "Foundational LLM evaluation, red teaming, jailbreak testing, synthetic data generation, and guardrail validation.",
      descZh:
        "基座大模型评测、红队攻防测试、越狱防护校验、高质量合成数据生成与安全对齐合规服务。",
      targetSummits: ["VivaTech Paris", "AI Expo Tokyo", "Web Summit Lisbon"],
      averageScore: "4.7 / 5.0",
      matchedEvents: 98,
    },
    {
      id: "scanning",
      icon: FileText,
      color: "#C17110",
      badge: "DIGITIZATION",
      category: "enterprise",
      titleEn: "Global Scanning & Historical Indexing",
      titleZh: "全球超大规模文档数字化与档案索引",
      descEn:
        "Ultra-high-volume document scanning, heritage archive preservation, multi-language OCR transcription, and structured indexing.",
      descZh:
        "海量历史文书高精度扫描、古籍数字化建档、多语种 OCR 文字识别与知识库结构化编目。",
      targetSummits: ["CeBIT / Hannover", "GITEX Dubai", "Digital Archiving EXPO"],
      averageScore: "4.6 / 5.0",
      matchedEvents: 64,
    },
    {
      id: "autonomous",
      icon: Car,
      color: "#034E34",
      badge: "MOBILITY",
      category: "mobility",
      titleEn: "Autonomous Driving & Sensor Fusion",
      titleZh: "自动驾驶与 3D 点云多传感器融合",
      descEn:
        "3D LiDAR point cloud segmentation, 2D/3D cuboids, lane polygon tracking, semantic segmentation, and edge sensor telemetry.",
      descZh:
        "3D 激光雷达点云语义分割、连续帧 3D 边界框、高精车道线多边形标注与车载边缘传感器遥测。",
      targetSummits: ["AutoSens Detroit", "Automotive World Tokyo", "IAA Mobility"],
      averageScore: "4.9 / 5.0",
      matchedEvents: 85,
    },
    {
      id: "aeo",
      icon: Search,
      color: "#E89131",
      badge: "AI SEARCH",
      category: "ai",
      titleEn: "AEO / GEO Answer Engine Optimization",
      titleZh: "AEO / GEO 问答生成引擎优化",
      descEn:
        "Optimizing enterprise knowledge visibility for generative search engines, conversational agents, and RAG architectures.",
      descZh:
        "为生成式搜索引擎、对话式 AI 代理与 RAG 检索增强架构提供企业级知识可见度与引用率优化。",
      targetSummits: ["SMX Advanced", "Google Cloud Next", "Search Central Summit"],
      averageScore: "4.8 / 5.0",
      matchedEvents: 56,
    },
    {
      id: "edge",
      icon: Cpu,
      color: "#417256",
      badge: "EMBEDDED AI",
      category: "mobility",
      titleEn: "EDGE Intelligence & On-Device ML",
      titleZh: "边缘智能与端侧轻量化模型",
      descEn:
        "Ultra-low-latency on-device inference, embedded computer vision, smart camera feeds, and industrial robotics telemetry.",
      descZh:
        "超低延迟端侧离线推理、嵌入式计算机视觉算法、工业机器人遥测与边缘物联网智能感知。",
      targetSummits: ["Computex Taipei", "Embedded World", "SPS Automation"],
      averageScore: "4.8 / 5.0",
      matchedEvents: 75,
    },
  ];

  const filteredLines =
    activeCategory === "all"
      ? lines
      : lines.filter((item) => item.category === activeCategory);

  const selectedLine = lines.find((l) => l.id === selectedLineId);

  return (
    <section id="business-lines" className="w-full px-6 py-24 bg-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#133020] dark:text-white mb-4">
            {locale === "zh"
              ? "展会精准对接 Lifewood 核心服务"
              : "Calibrated to Lifewood's 6 Strategic Service Lines"}
          </h2>
          <p className="text-sm sm:text-base text-[#133020]/75 dark:text-white/70">
            {locale === "zh"
              ? "系统自动将全球 500+ 场展会按参展买家、赞助权益与演讲主题，与我们 6 项服务深度匹配，计算权威契合度评分。"
              : "Every conference is audited against specific enterprise buyer profiles, sponsor levels, and Lifewood capabilities."}
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", labelEn: "All 6 Business Lines", labelZh: "全部 6 大业务线" },
            { id: "data", labelEn: "AI Data & Annotation", labelZh: "AI 数据与标注" },
            { id: "ai", labelEn: "Generative AI & Search", labelZh: "生成式 AI 与搜索" },
            { id: "mobility", labelEn: "Mobility & Edge", labelZh: "自动驾驶与端侧" },
            { id: "enterprise", labelEn: "Digitization", labelZh: "数字化与建档" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#133020] text-white dark:bg-[#FFB347] dark:text-[#133020] shadow-sm"
                  : "bg-white/80 dark:bg-white/5 text-[#133020]/70 dark:text-white/70 hover:bg-white dark:hover:bg-white/10 border border-[#D8D2C8]/60 dark:border-white/10"
              }`}
            >
              {locale === "zh" ? cat.labelZh : cat.labelEn}
            </button>
          ))}
        </div>

        {/* 6 Grid Cards with Hover Glow & Interactive Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLines.map((item) => {
            const isSelected = selectedLineId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedLineId(isSelected ? null : item.id)}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#081C12] border transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1.5 ${
                  isSelected
                    ? "border-[#046241] dark:border-[#FFB347] ring-2 ring-[#FFB347]/30"
                    : "border-[#D8D2C8] dark:border-white/15"
                }`}
              >
                {/* Top Accent Line */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F9F7F7] dark:bg-white/10 flex items-center justify-center text-[#133020] dark:text-[#FFB347] transition-transform group-hover:scale-110">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-[#133020]/5 dark:bg-white/5 text-[#708E7C] dark:text-[#FFB347] border border-[#D8D2C8]/50 dark:border-white/10 uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#133020] dark:text-white mb-2 group-hover:text-[#046241] dark:group-hover:text-[#FFB347] transition-colors">
                    {locale === "zh" ? item.titleZh : item.titleEn}
                  </h3>
                  <p className="text-xs text-[#133020]/70 dark:text-white/60 leading-relaxed">
                    {locale === "zh" ? item.descZh : item.descEn}
                  </p>
                </div>

                {/* Target Summits Footer */}
                <div className="pt-4 border-t border-[#D8D2C8]/50 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#708E7C] dark:text-white/50">
                      {locale === "zh" ? "重点对标展会" : "Target Summits"}
                    </span>
                    <span className="text-[10px] font-bold text-[#046241] dark:text-[#FFB347]">
                      {item.matchedEvents} Events
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.targetSummits.map((summit, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F9F7F7] dark:bg-[#133020] text-[#133020] dark:text-[#F5EEDB] border border-[#D8D2C8]/40 dark:border-white/10"
                      >
                        {summit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Line Interactive Inspection Drawer */}
        {selectedLine && (
          <div className="mt-8 p-6 rounded-3xl bg-white dark:bg-[#081C12] border border-[#046241]/30 dark:border-[#FFB347]/30 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C17110] dark:text-[#FFB347] block mb-1">
                  Active Service Line Strategy Matrix
                </span>
                <h4 className="text-xl font-bold text-[#133020] dark:text-white">
                  {selectedLine.titleEn}
                </h4>
                <p className="text-xs text-[#133020]/70 dark:text-white/70 mt-1 max-w-2xl">
                  LifeScout continuously maps this capability to upcoming international conferences, scoring keynote tracks, sponsor levels, and attendee buyer intent.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#708E7C] dark:text-white/50 block">
                    Average Fit Score
                  </span>
                  <span className="text-lg font-black text-[#046241] dark:text-[#FFB347]">
                    {selectedLine.averageScore}
                  </span>
                </div>
                <Link
                  href="/events"
                  className="px-4 py-2 rounded-xl bg-[#133020] text-white hover:bg-[#046241] dark:bg-[#FFB347] dark:text-[#133020] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Filter Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
