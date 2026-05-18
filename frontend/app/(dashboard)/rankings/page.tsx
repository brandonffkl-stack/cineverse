"use client";

import RankRow           from "@/components/molecules/RankRow";
import StatCard          from "@/components/molecules/StatCard";
import { useMovieStore } from "@/store/useMovieStore";
import { useUserStore }  from "@/store/useUserStore";

export default function RankingsPage() {
  const movies   = useMovieStore((s) => s.movies);
  const getStats = useUserStore((s) => s.getStats);
  const getRating = useUserStore((s) => s.getRating);

  const stats = getStats();

  // Ordenar por IMDB
  const ranked = [...movies].sort((a, b) => b.imdbRating - a.imdbRating);

  // Top 3 para stats
  const top1 = ranked[0];
  const topRated = ranked.reduce((best, m) => {
    const r = getRating(m.id);
    if (!r) return best;
    if (!best) return m;
    return r.stars > (getRating(best.id)?.stars ?? 0) ? m : best;
  }, null as typeof ranked[0] | null);

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] mb-1">
          Rankings
        </h1>
        <p className="text-sm text-[#7070a0]">
          Películas ordenadas por rating IMDB
        </p>
      </div>

      {/* Stats top */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard
          icon="🥇"
          value={top1.title}
          label="Película #1"
          color="gold"
        />
        <StatCard
          icon="🎯"
          value={top1.imdbRating}
          label="Rating más alto"
          color="violet"
        />
        <StatCard
          icon="🗳️"
          value={`${Math.round(movies.reduce((s, m) => s + m.votes, 0) / 1000)}K`}
          label="Votos totales"
          color="cyan"
        />
      </div>

      {/* Tu mejor calificación */}
      {topRated && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: topRated.posterColor }}
          >
            {topRated.posterEmoji}
          </div>
          <div>
            <p className="text-xs text-violet-400 font-semibold uppercase tracking-wide mb-0.5">
              Tu mejor calificación
            </p>
            <p className="text-sm font-bold text-[#f1f0ff]">
              {topRated.title}
            </p>
          </div>
          <div className="ml-auto text-amber-400 text-lg">
            {"★".repeat(getRating(topRated.id)?.stars ?? 0)}
          </div>
        </div>
      )}

      {/* Lista de rankings */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-[#f1f0ff]">
          🏆 Top {ranked.length} Películas
        </h2>
        <span className="text-xs text-[#3a3a5c]">
          {stats.totalRated} calificadas por ti
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {ranked.map((movie, i) => (
          <div key={movie.id} className="relative">
            <RankRow movie={movie} position={i + 1} />
            {/* Indicador de calificada por el usuario */}
            {getRating(movie.id) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 mr-28">
                <span className="text-[9px] bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full font-bold">
                  ✓ Calificada
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}