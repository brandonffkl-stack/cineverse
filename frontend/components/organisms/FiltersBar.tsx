"use client";

import { cn }           from "@/lib/utils/cn";
import GenreTag         from "@/components/molecules/GenreTag";
import { useMovieStore } from "@/store/useMovieStore";
import { GENRES }       from "@/lib/constants/genres";
import { PLATFORMS }    from "@/lib/constants/platforms";
import type { SortMode } from "@/types/movie.types";

export default function FiltersBar() {
  const filters     = useMovieStore((s) => s.filters);
  const setGenre    = useMovieStore((s) => s.setGenre);
  const setPlatform = useMovieStore((s) => s.setPlatform);
  const setSortBy   = useMovieStore((s) => s.setSortBy);
  const resetFilters = useMovieStore((s) => s.resetFilters);

  const hasActiveFilters =
    filters.genre !== "all" ||
    filters.platform !== "all" ||
    filters.sortBy !== "rating";

  return (
    <div className="space-y-3 mb-6">

      {/* Géneros */}
      <div className="flex gap-2 flex-wrap">
        <GenreTag
          genre="all"
          active={filters.genre === "all"}
          onClick={() => setGenre("all")}
        />
        {GENRES.map((g) => (
          <GenreTag
            key={g.value}
            genre={g.value}
            active={filters.genre === g.value}
            onClick={() => setGenre(g.value)}
          />
        ))}
      </div>

      {/* Ordenamiento + plataforma + reset */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as SortMode)}
          className={cn(
            "bg-[#0d0d22] border border-[#1e1e3a] rounded-lg",
            "px-3 py-1.5 text-xs text-[#f1f0ff] outline-none cursor-pointer",
            "focus:border-violet-500/50 transition-colors"
          )}
        >
          <option value="rating">Mayor rating</option>
          <option value="year">Más recientes</option>
          <option value="votes">Más votadas</option>
        </select>

        {/* Plataforma */}
        <select
          value={filters.platform ?? "all"}
          onChange={(e) => setPlatform(e.target.value)}
          className={cn(
            "bg-[#0d0d22] border border-[#1e1e3a] rounded-lg",
            "px-3 py-1.5 text-xs text-[#f1f0ff] outline-none cursor-pointer",
            "focus:border-violet-500/50 transition-colors"
          )}
        >
          <option value="all">Todas las plataformas</option>
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.emoji} {p.label}
            </option>
          ))}
        </select>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className={cn(
              "text-xs text-[#7070a0] hover:text-red-400",
              "border border-[#1e1e3a] hover:border-red-500/30",
              "px-3 py-1.5 rounded-lg transition-all"
            )}
          >
            ✕ Limpiar filtros
          </button>
        )}

        {/* Contador */}
        <span className="text-xs text-[#3a3a5c] ml-auto">
          {useMovieStore.getState().getFiltered().length} películas
        </span>

      </div>
    </div>
  );
}