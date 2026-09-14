"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocaleStore } from "@/stores/locale-store";

export function TextReveal() {
  const { locale } = useLocaleStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const englishSentence =
    "Modern enterprise leadership uses LIFEVENT to evaluate every global tech exhibition touchpoint, blending autonomous AI crawling with strategic fit scoring across Lifewood's six core service lines in a unified system that drives measurable ROI worldwide.";

  const chineseSentence =
    "现代化企业高管团队依托 LIFEVENT 深度评估全球科技展会每一个战略契机，将自动化 AI 爬虫采集与 Lifewood 六大核心业务线的战略契合度评估深度融合，驱动全球参展业务实现更高投资回报。";

  const words = (locale === "zh" ? chineseSentence : englishSentence).split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // When element is in middle of viewport:
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full px-6 py-28 sm:py-36 bg-transparent"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-left leading-relaxed tracking-tight text-[#133020] dark:text-white">
          {words.map((word, idx) => {
            const wordThreshold = idx / words.length;
            const isRevealed = scrollProgress >= wordThreshold;

            return (
              <span
                key={idx}
                className="mr-2.5 inline-block transition-all duration-300 select-none cursor-default"
                style={{
                  opacity: isRevealed ? 1 : 0.18,
                  filter: isRevealed ? "blur(0px)" : "blur(4px)",
                  transform: isRevealed ? "translateY(0)" : "translateY(4px)",
                  color: isRevealed
                    ? word.includes("LIFEVENT") ||
                      word.includes("AI") ||
                      word.includes("ROI") ||
                      word.includes("Lifewood")
                      ? "#C17110"
                      : undefined
                    : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
