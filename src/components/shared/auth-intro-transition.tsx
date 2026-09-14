"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AuthIntroTransition() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"enter" | "zoom" | "done">("enter");

  useEffect(() => {
    // Check if triggered by login session or explicit query param ?intro=1
    const shouldTrigger =
      typeof window !== "undefined" &&
      (sessionStorage.getItem("lifescout_auth_intro") === "true" ||
        searchParams.get("intro") === "1");

    if (shouldTrigger) {
      setActive(true);
      sessionStorage.removeItem("lifescout_auth_intro");

      // Phase 1: Logo enters and holds (0ms to 900ms)
      // Phase 2: Logo zooms in dramatically towards screen (900ms to 1500ms)
      const zoomTimer = setTimeout(() => {
        setPhase("zoom");
      }, 900);

      // Phase 3: Transition finishes and reveals dashboard (1600ms)
      const endTimer = setTimeout(() => {
        setPhase("done");
        setActive(false);
      }, 1600);

      return () => {
        clearTimeout(zoomTimer);
        clearTimeout(endTimer);
      };
    }
  }, [searchParams]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="auth-intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "zoom" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#F5EEDB] dark:bg-[#06150D] select-none pointer-events-none"
        >
          {/* Ambient Lighting & Luxury Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,98,65,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(4,98,65,0.4)_0%,transparent_75%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFB347]/10 dark:bg-[#FFB347]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Animated Halo Rings expanding outward */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              phase === "enter"
                ? { scale: [0.9, 1.25], opacity: [0.4, 0] }
                : { scale: 2.2, opacity: 0 }
            }
            transition={
              phase === "enter"
                ? { duration: 1.2, repeat: Infinity, ease: "easeOut" }
                : { duration: 0.6, ease: "easeIn" }
            }
            className="absolute w-72 h-72 rounded-full border border-[#046241]/40 dark:border-[#52B788]/40 pointer-events-none"
          />

          {/* Core Central Logo Animation */}
          <div className="relative flex flex-col items-center justify-center z-10">
            <motion.div
              initial={{ scale: 0.75, opacity: 0, filter: "blur(8px)" }}
              animate={
                phase === "enter"
                  ? { scale: 1, opacity: 1, filter: "blur(0px)" }
                  : { scale: 2.8, opacity: 0, filter: "blur(14px)" }
              }
              transition={
                phase === "enter"
                  ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
              }
              className="relative flex items-center justify-center"
            >
              {/* Radial glow directly behind the logo */}
              <div className="absolute w-44 h-44 rounded-full bg-[#046241]/20 dark:bg-[#046241]/50 blur-2xl -z-10" />

              {/* Light Mode Logo */}
              <img
                src="/LifeScout Light Mode.png"
                alt="LifeScout Intelligence Hub"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-xl dark:hidden"
              />

              {/* Dark Mode Logo */}
              <img
                src="/LifeScout Dark Mode.png"
                alt="LifeScout Intelligence Hub"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_35px_rgba(4,98,65,0.6)] hidden dark:block"
              />
            </motion.div>

            {/* Subtext and Shimmer Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase === "enter"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20, filter: "blur(6px)" }
              }
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-[#046241]/20 dark:border-white/10 shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#C17110] dark:text-[#FFB347] animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-[#133020] dark:text-white/90 uppercase font-mono">
                  INITIALIZING DASHBOARD
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-36 h-[2px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mt-1">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#046241] dark:via-[#52B788] to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
