"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Check,
} from "lucide-react";
import { useLocaleStore } from "@/stores/locale-store";

export function Navbar() {
  const { locale, setLocale } = useLocaleStore();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);

    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const navLinks = [
    {
      href: "#overview",
      label: locale === "zh" ? "平台概览" : "Overview",
    },
    {
      href: "#capabilities",
      label: locale === "zh" ? "核心能力" : "Capabilities",
    },
    {
      href: "#how-it-works",
      label: locale === "zh" ? "运作机制" : "How It Works",
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5EEDB]/65 dark:bg-[#081C12]/65 backdrop-blur-xl backdrop-saturate-150 border-b border-[#133020]/[0.08] dark:border-white/[0.08] shadow-[0_4px_24px_-2px_rgba(19,48,32,0.06)] dark:shadow-[0_4px_30px_-2px_rgba(0,0,0,0.4)]"
          : "bg-[#F5EEDB]/40 dark:bg-[#081C12]/40 backdrop-blur-md backdrop-saturate-150 border-b border-[#133020]/[0.05] dark:border-white/[0.06]"
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 h-16 sm:h-18 flex items-center justify-between relative">
        {/* Far Top-Left: Brand Logo Flush to Left */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center group focus:outline-none transition-transform duration-200 group-hover:scale-105"
          >
            <img
              src="/LIFEVENT Light Mode.png"
              alt="LIFEVENT"
              className="h-8 sm:h-9 w-auto object-contain dark:hidden"
            />
            <img
              src="/LIFEVENT Dark Mode.png"
              alt="LIFEVENT"
              className="h-8 sm:h-9 w-auto object-contain hidden dark:block"
            />
          </Link>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium tracking-wide text-[#133020]/75 dark:text-[#F5EEDB]/80 hover:text-[#133020] dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Far Top-Right: Flush Controls in exact order (Sign In -> Language/Translator Dropdown -> Theme Switcher) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 1. Sign In Button */}
          <Link
            href="/login"
            className="h-8.5 sm:h-9 px-4 sm:px-5 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center bg-[#133020] hover:bg-[#046241] text-white dark:bg-[#F5EEDB] dark:text-[#133020] dark:hover:bg-white transition-all duration-200 shadow-xs hover:shadow active:scale-[0.98]"
          >
            {locale === "zh" ? "登录" : "Sign In"}
          </Link>

          {/* 2. Language/Translator Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-8.5 sm:h-9 px-2.5 sm:px-3 rounded-full border border-[#133020]/10 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 text-xs font-semibold text-[#133020] dark:text-[#F5EEDB] transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-[#046241] dark:text-[#FFB347]" />
              <span className="text-[11px] sm:text-xs uppercase">
                {locale === "zh" ? "中文" : "EN"}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-[#133020]/60 dark:text-white/60 transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu with Frosted Glass Effect */}
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-white/95 dark:bg-[#0c2419]/95 backdrop-blur-xl border border-[#D8D2C8]/80 dark:border-white/15 shadow-xl p-1.5 z-[100] animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => {
                    setLocale("en");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === "en"
                      ? "bg-[#046241]/10 text-[#046241] dark:bg-white/10 dark:text-[#FFB347]"
                      : "text-[#133020] dark:text-[#F5EEDB] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>English</span>
                  {locale === "en" && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
                <button
                  onClick={() => {
                    setLocale("zh");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    locale === "zh"
                      ? "bg-[#046241]/10 text-[#046241] dark:bg-white/10 dark:text-[#FFB347]"
                      : "text-[#133020] dark:text-[#F5EEDB] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>简体中文</span>
                  {locale === "zh" && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              </div>
            )}
          </div>

          {/* 3. Theme Switcher (Dark/Light Mode Circular Button) */}
          <button
            onClick={toggleTheme}
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full border border-[#133020]/10 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 flex items-center justify-center text-[#133020] dark:text-[#F5EEDB] transition-all duration-150 cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#FFB347] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#133020] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8.5 h-8.5 rounded-full border border-[#133020]/10 dark:border-white/15 bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 flex items-center justify-center text-[#133020] dark:text-white transition-colors cursor-pointer ml-0.5"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Frosted Glass Panel) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#133020]/[0.06] dark:border-white/[0.08] bg-[#F5EEDB]/95 dark:bg-[#081C12]/95 backdrop-blur-xl px-5 py-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 text-sm font-medium text-[#133020] dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-1 border-t border-[#133020]/[0.08] dark:border-white/[0.08]">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-10 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center bg-[#133020] hover:bg-[#046241] text-white dark:bg-[#F5EEDB] dark:text-[#133020] dark:hover:bg-white transition-all shadow-xs"
              >
                {locale === "zh" ? "登录系统" : "Sign In to LIFEVENT"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
