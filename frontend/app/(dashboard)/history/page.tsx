"use client";

import { useUserStore }  from "@/store/useUserStore";
import { useMovieStore } from "@/store/useMovieStore";
import { timeAgo, starsToLabel } from "@/lib/utils/formatters";

export default function HistoryPage() {
  const ratings = useUserStore((s) => s.ratings);
  const getById = useMovieStore((s) => s.getById);

  const history = Object.entries(ratings)
    .map(([movieId, rating]) => ({
      movie: getById(movieId),
      rating,
    }))
    .filter((item) => item.movie !== undefined)
    .sort((a, b) =>
      new Date(b.rating.ratedAt).getTime() -
      new Date(a.rating.ratedAt).getTime()
    );

  return (
    <div className="max-w-3xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] mb-1">
            Historial
          </h1>
          <p className="text-sm text-[#7070a0]">
            Todas tus calificaciones ordenadas por fecha
          </p>
        </div>
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2 text-center">
          <p className="font-display text-2xl font-bold text-violet-400">
            {history.length}
          </p>
          <p className="text-[10px] text-[#7070a0]">calificadas</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">🎬</div>
          <p className="text-[#7070a0] text-sm mb-1">
            Aún no has calificado ninguna película
          </p>
          <p className="text-[#3a3a5c] text-xs">
            Ve a Descubrir y empieza a calificar
          </p>
          <a
            href="/discover"
            className="inline-block mt-4 text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 px-4 py-2 rounded-lg transition-all"
          >
            Ir a Descubrir →
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(({ movie, rating }) => (
            <div
              key={movie!.id}
              className="bg-[#0d0d22] border border-[#1e1e3a] rounded-xl px-4 py-4 flex items-center gap-4 hover:border-violet-500/30 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: movie!.posterColor }}
              >
                {movie!.posterEmoji}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#f1f0ff] truncate">
                  {movie!.title}
                </p>
                <p className="text-[10px] text-[#7070a0] mt-0.5">
                  {movie!.platform} · {movie!.genre} · {movie!.year}
                </p>
                {rating.review && (
                  <p className="text-[11px] text-[#7070a0] mt-1.5 italic line-clamp-1">
                    "{rating.review}"
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="text-amber-400 text-sm leading-none">
                  {"★".repeat(rating.stars)}
                  <span className="text-[#1e1e3a]">
                    {"★".repeat(5 - rating.stars)}
                  </span>
                </div>
                <p className="text-[10px] text-violet-400 font-semibold">
                  {starsToLabel(rating.stars)}
                </p>
                <p className="text-[9px] text-[#3a3a5c]">
                  {timeAgo(rating.ratedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}