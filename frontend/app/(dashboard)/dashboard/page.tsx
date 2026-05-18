"use client";

import { useMemo }       from "react";
import HeroSection       from "@/components/organisms/HeroSection";
import StatCard          from "@/components/molecules/StatCard";
import MovieCard         from "@/components/molecules/MovieCard";
import ActivityItem      from "@/components/molecules/ActivityItem";
import { useUserStore }  from "@/store/useUserStore";
import { useMovieStore } from "@/store/useMovieStore";
import { formatRating }  from "@/lib/utils/formatters";
import { getLevelIndex, LEVELS } from "@/features/gamification/constants/levels";

export default function DashboardPage() {
  const getStats    = useUserStore((s) => s.getStats);
  const ratings     = useUserStore((s) => s.ratings);
  const getTrending = useMovieStore((s) => s.getTrending);
  const getById     = useMovieStore((s) => s.getById);

  const stats    = getStats();
  const trending = getTrending();
  const levelIdx = getLevelIndex(stats.totalRated);
  const level    = LEVELS[levelIdx];

  const recentActivity = useMemo(() => {
    return Object.entries(ratings)
      .sort(([, a], [, b]) =>
        new Date(b.ratedAt).getTime() - new Date(a.ratedAt).getTime()
      )
      .slice(0, 5)
      .map(([movieId, rating]) => ({
        movie: getById(movieId),
        rating,
      }))
      .filter((item) => item.movie !== undefined);
  }, [ratings, getById]);

  return (
    <div className="max-w-6xl mx-auto">

      <HeroSection />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard
          icon="🎬"
          value={stats.totalRated}
          label="Calificadas"
          delta="Empieza a calificar"
          color="violet"
        />
        <StatCard
          icon="⭐"
          value={stats.totalRated > 0 ? formatRating(stats.avgRating) : "—"}
          label="Rating promedio"
          delta={stats.totalRated > 0 ? "De tus calificaciones" : "Sin datos aún"}
          color="gold"
        />
        <StatCard
          icon="❤️"
          value={stats.totalFavorites}
          label="Favoritos"
          delta="Agrega tus favoritas"
          color="green"
        />
        <StatCard
          icon="⚡"
          value={stats.totalXP}
          label="XP Total"
          delta={`Nivel ${levelIdx + 1} — ${level.name}`}
          color="cyan"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-[#f1f0ff]">
          🔥 En tendencia
        </h2>
        <a href="/discover" className="text-xs text-violet-400 hover:text-violet-300">
          Ver todo →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {trending.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-[#f1f0ff]">
          📋 Actividad reciente
        </h2>
        {recentActivity.length > 0 && (
          <a href="/history" className="text-xs text-violet-400 hover:text-violet-300">
            Ver historial →
          </a>
        )}
      </div>

      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl px-5">
        {recentActivity.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-4xl mb-3">🎬</div>
            <p className="text-sm text-[#7070a0]">Aún no hay actividad.</p>
            <p className="text-xs text-[#3a3a5c] mt-1">¡Califica tu primera película!</p>
          </div>
        ) : (
          recentActivity.map(({ movie, rating }) => (
            <ActivityItem
              key={movie!.id}
              movie={movie!}
              rating={rating}
            />
          ))
        )}
      </div>

    </div>
  );
}