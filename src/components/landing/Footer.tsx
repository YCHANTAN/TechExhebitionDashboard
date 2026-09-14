"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function Footer() {
  const { locale } = useLocaleStore();

  return (
    <footer className="w-full bg-[#F5EEDB] dark:bg-[#06160e] border-t border-[#D8D2C8] dark:border-white/10 pt-16 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#D8D2C8]/70 dark:border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#133020] dark:bg-[#046241] flex items-center justify-center p-1.5 shadow-xs">
                  <img
                    src="/ICON_logo.png"
                    alt="Lifewood Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base font-black tracking-tight text-[#133020] dark:text-white">
                  LIFEVENT
                </span>
              </div>
              <p className="text-xs text-[#133020]/75 dark:text-white/70 leading-relaxed mb-4">
                {locale === "zh"
                  ? "Lifewood 全球科技展会商业智能与参展战略决策门户。覆盖全球 500+ 场高价值行业峰会。"
                  : "Lifewood's Global Technology Exhibition Intelligence and Strategic Sourcing Portal."}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#046241]/10 text-[#046241] dark:text-[#FFB347] text-[11px] font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{locale === "zh" ? "全系统正常运行" : "All Systems Operational"}</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#133020] dark:text-white mb-4">
              {locale === "zh" ? "情报平台模块" : "Intelligence Portal"}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#133020]/75 dark:text-white/70 font-semibold">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "决策总览仪表板" : "Executive Dashboard"}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "全球展会名录 (500+)" : "Exhibitions Catalog"}
                </Link>
              </li>
              <li>
                <Link
                  href="/scraper"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "AI 智能爬虫引擎" : "AI Scraper Microservice"}
                </Link>
              </li>
              <li>
                <Link
                  href="/queues"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "多级审核治理队列" : "Governance Review Queues"}
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "高管简报与导出" : "Executive Reports Export"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 6 Business Lines */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#133020] dark:text-white mb-4">
              {locale === "zh" ? "6 大核心业务线" : "Core Business Lines"}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#133020]/75 dark:text-white/70 font-semibold">
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  Global AI Data (Annotation & RLHF)
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  AIGC, Safety & Red Teaming
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  High-Volume Scanning & OCR
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  Autonomous Driving 3D LiDAR
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  AEO & Generative Engine Optimization
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  EDGE Intelligence & IoT
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Enterprise & Compliance */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#133020] dark:text-white mb-4">
              {locale === "zh" ? "企业与合规" : "Governance & Access"}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#133020]/75 dark:text-white/70 font-semibold">
              <li>
                <Link
                  href="/login"
                  className="hover:text-[#046241] dark:hover:text-[#FFB347] transition-colors"
                >
                  {locale === "zh" ? "专员与管理员登录" : "Portal Single Sign-On"}
                </Link>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  27-Column Audit Standard
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  Role-Based Access Control (RBAC)
                </span>
              </li>
              <li>
                <span className="hover:text-[#046241] dark:hover:text-[#FFB347] cursor-default">
                  Data Privacy & Deduplication SLA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#133020]/70 dark:text-white/50 font-medium">
          <p>
            © 2026–2027 Lifewood Data Technology. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with precision for <span className="font-bold text-[#133020] dark:text-[#FFB347]">Lifewood</span> Global BD Leadership
          </p>
        </div>
      </div>
    </footer>
  );
}
