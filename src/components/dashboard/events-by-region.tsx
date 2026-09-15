"use client";

import { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLocaleStore } from "@/stores/locale-store";
import { localizeRegionName } from "@/lib/i18n/event-localization";

interface EventsByRegionProps {
  data: { region: string; count: number }[];
}

const COLORS = ["#FFB347", "#046241", "#C17110", "#E89131", "#417256", "#708E7C", "#FFC370"];

const CustomTooltip = ({ active, payload, locale }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#133020] text-white px-3 py-2 rounded-[8px] border border-[#FFB347] shadow-[0_4px_20px_rgba(0,0,0,0.12)] text-xs font-manrope">
        <p className="font-semibold text-[#FFB347] mb-0.5">{data.name}</p>
        <p className="text-white font-medium">
          {data.value} {locale === "zh" ? "场展会" : "exhibitions"}
        </p>
      </div>
    );
  }
  return null;
};

export function EventsByRegionChart({ data }: EventsByRegionProps) {
  const { locale } = useLocaleStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const localizedData = useMemo(() => {
    return (data || []).map((item) => ({
      ...item,
      region: localizeRegionName(item.region, locale),
    }));
  }, [data, locale]);

  const renderExternalLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    percent,
  }: any) => {
    if (!value || percent < 0.03) return null;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);

    const x1 = cx + (outerRadius + 4) * cos;
    const y1 = cy + (outerRadius + 4) * sin;
    const x2 = cx + (outerRadius + 18) * cos;
    const y2 = cy + (outerRadius + 18) * sin;
    const lx = cx + (outerRadius + 26) * cos;
    const ly = cy + (outerRadius + 26) * sin;

    const anchor = cos > 0.1 ? "start" : cos < -0.1 ? "end" : "middle";

    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isDark ? "rgba(255,255,255,0.4)" : "#AAAAAA"}
          strokeWidth={1}
          strokeLinecap="round"
        />
        <text
          x={lx}
          y={ly}
          textAnchor={anchor}
          dominantBaseline="central"
          fontSize={11}
          fontWeight={700}
          fill={isDark ? "#FFFFFF" : "#133020"}
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white dark:bg-[#081C12] p-5 rounded-[12px] border-[1.5px] border-[#D8D2C8] dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.05)] dark:shadow-floating-dark font-manrope h-full min-h-[420px] flex flex-col justify-between transition-all">
      <div className="flex items-center justify-between min-h-[52px] border-b border-[#D8D2C8] dark:border-white/10 pb-3 mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-[#133020] dark:text-white">
            {locale === "zh" ? "各地区展会分布" : "Events by region"}
          </h3>
          <p className="text-[11px] text-[#666666] dark:text-white/70">
            {locale === "zh" ? "战略科技展会的地理分布" : "Geographic distribution of strategic tech exhibitions"}
          </p>
        </div>
        <span className="text-[11px] font-bold px-2 py-1 bg-[#046241]/10 dark:bg-[#046241]/30 text-[#046241] dark:text-[#52B788] rounded-[6px] shrink-0">
          {data?.length || 0} {locale === "zh" ? "地区" : "Regions"}
        </span>
      </div>

      <div className="flex-1 min-h-64 w-full [&_*:focus]:outline-none [&_path]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ outline: "none" }}>
            <Pie
              data={localizedData}
              cx="50%"
              cy="46%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              dataKey="count"
              nameKey="region"
              activeShape={false}
              style={{ outline: "none" }}
              label={renderExternalLabel}
              labelLine={false}
            >
              {localizedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ outline: "none", cursor: "pointer" }}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip locale={locale} />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "11px", color: isDark ? "#FFFFFF" : "#133020" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
