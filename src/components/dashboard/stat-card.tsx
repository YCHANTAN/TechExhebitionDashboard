import { LucideIcon } from "lucide-react";
import { BorderGlow } from "@/components/shared/border-glow";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  accentColor?: string;
  glowColor?: "green" | "saffron";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  glowColor = "green",
}: StatCardProps) {
  return (
    <BorderGlow glowColor={glowColor} borderRadius="12px" className="w-full">
      <div className="p-5 min-h-[124px] flex items-start justify-between relative overflow-hidden font-manrope bg-white dark:bg-[#081C12] rounded-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.05)] dark:shadow-floating-dark border-[1.5px] border-[#D8D2C8] dark:border-white/10 transition-all">
        {/* Editorial top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#046241] via-[#046241]/40 to-transparent dark:from-[#52B788] dark:via-[#52B788]/40" />

        <div className="space-y-1">
          <span className="text-[11px] font-semibold tracking-normal text-[#666666] dark:text-white/70 block">
            {title}
          </span>
          <div className="text-[32px] font-extrabold text-[#133020] dark:text-white tracking-tight leading-none my-1.5 flex items-baseline gap-1">
            <span>{value}</span>
          </div>
          <p className="text-[11.5px] text-[#046241] dark:text-[#52B788] font-medium leading-none">
            {subtitle}
          </p>
        </div>

        <div className="w-11 h-11 rounded-[10px] bg-[#046241]/10 dark:bg-[#046241]/30 border border-[#046241]/20 dark:border-[#52B788]/30 flex items-center justify-center text-[#046241] dark:text-[#52B788] shrink-0">
          <Icon className="w-5 h-5 text-[#046241] dark:text-[#52B788]" />
        </div>
      </div>
    </BorderGlow>
  );
}
