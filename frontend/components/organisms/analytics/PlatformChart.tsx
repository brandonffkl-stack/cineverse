"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, Legend,
} from "recharts";
import { PLATFORM_STATS, PREMIUM_PLATFORMS } from "@/lib/constants/analytics.data";

const COLORS = {
  violet: "#7c3aed",
  pink:   "#ec4899",
  gold:   "#f59e0b",
  cyan:   "#06b6d4",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#12122e] border border-[#1e1e3a] rounded-xl p-3 text-xs">
      <p className="font-bold text-[#f1f0ff] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

export default function PlatformChart() {

  // Datos para radar (normalizado 0-100)
  const radarData = PLATFORM_STATS.slice(0, 6).map(p => ({
    platform: p.platform.replace(" ", "\n"),
    IMDB:     Math.round(((p.imdb - 6.5) / 1) * 100),
    RT:       Math.round(((p.rt - 65) / 6) * 100),
    Volumen:  Math.round((p.total / 4502) * 100),
  }));

  return (
    <div className="space-y-5">

      {/* Insight */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
          💡 Hallazgo clave
        </p>
        <p className="text-sm text-[#f1f0ff]">
          <span className="text-amber-400 font-bold">Apple TV+</span> tiene el menor catálogo
          pero el mayor rating IMDB promedio ({PREMIUM_PLATFORMS[0]?.imdb}).
          Calidad sobre cantidad.
        </p>
      </div>

      {/* Barras — Títulos por plataforma */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Títulos por plataforma
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={PLATFORM_STATS}
            layout="vertical"
            margin={{ left: 10, right: 20 }}
          >
            <XAxis type="number" tick={{ fill: "#3a3a5c", fontSize: 10 }} />
            <YAxis
              type="category"
              dataKey="platform"
              tick={{ fill: "#7070a0", fontSize: 11 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total"  name="Total"    fill={COLORS.violet} radius={[0,4,4,0]} />
            <Bar dataKey="movies" name="Películas" fill={COLORS.pink}   radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar — Calidad */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          IMDB vs Rotten Tomatoes vs Volumen (top 6)
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#1e1e3a" />
            <PolarAngleAxis
              dataKey="platform"
              tick={{ fill: "#7070a0", fontSize: 10 }}
            />
            <Radar
              name="IMDB"
              dataKey="IMDB"
              stroke={COLORS.gold}
              fill={COLORS.gold}
              fillOpacity={0.15}
            />
            <Radar
              name="RT"
              dataKey="RT"
              stroke={COLORS.violet}
              fill={COLORS.violet}
              fillOpacity={0.15}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#7070a0" }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla comparativa */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e1e3a]">
          <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest">
            Tabla comparativa completa — filter: plataformas premium (IMDB ≥ 7.0)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1e1e3a]">
                {["Plataforma","Títulos","Películas","Series","IMDB","RT %","Horas (M)"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[#3a3a5c] font-bold uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLATFORM_STATS.map((p, i) => (
                <tr
                  key={p.platform}
                  className={`border-b border-[#1e1e3a]/50 transition-colors hover:bg-violet-500/5 ${
                    p.imdb >= 7 ? "bg-violet-500/3" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-[#f1f0ff]">
                    {p.imdb >= 7 && <span className="text-violet-400 mr-1">★</span>}
                    {p.platform}
                  </td>
                  <td className="px-4 py-3 font-mono text-violet-400">{p.total.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-[#7070a0]">{p.movies.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-[#7070a0]">{p.tv.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-amber-400 font-bold">{p.imdb}</td>
                  <td className="px-4 py-3 font-mono text-[#7070a0]">{p.rt}</td>
                  <td className="px-4 py-3 font-mono text-cyan-400">{p.hours.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}