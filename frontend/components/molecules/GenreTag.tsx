import { cn } from "@/lib/utils/cn";
import { GENRE_MAP } from "@/lib/constants/genres";

interface GenreTagProps {
  genre:      string;
  active?:    boolean;
  onClick?:   () => void;
  className?: string;
}

export default function GenreTag({
  genre,
  active    = false,
  onClick,
  className,
}: GenreTagProps) {

  const info = GENRE_MAP[genre];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "text-xs font-medium border transition-all duration-200",
        "whitespace-nowrap cursor-pointer",
        active
          ? "bg-violet-500/20 border-violet-500 text-violet-300"
          : "bg-transparent border-[#1e1e3a] text-[#7070a0] hover:border-violet-500/50 hover:text-violet-400",
        className
      )}
    >
      <span>{info?.emoji ?? "🎬"}</span>
      <span>{info?.label ?? genre}</span>
    </button>
  );
}