import { cn }         from "@/lib/utils/cn";
import type { Movie } from "@/types/movie.types";
import { formatVotes } from "@/lib/utils/formatters";

interface RankRowProps {
  movie:    Movie;
  position: number;
  className?: string;
}

const MEDALS: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

const POSITION_COLORS: Record<number, string> = {
  1: "text-amber-400",
  2: "text-slate-400",
  3: "text-orange-600",
};

export default function RankRow({ movie, position, className }: RankRowProps) {
  const medal = MEDALS[position];
  const posColor = POSITION_COLORS[position] ?? "text-[#7070a0]";
  const fullStars = Math.round(movie.imdbRating / 2);

  return (
    <div className={cn(
      "flex items-center gap-3 bg-[#0d0d22] border border-[#1e1e3a]",
      "rounded-xl px-4 py-3 transition-all duration-200",
      "hover:border-violet-500/30 hover:bg-violet-500/5 cursor-pointer",
      className
    )}>
      {/* Posición */}
      <div className={cn("font-mono text-sm font-bold w-6 text-center flex-shrink-0", posColor)}>
        {medal ?? `#${position}`}
      </div>

      {/* Poster mini */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: movie.posterColor }}
      >
        {movie.posterEmoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#f1f0ff] truncate">
          {movie.title}
        </div>
        <div className="text-[10px] text-[#7070a0] mt-0.5">
          {movie.platform} · {movie.genre} · {movie.year}
        </div>
      </div>

      {/* Score */}
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <div className="text-xs text-amber-400">
          {"★".repeat(fullStars)}
          <span className="text-[#1e1e3a]">{"★".repeat(5 - fullStars)}</span>
        </div>
        <div className="font-mono text-sm font-bold text-amber-400">
          {movie.imdbRating}
        </div>
        <div className="text-[9px] text-[#3a3a5c]">
          {formatVotes(movie.votes)} votos
        </div>
      </div>
    </div>
  );
}