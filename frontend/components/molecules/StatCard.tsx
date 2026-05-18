import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  icon:       string;
  value:      string | number;
  label:      string;
  delta?:     string;
  deltaUp?:   boolean;
  color?:     "violet" | "gold" | "green" | "cyan" | "pink";
  className?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  delta,
  deltaUp   = true,
  color     = "violet",
  className,
}: StatCardProps) {

  const colors = {
    violet: "text-violet-400",
    gold:   "text-amber-400",
    green:  "text-emerald-400",
    cyan:   "text-cyan-400",
    pink:   "text-pink-400",
  };

  const glows = {
    violet: "rgba(124,58,237,0.08)",
    gold:   "rgba(245,158,11,0.08)",
    green:  "rgba(16,185,129,0.08)",
    cyan:   "rgba(6,182,212,0.08)",
    pink:   "rgba(236,72,153,0.08)",
  };

  return (
    <div
      className={cn(
        "relative bg-[#0d0d22] border border-[#1e1e3a] rounded-[14px]",
        "p-5 overflow-hidden transition-all duration-200",
        "hover:border-violet-500/30 hover:-translate-y-0.5",
        "hover:shadow-lg hover:shadow-violet-900/20",
        className
      )}
    >
      {/* Glow de fondo */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-8 translate-x-8 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glows[color]}, transparent 70%)` }}
      />

      <div className="text-2xl mb-3">{icon}</div>

      <div className={cn("font-display text-3xl font-bold leading-none mb-1", colors[color])}>
        {value}
      </div>

      <div className="text-xs text-[#7070a0] font-medium">{label}</div>

      {delta && (
        <div className={cn(
          "text-[10px] mt-2 flex items-center gap-1",
          deltaUp ? "text-emerald-400" : "text-red-400"
        )}>
          <span>{deltaUp ? "↑" : "↓"}</span>
          {delta}
        </div>
      )}
    </div>
  );
}