"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Globe2,
  Cpu,
  Radio,
  Car,
  Bot,
  Terminal,
  ShieldCheck,
  X,
  Calendar,
  MapPin,
  TrendingUp,
  ExternalLink,
  Star,
} from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

interface SummitItem {
  id: string;
  name: string;
  location: string;
  date: string;
  fitScore: string;
  tag: string;
  businessLine: string;
  attendees: string;
  icon: React.ElementType;
}

const SUMMITS: SummitItem[] = [
  {
    id: "ces-2027",
    name: "CES 2027",
    location: "Las Vegas, USA",
    date: "Jan 07–10, 2027",
    fitScore: "4.9",
    tag: "AI & Devices",
    businessLine: "EDGE Intelligence & On-Device ML",
    attendees: "140,000+ Attendees",
    icon: Cpu,
  },
  {
    id: "mwc-2027",
    name: "MWC Barcelona 2027",
    location: "Barcelona, Spain",
    date: "Mar 01–04, 2027",
    fitScore: "4.8",
    tag: "Telecom & Edge",
    businessLine: "Global AI Data & RLHF",
    attendees: "105,000+ Enterprise Buyers",
    icon: Radio,
  },
  {
    id: "vivatech-2027",
    name: "VivaTech 2027",
    location: "Paris, France",
    date: "May 19–22, 2027",
    fitScore: "4.7",
    tag: "Generative AI",
    businessLine: "AIGC, Prompt Engineering & Safety",
    attendees: "150,000+ Delegates",
    icon: Sparkles,
  },
  {
    id: "computex-2027",
    name: "Computex 2027",
    location: "Taipei, Taiwan",
    date: "Jun 02–05, 2027",
    fitScore: "4.9",
    tag: "AI Silicon & HPC",
    businessLine: "Autonomous Driving & Spatial Data",
    attendees: "85,000+ Hardware Leaders",
    icon: Terminal,
  },
  {
    id: "gitex-2027",
    name: "GITEX Global 2027",
    location: "Dubai, UAE",
    date: "Oct 18–22, 2027",
    fitScore: "4.8",
    tag: "Enterprise Cloud",
    businessLine: "GEO Knowledge & Search Discovery",
    attendees: "180,000+ Tech Leaders",
    icon: Globe2,
  },
  {
    id: "ifa-2027",
    name: "IFA Berlin 2027",
    location: "Berlin, Germany",
    date: "Sep 03–07, 2027",
    fitScore: "4.6",
    tag: "Smart Systems",
    businessLine: "High-Volume Scanning & OCR",
    attendees: "182,000+ Trade Visitors",
    icon: Bot,
  },
  {
    id: "websummit-2027",
    name: "Web Summit 2027",
    location: "Lisbon, Portugal",
    date: "Nov 08–11, 2027",
    fitScore: "4.7",
    tag: "Global Ecosystem",
    businessLine: "AIGC, Prompt Engineering & Safety",
    attendees: "70,000+ Founders & VCs",
    icon: ShieldCheck,
  },
  {
    id: "autosens-2027",
    name: "AutoSens Detroit 2027",
    location: "Michigan, USA",
    date: "May 11–13, 2027",
    fitScore: "4.9",
    tag: "Autonomous Driving",
    businessLine: "Autonomous Driving & Spatial Data",
    attendees: "12,000+ OEM Engineers",
    icon: Car,
  },
];

