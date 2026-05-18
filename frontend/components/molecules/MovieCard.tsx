import { useState } from "react";
import { cn }             from "@/lib/utils/cn";
import StarRating         from "@/components/atoms/StarRating";
import { useUserStore }   from "@/store/useUserStore";
import { useUIStore }     from "@/store/useUIStore";
import { toast }          from "@/store/useUIStore";
import type { Movie }     from "@/types/movie.types";
import { formatVotes }    from "@/lib/utils/formatters";
import { PLATFORM_MAP }   from "@/lib/constants/platforms";

interface MovieCardProps {
  movie:      Movie;
  className?: string;
}

export default function MovieCard({ movie, className }: MovieCardProps) {

  const [hovering, setHovering] = useState(false);

  const rateMovie      = useUserStore((s) => s.rateMovie);
  const getRating      = useUserStore((s) => s.getRating);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const isFavorite     = useUserStore((s) => s.isFavorite);
  const openModal      = useUIStore((s) => s.openRatingModal);

  const userRating = getRating(movie.id);
  const fav        = isFavorite(movie.id);
  const platform   = PLATFORM_MAP[movie.platform];

  function handleRate(stars: number) {
    const isNew = !userRating;
    rateMovie(movie.id, stars);
    toast.xp(isNew
      ? `🎬 +25 XP — "${movie.title}" calificada`
      : `✏️ Calificación actualizada`
    );
  }

  function handleFav(e: React.MouseEvent) {
    e.stopPropagation();
    toggleFavorite(movie.id);
    toast.success(fav ? "Eliminado de favoritos" : "❤️ Agregado a favoritos");
  }

  return (
    <div
      className={cn(
        "bg-[#0d0d22] border border-[#1e1e3a] rounded-[14px] overflow-hidden",
        "transition-all duration-200 cursor-pointer group",
        "hover:border-violet-500/50 hover:-translate-y-1",
        "hover:shadow-xl hover:shadow-black/40",
        className
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => openModal(movie.id)}
    >
      {/* Poster */}
      <div
        className="relative h-[110px] flex items-center justify-center text-5xl overflow-hidden"
        style={{ background: movie.posterColor }}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {movie.posterEmoji}
        </span>

        {/* Overlay en hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-[#04040e] via-transparent to-transparent",
          "transition-opacity duration-200",
          hovering ? "opacity-100" : "opacity-0"
        )} />

        {/* Botón favorito */}
        <button
          onClick={handleFav}
          className={cn(
            "absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center",
            "border transition-all duration-200 text-sm",
            fav
              ? "bg-pink-500 border-pink-500 text-white"
              : "bg-[#04040e]/80 border-[#1e1e3a] text-[#7070a0] opacity-0 group-hover:opacity-100"
          )}
        >
          {fav ? "♥" : "♡"}
        </button>

        {/* Badge plataforma */}
        <div
          className="absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded"
          style={{
            background: `${platform?.color ?? "#7c3aed"}33`,
            color:       platform?.color ?? "#a855f7",
          }}
        >
          {movie.platform}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-sm font-semibold text-[#f1f0ff] truncate mb-0.5">
          {movie.title}
        </div>

        <div className="text-[10px] text-[#7070a0] mb-2">
          {movie.year} · {movie.genre} · {movie.runtime ? `${movie.runtime}min` : ""}
        </div>

        <div className="flex items-center justify-between">
          <StarRating
            value={userRating?.stars ?? 0}
            onChange={handleRate}
            size="sm"
          />
          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">
            {movie.imdbRating}
          </span>
        </div>

        {userRating && (
          <div className="mt-1.5 text-[10px] text-violet-400 font-medium">
            ✓ Tu calificación: {userRating.stars}/5
          </div>
        )}
      </div>
    </div>
  );
}