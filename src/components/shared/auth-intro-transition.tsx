"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function AuthIntroTransition() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"enter" | "zoom">("enter");

  useEffect(() => {
    const shouldTrigger =
      typeof window !== "undefined" &&
      (sessionStorage.getItem("lifescout_auth_intro") === "true" ||
        searchParams.get("intro") === "1");

    if (shouldTrigger) {
      setActive(true);
      sessionStorage.removeItem("lifescout_auth_intro");

      // Wait a brief natural moment for the dashboard to compile/mount (approx 500ms),
      // then immediately trigger the cinematic zoom-in flythrough.
      const startTime = performance.now();

      const triggerZoom = () => {
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, 500 - elapsed);
        setTimeout(() => {
          setPhase("zoom");
          // Complete animation and unmount overlay after zoom flythrough (550ms)
          setTimeout(() => {
            setActive(false);
          }, 550);
        }, remaining);
      };

      // Check if document is ready or wait for next tick
      if (document.readyState === "complete") {
        triggerZoom();
      } else {
        const onReady = () => {
          window.removeEventListener("load", onReady);
          triggerZoom();
        };
        window.addEventListener("load", onReady);
      }
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
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#F5EEDB] dark:bg-[#06150D] select-none pointer-events-none"
        >
          {/* Ambient Lighting & Luxury Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,98,65,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(4,98,65,0.4)_0%,transparent_75%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFB347]/10 dark:bg-[#FFB347]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Animated Halo Rings expanding outward */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0.4 }}
            animate={
              phase === "enter"
                ? { scale: 1.15, opacity: 0.6 }
                : { scale: 3.5, opacity: 0 }
            }
            transition={
              phase === "enter"
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 0.55, ease: [0.7, 0, 0.3, 1] }
            }
            className="absolute w-72 h-72 rounded-full border border-[#046241]/30 dark:border-[#52B788]/30 pointer-events-none"
          />

          {/* Central Logo with Dramatic Cinematic Zoom-In */}
          <div className="relative flex items-center justify-center z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                phase === "enter"
                  ? { scale: 1, opacity: 1 }
                  : {
                      scale: 3.8,
                      opacity: [1, 0.9, 0],
                      filter: "blur(8px)",
                    }
              }
              transition={
                phase === "enter"
                  ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.55, ease: [0.65, 0, 0.35, 1], times: [0, 0.4, 1] }
              }
              className="relative flex items-center justify-center"
            >
              {/* Radial glow directly behind the logo */}
              <div className="absolute w-48 h-48 rounded-full bg-[#046241]/25 dark:bg-[#046241]/55 blur-3xl -z-10" />

              {/* Light Mode Logo */}
              <img
                src="/LifeScout Light Mode.png"
                alt="LifeScout"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-2xl dark:hidden"
              />

              {/* Dark Mode Logo */}
              <img
                src="/LifeScout Dark Mode.png"
                alt="LifeScout"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_40px_rgba(4,98,65,0.7)] hidden dark:block"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
