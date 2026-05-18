"use client";

import { useState } from "react";
import { cn }           from "@/lib/utils/cn";
import GlobalKPIs       from "@/components/organisms/analytics/GlobalKPIs";
import PlatformChart    from "@/components/organisms/analytics/PlatformChart";
import GenreChart       from "@/components/organisms/analytics/GenreChart";
import TrendsChart      from "@/components/organisms/analytics/TrendsChart";
import CountryChart     from "@/components/organisms/analytics/CountryChart";
import QueryExplorer    from "@/components/organisms/analytics/QueryExplorer";
import { TOTAL_TITLES, TOTAL_HOURS } from "@/lib/constants/analytics.data";

type Tab = "global" | "platforms" | "genres" | "trends" | "countries" | "queries";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "global",    label: "Visión Global", icon: "🌐" },
  { key: "platforms", label: "Plataformas",   icon: "📡" },
  { key: "genres",    label: "Géneros",        icon: "🎭" },
  { key: "trends",    label: "Tendencias",     icon: "📈" },
  { key: "countries", label: "Países",         icon: "🌍" },
  { key: "queries",   label: "Query Explorer", icon: "🔍" },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("global");

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] mb-1">
              CineLab
            </h1>
            <p className="text-sm text-[#7070a0]">
              Data Intelligence Center · {TOTAL_TITLES.toLocaleString()} títulos analizados
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-[#3a3a5c] uppercase tracking-widest">
              Dataset
            </p>
            <p className="font-mono text-sm text-violet-400 font-bold">
              streaming_catalog.csv
            </p>
            <p className="text-[10px] text-[#3a3a5c]">
              + 4 archivos CSV
            </p>
          </div>
        </div>

        {/* Badges de operaciones */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { op: "filter()", color: "violet" },
            { op: "map()",    color: "pink"   },
            { op: "reduce()", color: "gold"   },
            { op: "sort()",   color: "cyan"   },
            { op: "slice()",  color: "green"  },
          ].map(({ op, color }) => (
            <span
              key={op}
              className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border`}
              style={{
                background: color === "violet" ? "rgba(124,58,237,0.15)"
                  : color === "pink"   ? "rgba(236,72,153,0.15)"
                  : color === "gold"   ? "rgba(245,158,11,0.15)"
                  : color === "cyan"   ? "rgba(6,182,212,0.15)"
                  : "rgba(16,185,129,0.15)",
                color: color === "violet" ? "#a855f7"
                  : color === "pink"   ? "#ec4899"
                  : color === "gold"   ? "#f59e0b"
                  : color === "cyan"   ? "#06b6d4"
                  : "#10b981",
                borderColor: color === "violet" ? "rgba(124,58,237,0.3)"
                  : color === "pink"   ? "rgba(236,72,153,0.3)"
                  : color === "gold"   ? "rgba(245,158,11,0.3)"
                  : color === "cyan"   ? "rgba(6,182,212,0.3)"
                  : "rgba(16,185,129,0.3)",
              }}
            >
              {op}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold",
              "transition-all duration-200 whitespace-nowrap flex-shrink-0",
              activeTab === tab.key
                ? "bg-violet-500 text-white shadow-lg shadow-violet-900/40"
                : "text-[#7070a0] hover:text-[#f1f0ff] hover:bg-white/5"
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Contenido del tab activo */}
      <div className="animate-[fadeUp_0.25s_ease_forwards]" key={activeTab}>
        {activeTab === "global"    && <GlobalKPIs    />}
        {activeTab === "platforms" && <PlatformChart />}
        {activeTab === "genres"    && <GenreChart    />}
        {activeTab === "trends"    && <TrendsChart   />}
        {activeTab === "countries" && <CountryChart  />}
        {activeTab === "queries"   && <QueryExplorer />}
      </div>

    </div>
  );
}