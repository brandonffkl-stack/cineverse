import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  "violet" | "gold" | "green" | "pink" | "red" | "gray";
  size?:     "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant   = "violet",
  size      = "md",
  className,
}: BadgeProps) {

  const variants = {
    violet: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    gold:   "bg-amber-500/15  text-amber-400  border-amber-500/30",
    green:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pink:   "bg-pink-500/15   text-pink-400   border-pink-500/30",
    red:    "bg-red-500/15    text-red-400    border-red-500/30",
    gray:   "bg-white/5       text-[#7070a0]  border-white/10",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs     px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}