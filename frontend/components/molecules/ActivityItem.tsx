import { cn }           from "@/lib/utils/cn";
import { timeAgo }      from "@/lib/utils/formatters";
import type { Movie }   from "@/types/movie.types";
import type { UserRating } from "@/types/user.types";

interface ActivityItemProps {
  movie:    Movie;
  rating:   UserRating;
  className?: string;
}

export default function ActivityItem({
  movie,
  rating,
  className,
}: ActivityItemProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 py-3",
      "border-b border-[#1e1e3a] last:border-0",
      className
    )}>
      {/* Mini poster */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
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
          {movie.platform} · {movie.genre}
        </div>
      </div>

      {/* Rating y tiempo */}
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <div className="text-sm text-amber-400 leading-none">
          {"★".repeat(rating.stars)}
          <span className="text-[#1e1e3a]">
            {"★".repeat(5 - rating.stars)}
          </span>
        </div>
        <div className="text-[10px] text-[#3a3a5c]">
          {timeAgo(rating.ratedAt)}
        </div>
      </div>
    </div>
  );
}