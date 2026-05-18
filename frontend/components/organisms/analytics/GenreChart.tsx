"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { GENRE_STATS, MAJOR_GENRES } from "@/lib/constants/analytics.data";

const PALETTE = [
  "#7c3aed","#ec4899","#f59e0b","#06b6d4",
  "#10b981","#3b82f6","#a855f7","#e85d04",
  "#64748b","#8b5cf6","#ef4444","#14b8a6",
];

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

export default function GenreChart() {

  // Datos para donut
  const donutData = GENRE_STATS.map((g, i) => ({
    name:  g.genre,
    value: g.total,
    color: PALETTE[i % PALETTE.length],
  }));

  // Géneros ordenados por IMDB
  const byImdb = [...GENRE_STATS].sort((a, b) => b.imdb - a.imdb);

  return (
    <div className="space-y-5">

      {/* Insight */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
        <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">
          💡 Hallazgo clave
        </p>
        <p className="text-sm text-[#f1f0ff]">
          <span className="text-emerald-400 font-bold">Mystery</span> tiene el IMDB
          más alto ({byImdb[0]?.imdb}) con solo {byImdb[0]?.total} títulos.
          <span className="text-pink-400 font-bold"> Drama</span> domina en volumen
          ({MAJOR_GENRES[0]?.total.toLocaleString()} títulos) y horas vistas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Donut */}
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
          <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
            Distribución por género
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: any, n: any) => [v.toLocaleString(), n]}
                contentStyle={{
                  background:"#12122e",
                  border:"1px solid #1e1e3a",
                  borderRadius:8,
                  fontSize:11
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Leyenda */}
          <div className="grid grid-cols-2 gap-1 mt-2">
            {donutData.slice(0, 8).map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-[10px] text-[#7070a0] truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* IMDB por género */}
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
          <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
            IMDB promedio por género — sorted desc
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={byImdb}
              layout="vertical"
              margin={{ left: 10, right: 20 }}
            >
              <XAxis
                type="number"
                domain={[6.4, 7.1]}
                tick={{ fill: "#3a3a5c", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="genre"
                tick={{ fill: "#7070a0", fontSize: 10 }}
                width={75}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="imdb"
                name="IMDB"
                radius={[0, 4, 4, 0]}
              >
                {byImdb.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 ? "#f59e0b" : i === 1 ? "#7c3aed" : "#1e1e3a"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Horas vistas por género */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-1">
          Horas vistas totales por género (millones) — reduce sum
        </p>
        <p className="text-[10px] text-[#3a3a5c] mb-4">
          Total global: {GENRE_STATS.reduce((s, g) => s + g.hours, 0).toLocaleString()}M horas
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={[...GENRE_STATS].sort((a, b) => b.hours - a.hours)}>
            <XAxis dataKey="genre" tick={{ fill: "#3a3a5c", fontSize: 9 }} />
            <YAxis tick={{ fill: "#3a3a5c", fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="hours" name="Horas (M)" fill="#7c3aed" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}