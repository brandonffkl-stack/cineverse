import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { starsToLabel } from "@/lib/utils/formatters";

interface StarRatingProps {
  value?:       number;
  onChange?:    (stars: number) => void;
  readonly?:    boolean;
  size?:        "sm" | "md" | "lg";
  showLabel?:   boolean;
  className?:   string;
}

export default function StarRating({
  value     = 0,
  onChange,
  readonly  = false,
  size      = "md",
  showLabel = false,
  className,
}: StarRatingProps) {

  const [hovered, setHovered] = useState(0);

  const sizes = {
    sm: "text-base gap-0.5",
    md: "text-2xl gap-1",
    lg: "text-4xl gap-1.5",
  };

  const active = hovered || value;

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div className={cn("flex", sizes[size])}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={cn(
              "transition-all duration-100 leading-none",
              readonly
                ? "cursor-default"
                : "cursor-pointer hover:scale-125",
              star <= active
                ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                : "text-[#1e1e3a]"
            )}
          >
            ★
          </button>
        ))}
      </div>

      {showLabel && active > 0 && (
        <span className="text-xs text-amber-400 font-medium">
          {starsToLabel(active)}
        </span>
      )}
    </div>
  );
}