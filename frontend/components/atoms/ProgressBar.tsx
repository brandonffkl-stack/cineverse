import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value:      number;        // 0 - 100
  color?:     "violet" | "gold" | "green" | "pink";
  size?:      "sm" | "md" | "lg";
  animated?:  boolean;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  color     = "violet",
  size      = "md",
  animated  = true,
  showLabel = false,
  className,
}: ProgressBarProps) {

  const clamped = Math.min(100, Math.max(0, value));

  const colors = {
    violet: "from-violet-600 to-purple-400",
    gold:   "from-amber-500  to-yellow-300",
    green:  "from-emerald-500 to-green-300",
    pink:   "from-pink-600   to-rose-400",
  };

  const sizes = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2.5",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-[#7070a0]">Progreso</span>
          <span className="text-xs text-[#7070a0]">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-[#1e1e3a] rounded-full overflow-hidden",
          sizes[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            colors[color],
            animated && "transition-all duration-700 ease-out"
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}