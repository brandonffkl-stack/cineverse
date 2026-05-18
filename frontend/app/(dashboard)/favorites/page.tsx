"use client";

import MovieCard         from "@/components/molecules/MovieCard";
import { useUserStore }  from "@/store/useUserStore";
import { useMovieStore } from "@/store/useMovieStore";

export default function FavoritesPage() {
  const favorites = useUserStore((s) => s.favorites);
  const getById   = useMovieStore((s) => s.getById);

  const favoriteMovies = favorites
    .map((id) => getById(id))
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] mb-1">
            Favoritos
          </h1>
          <p className="text-sm text-[#7070a0]">
            Tus películas guardadas
          </p>
        </div>
        {favoriteMovies.length > 0 && (
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl px-4 py-2 text-center">
            <p className="font-display text-2xl font-bold text-pink-400">
              {favoriteMovies.length}
            </p>
            <p className="text-[10px] text-[#7070a0]">guardadas</p>
          </div>
        )}
      </div>

      {favoriteMovies.length === 0 ? (
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">💔</div>
          <p className="text-[#7070a0] text-sm mb-1">
            Aún no tienes favoritos
          </p>
          <p className="text-[#3a3a5c] text-xs">
            Haz clic en ♡ en cualquier película para guardarla aquí
          </p>
          <a
            href="/discover"
            className="inline-block mt-4 text-xs text-violet-400 hover:text-violet-300 border border-violet-500/30 hover:border-violet-400 px-4 py-2 rounded-lg transition-all"
          >
            Explorar películas →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie!.id} movie={movie!} />
          ))}
        </div>
      )}

    </div>
  );
}