export function Marquee() {
  const { locale } = useLocaleStore();
  const [selectedSummit, setSelectedSummit] = useState<SummitItem | null>(null);

  return (
    <div className="w-full pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-extrabold text-[#708E7C] dark:text-[#FFB347] flex items-center justify-center gap-2">
          <span>✦</span>
          <span>
            {locale === "zh"
              ? "实时跟踪全球 500+ 场经过核准的顶级科技展会（点击任意展会查看速报）"
              : "Tracking 500+ Audited Global Tech Exhibitions (Click any event to inspect)"}
          </span>
          <span>✦</span>
        </p>
      </div>

      {/* Marquee track with linear gradient fade masks on left and right */}
      <div className="relative w-full mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 py-3">
          {/* Sequence 1 */}
          {SUMMITS.map((item, idx) => (
            <button
              key={`summit-1-${idx}`}
              onClick={() => setSelectedSummit(item)}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-[#081C12]/90 border border-[#D8D2C8]/80 dark:border-white/10 shadow-xs hover:shadow-md hover:border-[#046241] dark:hover:border-[#FFB347] hover:-translate-y-0.5 transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#133020]/5 dark:bg-white/5 flex items-center justify-center text-[#046241] dark:text-[#FFB347] group-hover:scale-110 transition-transform">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#133020] dark:text-white flex items-center gap-1.5">
                  {item.name}
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#FFB347]/20 text-[#C17110] dark:text-[#FFB347]">
                    {item.fitScore}★
                  </span>
                </span>
                <span className="text-[10px] text-[#708E7C] dark:text-white/60">
                  {item.location}
                </span>
              </div>
            </button>
          ))}

          {/* Sequence 2 for seamless infinite loop */}
          {SUMMITS.map((item, idx) => (
            <button
              key={`summit-2-${idx}`}
              onClick={() => setSelectedSummit(item)}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-[#081C12]/90 border border-[#D8D2C8]/80 dark:border-white/10 shadow-xs hover:shadow-md hover:border-[#046241] dark:hover:border-[#FFB347] hover:-translate-y-0.5 transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#133020]/5 dark:bg-white/5 flex items-center justify-center text-[#046241] dark:text-[#FFB347] group-hover:scale-110 transition-transform">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#133020] dark:text-white flex items-center gap-1.5">
                  {item.name}
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#FFB347]/20 text-[#C17110] dark:text-[#FFB347]">
                    {item.fitScore}★
                  </span>
                </span>
                <span className="text-[10px] text-[#708E7C] dark:text-white/60">
                  {item.location}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Quick-Inspection Modal */}
      {selectedSummit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedSummit(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#081C12] border border-[#D8D2C8] dark:border-white/15 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSummit(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#133020] dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Summit Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#046241] text-white flex items-center justify-center shrink-0 shadow-md">
                <selectedSummit.icon className="w-6 h-6 text-[#FFB347]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFB347]/20 text-[#C17110] dark:text-[#FFB347]">
                    {selectedSummit.tag}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {selectedSummit.fitScore} / 5.0 FIT
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#133020] dark:text-white leading-tight">
                  {selectedSummit.name}
                </h3>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#F9F7F7] dark:bg-white/5 border border-[#D8D2C8]/50 dark:border-white/10">
                <span className="text-[10px] text-[#708E7C] dark:text-white/60 uppercase font-semibold block mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Date
                </span>
                <span className="text-xs font-bold text-[#133020] dark:text-white">
                  {selectedSummit.date}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F9F7F7] dark:bg-white/5 border border-[#D8D2C8]/50 dark:border-white/10">
                <span className="text-[10px] text-[#708E7C] dark:text-white/60 uppercase font-semibold block mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Venue
                </span>
                <span className="text-xs font-bold text-[#133020] dark:text-white">
                  {selectedSummit.location}
                </span>
              </div>
            </div>

            {/* Business Line Alignment */}
            <div className="p-4 rounded-2xl bg-[#046241]/10 dark:bg-[#046241]/20 border border-[#046241]/20 dark:border-[#046241]/40 mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#046241] dark:text-[#FFB347] block mb-1">
                Matched Core Service Line
              </span>
              <p className="text-sm font-bold text-[#133020] dark:text-white">
                {selectedSummit.businessLine}
              </p>
              <p className="text-xs text-[#133020]/70 dark:text-white/70 mt-1">
                Audited against enterprise buyer attendance, keynote topics, and sponsorship value.
              </p>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#708E7C] dark:text-white/60">
                {selectedSummit.attendees}
              </span>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#133020] hover:bg-[#046241] text-white dark:bg-[#FFB347] dark:text-[#133020] dark:hover:bg-[#FFC370] text-xs font-semibold transition-colors"
              >
                <span>Audit Full Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
