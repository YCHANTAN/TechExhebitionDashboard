"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function FaqSection() {
  const { locale } = useLocaleStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "How does the automated AI scraper discover global exhibitions?",
      qZh: "AI 自动化爬虫是如何检索和提炼全球科技展会的？",
      aEn:
        "Our engine leverages Apify Google Search crawler microservices combined with Google Gemini Flash models. It continuously monitors global convention centers, event directories, and organizer websites, automatically extracting dates, venues, attendee estimates, and sponsor tiers while screening out duplicates.",
      aZh:
        "我们的底层引擎依托 Apify 搜索引擎爬虫微服务与 Google Gemini Flash 大模型。全天候监测全球展馆、行业大会门户及官方主办方页面，自动结构化提取展会日期、场馆、预估买家规模与赞助门槛，并实施全网去重审查。",
    },
    {
      qEn: "How is the Strategic Fit Score (1.0 to 5.0) calculated?",
      qZh: "1.0 至 5.0 的战略契合度（Fit Score）是如何计算出来的？",
      aEn:
        "Every event is audited against Lifewood's 6 core service lines (Global AI Data, AIGC, Scanning & Indexing, Autonomous Driving, AEO/GEO, Edge Intelligence). The algorithm evaluates attendee seniority, sponsor profile, and thematic tracks to produce a calibrated fit rating.",
      aZh:
        "系统将每场峰会与 Lifewood 的 6 大核心业务线（全球 AI 数据、AIGC 生成式模型安全、文档数字化与扫描、自动驾驶多传感器融合、AEO/GEO、边缘端侧智能）进行多维重合度计算，综合受众决策层级、赞助商构成得出客观量化评分。",
    },
    {
      qEn: "What is the governance and review queue workflow?",
      qZh: "专员录入与 AI 抓取记录的审核治理流程是怎样的？",
      aEn:
        "Any record discovered by AI or drafted by intern researchers is placed into a centralized review queue. Supervisors and Admins can audit all 27 technical parameters, verify official sources, and approve entries before they appear in the official 2026–2027 calendar.",
      aZh:
        "由 AI 爬虫新发现或专员草拟的展会均先存入统一审核治理队列。业务总监与管理员可在专职审核页面核对全部 27 项技术指标、复核官方信源并一键批准准入，确保主数据库 100% 严谨可靠。",
    },
    {
      qEn: "Can we export board-ready briefings and reports?",
      qZh: "系统是否支持导出供董事会汇报的专属商业报告？",
      aEn:
        "Yes. The platform provides one-click PDF and formatted Excel (.xlsx) export capabilities. Reports include executive KPI summaries, Fit Score breakdowns, regional distribution charts, and delegate assignment tracking.",
      aZh:
        "完全支持。平台提供符合集团视觉标准的 1-Click PDF 战略简报与格式化 Excel（.xlsx）报表导出，内嵌高管 KPI 概览、契合度雷达分析、各月分布柱状图以及参展代表指派记录。",
    },
    {
      qEn: "Does the platform support multiple languages?",
      qZh: "平台是否原生支持多语种界面与国际化切换？",
      aEn:
        "Yes, LIFEVENT features instant hot-swapping between English (EN) and Simplified Chinese (中文) powered by a persisted Zustand store, with typography optimized for both Western and CJK typography.",
      aZh:
        "是的，LIFEVENT 支持 English（英文）与 简体中文（ZH）毫秒级无缝热切换，由 Zustand 状态持久化驱动，并针对中英文字体进行了专属字偶距与行高优化。",
    },
  ];

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-transparent px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#046241]/10 text-[#046241] dark:text-[#FFB347] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{locale === "zh" ? "解答疑惑" : "Common Questions"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#133020] dark:text-white mb-4">
            {locale === "zh" ? "常见问题答疑" : "Frequently Asked Questions"}
          </h2>
          <p className="text-sm sm:text-base text-[#133020]/75 dark:text-white/70">
            {locale === "zh"
              ? "深入了解 Lifewood 展会情报平台的底层算法、审核准则与协作模式。"
              : "Everything you need to know about our data models, crawler pipelines, and governance."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-hidden cursor-pointer gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#133020] dark:text-white">
                    {locale === "zh" ? faq.qZh : faq.qEn}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#FFB347] text-[#133020]"
                        : "bg-[#F5EEDB] dark:bg-white/10 text-[#133020] dark:text-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#133020]/75 dark:text-white/70 leading-relaxed border-t border-[#D8D2C8]/50 dark:border-white/10 mt-1">
                    {locale === "zh" ? faq.aZh : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
