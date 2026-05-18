"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { COUNTRY_STATS, TOP_COUNTRY } from "@/lib/constants/analytics.data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12122e] border border-[#1e1e3a] rounded-xl p-3 text-xs">
      <p className="font-bold text-[#f1f0ff] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value?.toLocaleString?.() ?? p.value}
        </p>
      ))}
    </div>
  );
};

export default function CountryChart() {

  const maxTotal = TOP_COUNTRY.total;

  return (
    <div className="space-y-5">

      {/* Insight */}
      <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
        <p className="text-xs text-pink-400 font-bold uppercase tracking-widest mb-1">
          💡 Hallazgo clave
        </p>
        <p className="text-sm text-[#f1f0ff]">
          <span className="text-pink-400 font-bold">Estados Unidos</span> produce
          el {Math.round(TOP_COUNTRY.total / COUNTRY_STATS.reduce((s,c) => s+c.total,0) * 100)}%
          del catálogo global. Sin embargo,{" "}
          <span className="text-amber-400 font-bold">Corea del Sur</span> tiene
          el mayor IMDB promedio ({COUNTRY_STATS.find(c => c.country === "South Korea")?.imdb}).
        </p>
      </div>

      {/* Barras horizontales */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Top 10 países por producción — sort descending
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={COUNTRY_STATS}
            layout="vertical"
            margin={{ left: 10, right: 30 }}
          >
            <XAxis type="number" tick={{ fill: "#3a3a5c", fontSize: 10 }} />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fill: "#7070a0", fontSize: 11 }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" name="Títulos" radius={[0, 4, 4, 0]}>
              {COUNTRY_STATS.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === 0 ? "#f59e0b" : i <= 2 ? "#7c3aed" : "#1e1e3a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cards de países */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {COUNTRY_STATS.slice(0, 5).map((c, i) => (
          <div
            key={c.country}
            className="bg-[#0d0d22] border border-[#1e1e3a] rounded-xl p-4 text-center hover:border-violet-500/30 transition-all"
          >
            <div className="text-3xl mb-2">{c.code}</div>
            <div className="text-xs font-bold text-[#f1f0ff] mb-1 truncate">
              {c.country}
            </div>
            <div className="font-display text-xl font-black text-violet-400">
              {c.total.toLocaleString()}
            </div>
            <div className="text-[10px] text-[#3a3a5c]">títulos</div>
            <div className="text-[10px] text-amber-400 mt-1">
              ⭐ {c.imdb}
            </div>
          </div>
        ))}
      </div>

      {/* IMDB por país */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Rating IMDB promedio por país — map + sort
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[...COUNTRY_STATS].sort((a, b) => b.imdb - a.imdb)}
            margin={{ left: 0, right: 20 }}
          >
            <XAxis
              dataKey="code"
              tick={{ fill: "#7070a0", fontSize: 14 }}
              tickLine={false}
            />
            <YAxis domain={[6.6, 7.1]} tick={{ fill: "#3a3a5c", fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="imdb" name="IMDB" radius={[4, 4, 0, 0]}>
              {[...COUNTRY_STATS].sort((a,b) => b.imdb - a.imdb).map((_, i) => (
                <Cell
                  key={i}
                  fill={i === 0 ? "#f59e0b" : "#7c3aed"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}