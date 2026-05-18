"use client";

import FiltersBar        from "@/components/organisms/FiltersBar";
import MovieCard         from "@/components/molecules/MovieCard";
import { useMovieStore } from "@/store/useMovieStore";
import { useUserStore }  from "@/store/useUserStore";

export default function DiscoverPage() {
  const getFiltered = useMovieStore((s) => s.getFiltered);
  const getStats    = useUserStore((s) => s.getStats);
  const movies      = getFiltered();
  const stats       = getStats();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black text-[#f1f0ff] mb-1">
          Descubrir
        </h1>
        <p className="text-sm text-[#7070a0]">
          {stats.totalRated} de 16 películas calificadas
        </p>
      </div>

      <FiltersBar />

      {movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-[#7070a0] text-sm">
            No se encontraron películas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}