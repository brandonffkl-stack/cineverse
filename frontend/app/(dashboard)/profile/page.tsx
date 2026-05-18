"use client";

import AchievementBadge  from "@/components/molecules/AchievementBadge";
import MovieCard         from "@/components/molecules/MovieCard";
import StatCard          from "@/components/molecules/StatCard";
import ProgressBar       from "@/components/atoms/ProgressBar";
import Avatar            from "@/components/atoms/Avatar";
import { useUserStore }  from "@/store/useUserStore";
import { useMovieStore } from "@/store/useMovieStore";
import { ACHIEVEMENTS }  from "@/features/gamification/constants/achievements";
import { LEVELS, getLevelIndex, getLevelProgress } from "@/features/gamification/constants/levels";
import { buildCheckParams } from "@/features/gamification/utils/xpCalculator";
import { formatDate }    from "@/lib/utils/formatters";

export default function ProfilePage() {
  const getStats   = useUserStore((s) => s.getStats);
  const favorites  = useUserStore((s) => s.favorites);
  const ratings    = useUserStore((s) => s.ratings);
  const getById    = useMovieStore((s) => s.getById);

  const stats    = getStats();
  const levelIdx = getLevelIndex(stats.totalRated);
  const level    = LEVELS[levelIdx];
  const progress = getLevelProgress(stats.totalRated);
  const params   = buildCheckParams(stats);

  const favoriteMovies = favorites
    .map((id) => getById(id))
    .filter(Boolean);

  const unlockedCount = ACHIEVEMENTS.filter((a) => a.check(params)).length;

  // Distribución de estrellas
  const starEntries = Object.entries(stats.ratingsByStars)
    .sort(([a], [b]) => Number(b) - Number(a));

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header de perfil */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-16 translate-x-16 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)" }}
        />
        <div className="flex items-center gap-5">
          <Avatar name="Juan José" size="xl" />
          <div className="flex-1">
            <h2 className="font-display text-3xl font-black text-[#f1f0ff] mb-1">
              Juan José & Brandon
            </h2>
            <p className="text-sm text-[#7070a0] mb-3">
              Fundamentos de Programación · Prof. Miguel Hernández
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-violet-500/15 text-violet-400 border border-violet-500/30 px-3 py-1 rounded-full font-semibold">
                {level.emoji} Nivel {levelIdx + 1} — {level.name}
              </span>
              <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
                ⚡ {stats.totalXP} XP
              </span>
              <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                🎬 {stats.totalRated} calificadas
              </span>
              <span className="text-xs bg-pink-500/15 text-pink-400 border border-pink-500/30 px-3 py-1 rounded-full font-semibold">
                ❤️ {stats.totalFavorites} favoritos
              </span>
            </div>
          </div>
        </div>

        {/* Barra XP */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-[#7070a0] mb-1.5">
            <span>Progreso Nivel {levelIdx + 1}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} color="violet" size="lg" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard icon="🎬" value={stats.totalRated}     label="Calificadas"       color="violet" />
        <StatCard icon="⭐" value={stats.avgRating || "—"} label="Rating promedio"  color="gold"   />
        <StatCard icon="🎭" value={stats.genresExplored} label="Géneros explorados" color="green"  />
        <StatCard icon="🏅" value={unlockedCount}        label="Logros obtenidos"   color="cyan"   />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Distribución de estrellas */}
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
          <h3 className="font-display text-lg font-bold text-[#f1f0ff] mb-4">
            ⭐ Distribución de calificaciones
          </h3>
          {stats.totalRated === 0 ? (
            <p className="text-sm text-[#3a3a5c] text-center py-8">
              Aún no has calificado películas
            </p>
          ) : (
            <div className="space-y-3">
              {starEntries.map(([stars, count]) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-xs text-amber-400 w-16 flex-shrink-0">
                    {"★".repeat(Number(stars))}
                  </span>
                  <div className="flex-1">
                    <ProgressBar
                      value={stats.totalRated > 0 ? (count / stats.totalRated) * 100 : 0}
                      color="gold"
                      size="md"
                    />
                  </div>
                  <span className="text-xs text-[#7070a0] w-6 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Género favorito */}
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
          <h3 className="font-display text-lg font-bold text-[#f1f0ff] mb-4">
            🎭 Géneros más vistos
          </h3>
          {Object.keys(stats.ratingsByGenre).length === 0 ? (
            <p className="text-sm text-[#3a3a5c] text-center py-8">
              Califica películas para ver tus géneros
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.ratingsByGenre)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([genre, count]) => (
                  <div key={genre} className="flex items-center gap-3">
                    <span className="text-xs text-[#f1f0ff] w-24 flex-shrink-0 capitalize">
                      {genre}
                    </span>
                    <div className="flex-1">
                      <ProgressBar
                        value={(count / stats.totalRated) * 100}
                        color="violet"
                        size="md"
                      />
                    </div>
                    <span className="text-xs text-[#7070a0] w-6 text-right">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>

      {/* Logros */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-[#f1f0ff]">
            🏅 Logros
          </h2>
          <span className="text-xs text-[#7070a0]">
            {unlockedCount} / {ACHIEVEMENTS.length} desbloqueados
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ACHIEVEMENTS.map((a) => (
            <AchievementBadge
              key={a.id}
              achievement={a}
              unlocked={a.check(params)}
            />
          ))}
        </div>
      </div>

      {/* Favoritos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-[#f1f0ff]">
            ❤️ Mis favoritos
          </h2>
          <span className="text-xs text-[#7070a0]">
            {favoriteMovies.length} películas
          </span>
        </div>
        {favoriteMovies.length === 0 ? (
          <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">💔</div>
            <p className="text-sm text-[#7070a0]">Aún no tienes favoritos</p>
            <p className="text-xs text-[#3a3a5c] mt-1">
              Haz clic en ♡ en cualquier película para agregarla
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie!.id} movie={movie!} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}