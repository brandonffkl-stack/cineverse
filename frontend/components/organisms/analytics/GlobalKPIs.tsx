"use client";

import StatCard from "@/components/molecules/StatCard";
import {
  TOTAL_TITLES, TOTAL_HOURS, TOTAL_AWARDS,
  BEST_PLATFORM, TOP_GENRE, PEAK_YEAR,
  AVG_GLOBAL_IMDB, GROWTH_FACTOR, TYPE_DISTRIBUTION,
} from "@/lib/constants/analytics.data";
import { formatVotes } from "@/lib/utils/formatters";

export default function GlobalKPIs() {
  return (
    <div className="space-y-6">

      {/* Insight destacado */}
      <div className="bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🧠</div>
          <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">
              Insight automático
            </p>
            <p className="text-sm text-[#f1f0ff] leading-relaxed">
              El catálogo creció{" "}
              <span className="text-violet-400 font-bold">×{GROWTH_FACTOR}</span>{" "}
              entre 2010 y 2024. La plataforma con mejor calidad es{" "}
              <span className="text-amber-400 font-bold">{BEST_PLATFORM.platform}</span>{" "}
              con IMDB promedio de{" "}
              <span className="text-amber-400 font-bold">{BEST_PLATFORM.imdb}</span>.
              El género dominante es{" "}
              <span className="text-pink-400 font-bold">{TOP_GENRE.genre}</span>{" "}
              con {TOP_GENRE.total.toLocaleString()} títulos.
            </p>
          </div>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon="🎬"
          value={TOTAL_TITLES.toLocaleString()}
          label="Títulos totales"
          delta="En 10 plataformas"
          color="violet"
        />
        <StatCard
          icon="📺"
          value={TYPE_DISTRIBUTION.movies.toLocaleString()}
          label="Películas"
          delta={`${Math.round(TYPE_DISTRIBUTION.movies / TOTAL_TITLES * 100)}% del catálogo`}
          color="violet"
        />
        <StatCard
          icon="📡"
          value={TYPE_DISTRIBUTION.tv.toLocaleString()}
          label="Series de TV"
          delta={`${Math.round(TYPE_DISTRIBUTION.tv / TOTAL_TITLES * 100)}% del catálogo`}
          color="pink"
        />
        <StatCard
          icon="⭐"
          value={AVG_GLOBAL_IMDB}
          label="IMDB global prom."
          delta="Sobre 15 000 títulos"
          color="gold"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon="👁️"
          value={`${Math.round(TOTAL_HOURS / 1000)}K`}
          label="Horas vistas (M)"
          delta="Total acumulado"
          color="cyan"
        />
        <StatCard
          icon="🏆"
          value={TOTAL_AWARDS.toLocaleString()}
          label="Premios ganados"
          delta="Todos los géneros"
          color="gold"
        />
        <StatCard
          icon="📅"
          value={PEAK_YEAR.year}
          label="Año más prolífico"
          delta={`${PEAK_YEAR.total} títulos`}
          color="green"
        />
        <StatCard
          icon="🚀"
          value={`×${GROWTH_FACTOR}`}
          label="Crecimiento 2010→2024"
          delta="Explosión del streaming"
          color="violet"
        />
      </div>

    </div>
  );
}