"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowDownRight } from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function PricingPlans() {
  const { locale } = useLocaleStore();
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      id: "analyst",
      nameEn: "Field Analyst",
      nameZh: "业务开拓专员",
      descEn: "Essential exhibition discovery and filtering for regional BD reps.",
      descZh: "专为区域商务代表打造的基础展会发现与检索工具。",
      monthlyPrice: 39,
      annualPrice: 29,
      featured: false,
      featuresEn: [
        "Full access to 500+ Verified Exhibitions",
        "Multi-parameter search & region filtering",
        "Strategic Fit Score breakdown (1.0–5.0)",
        "Mark attended status & audit history",
        "Standard event calendar view",
      ],
      featuresZh: [
        "完整检索 500+ 场已核验全球展会库",
        "多维度关键词、国家与区域筛选",
        "战略契合度综合评分 (1.0–5.0)",
        "参展状态标记与历史归档",
        "标准展会日历时间轴视图",
      ],
    },
    {
      id: "pro",
      nameEn: "Intelligence Leader",
      nameZh: "业务总监 / 专家版",
      descEn: "Complete AI crawling, governance queues, and executive export tools.",
      descZh: "配备 AI 自动化爬虫、双重审核队列与高管级报表导出。",
      monthlyPrice: 99,
      annualPrice: 79,
      featured: true,
      badgeEn: "MOST POPULAR",
      badgeZh: "最受欢迎",
      featuresEn: [
        "Everything in Field Analyst, plus:",
        "Apify + Gemini Flash automated AI crawler",
        "Supervisor & Intern review queues",
        "Real-time coverage gap alerts",
        "1-Click branded PDF & Excel reporting",
        "6 Business Line custom mapping",
      ],
      featuresZh: [
        "包含业务专员所有权益，外加：",
        "Apify + Gemini Flash 智能爬虫抓取",
        "专员草稿与总监审核治理队列",
        "全球展会覆盖盲区实时预警",
        "一键导出企业级 PDF / Excel 报告",
        "6 大核心业务线深度客制化映射",
      ],
    },
    {
      id: "enterprise",
      nameEn: "Global Enterprise",
      nameZh: "集团全域方案",
      descEn: "Bespoke global intelligence deployment for multi-division enterprises.",
      descZh: "专为多分支跨国集团量身定制的全局商业智能方案。",
      monthlyPrice: 249,
      annualPrice: 199,
      featured: false,
      featuresEn: [
        "Everything in Intelligence Leader, plus:",
        "Unlimited user seats & role permissions",
        "Dedicated Apify scraping cloud concurrency",
        "Direct Google Gemini API enterprise keys",
        "Custom Fit Score algorithmic weights",
        "24/7 Priority engineering SLA",
      ],
      featuresZh: [
        "包含总监版所有功能，外加：",
        "无限制席位与细粒度 RBAC 权限控制",
        "专属 Apify 高并发云端爬虫资源池",
        "接入企业级 Google Gemini API 密钥",
        "契合度评估算法权重深度自定义",
        "24/7 专属工程师与技术支持 SLA",
      ],
    },
  ];

  return (
    <section id="pricing" className="w-full bg-transparent px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB347]/20 text-[#C17110] dark:text-[#FFB347] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FFB347]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "zh" ? "方案与席位" : "Access & Pricing"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#133020] dark:text-white mb-4">
            {locale === "zh" ? "透明且灵活的席位规划" : "Simple, Transparent Licensing"}
          </h2>
          <p className="text-sm sm:text-base text-[#133020]/75 dark:text-white/70">
            {locale === "zh"
              ? "按团队规模灵活选配，让全球拓展团队随时调用最高精度的展会商业情报。"
              : "Equip your business development and executive leadership with precision market intelligence."}
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#F5EEDB] dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/20">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !annual
                  ? "bg-[#133020] text-white shadow-sm"
                  : "text-[#133020] dark:text-white/70 hover:text-black"
              }`}
            >
              {locale === "zh" ? "月付计划" : "Monthly Billing"}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                annual
                  ? "bg-[#133020] text-white shadow-sm"
                  : "text-[#133020] dark:text-white/70 hover:text-black"
              }`}
            >
              <span>{locale === "zh" ? "年付方案" : "Annual Billing"}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFB347] text-[#133020] font-black">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#133020] text-white shadow-2xl scale-100 lg:-translate-y-2 border-2 border-[#FFB347]"
                    : "bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 text-[#133020] dark:text-white shadow-md hover:shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#FFB347] text-[#133020] text-[10px] font-black tracking-widest uppercase shadow-md">
                    {locale === "zh" ? plan.badgeZh : plan.badgeEn}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {locale === "zh" ? plan.nameZh : plan.nameEn}
                  </h3>
                  <p
                    className={`text-xs mb-6 ${
                      plan.featured
                        ? "text-[#F5EEDB]/80"
                        : "text-[#133020]/70 dark:text-white/60"
                    }`}
                  >
                    {locale === "zh" ? plan.descZh : plan.descEn}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight">
                      ${price}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        plan.featured ? "text-[#F5EEDB]/70" : "text-[#708E7C] dark:text-white/60"
                      }`}
                    >
                      / {locale === "zh" ? "用户 / 月" : "user / month"}
                    </span>
                  </div>

                  <hr
                    className={`my-6 ${
                      plan.featured
                        ? "border-white/15"
                        : "border-[#D8D2C8]/60 dark:border-white/10"
                    }`}
                  />

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {(locale === "zh" ? plan.featuresZh : plan.featuresEn).map(
                      (feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              plan.featured
                                ? "bg-[#FFB347] text-[#133020]"
                                : "bg-[#046241]/10 dark:bg-white/10 text-[#046241] dark:text-[#FFB347]"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Card CTA */}
                <Link
                  href="/dashboard"
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.featured
                      ? "bg-[#FFB347] text-[#133020] hover:bg-[#FFC370] shadow-md shadow-[#FFB347]/20"
                      : "bg-[#133020] text-white hover:bg-[#034E34] dark:bg-white/10 dark:hover:bg-white/20"
                  }`}
                >
                  <span>{locale === "zh" ? "立即体验" : "Start Deployment"}</span>
                  <ArrowDownRight className="w-4 h-4 -rotate-45 stroke-[2.5]" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
