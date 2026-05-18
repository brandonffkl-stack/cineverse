"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { YEARLY_TRENDS, PEAK_YEAR, GROWTH_FACTOR } from "@/lib/constants/analytics.data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12122e] border border-[#1e1e3a] rounded-xl p-3 text-xs">
      <p className="font-bold text-[#f1f0ff] mb-1">Año {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value?.toLocaleString?.() ?? p.value}
        </p>
      ))}
    </div>
  );
};

export default function TrendsChart() {
  const [mode, setMode] = useState<"all" | "movies" | "tv">("all");

  // Crecimiento decade a decade (map)
  const decades = [
    { decade: "2000s", avg: Math.round(YEARLY_TRENDS.filter(y => y.year < 2010).reduce((s,y) => s + y.total, 0) / 10) },
    { decade: "2010s", avg: Math.round(YEARLY_TRENDS.filter(y => y.year >= 2010 && y.year < 2020).reduce((s,y) => s + y.total, 0) / 10) },
    { decade: "2020s", avg: Math.round(YEARLY_TRENDS.filter(y => y.year >= 2020).reduce((s,y) => s + y.total, 0) / YEARLY_TRENDS.filter(y => y.year >= 2020).length) },
  ];

  return (
    <div className="space-y-5">

      {/* Insight */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
        <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
          💡 Hallazgo clave
        </p>
        <p className="text-sm text-[#f1f0ff]">
          El año pico fue{" "}
          <span className="text-cyan-400 font-bold">{PEAK_YEAR.year}</span> con{" "}
          <span className="text-cyan-400 font-bold">{PEAK_YEAR.total}</span> lanzamientos.
          El streaming creció{" "}
          <span className="text-violet-400 font-bold">×{GROWTH_FACTOR}</span>{" "}
          de 2010 a 2024. La producción de series supera a películas desde 2015.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {[
          { key: "all",    label: "Todo" },
          { key: "movies", label: "Solo Películas" },
          { key: "tv",     label: "Solo Series" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              mode === opt.key
                ? "bg-violet-500 border-violet-500 text-white"
                : "bg-transparent border-[#1e1e3a] text-[#7070a0] hover:border-violet-500/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Area chart principal */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Lanzamientos por año (2000–2025)
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={YEARLY_TRENDS} margin={{ left: 0, right: 10 }}>
            <defs>
              <linearGradient id="gradMovies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="gradTV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fill: "#3a3a5c", fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#3a3a5c", fontSize: 10 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {mode !== "tv" && (
              <Area
                type="monotone"
                dataKey="movies"
                name="Películas"
                stroke="#7c3aed"
                fill="url(#gradMovies)"
                strokeWidth={2}
              />
            )}
            {mode !== "movies" && (
              <Area
                type="monotone"
                dataKey="tv"
                name="Series TV"
                stroke="#ec4899"
                fill="url(#gradTV)"
                strokeWidth={2}
              />
            )}
            <Legend wrapperStyle={{ fontSize: 11, color: "#7070a0" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* IMDB por año */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Evolución del rating IMDB promedio
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={YEARLY_TRENDS} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="year" tick={{ fill: "#3a3a5c", fontSize: 10 }} tickLine={false} />
            <YAxis domain={[6.6, 7.0]} tick={{ fill: "#3a3a5c", fontSize: 10 }} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgImdb"
              name="IMDB prom."
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Promedio por década */}
      <div className="grid grid-cols-3 gap-3">
        {decades.map((d) => (
          <div
            key={d.decade}
            className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-4 text-center"
          >
            <p className="text-xs text-[#3a3a5c] font-bold uppercase tracking-widest mb-1">
              {d.decade}
            </p>
            <p className="font-display text-3xl font-black text-violet-400">
              {d.avg}
            </p>
            <p className="text-[10px] text-[#7070a0] mt-1">
              títulos/año promedio
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}