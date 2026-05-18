import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?:       string;
  name?:      string;
  size?:      "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({
  src,
  name,
  size      = "md",
  className,
}: AvatarProps) {

  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-14 h-14 text-xl",
    xl: "w-20 h-20 text-3xl",
  };

  // Inicial del nombre como fallback
  const initial = name
    ? name.charAt(0).toUpperCase()
    : "?";

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "Avatar"}
        className={cn(
          "rounded-full object-cover border-2 border-[#1e1e3a]",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold",
        "bg-gradient-to-br from-violet-600 to-pink-500 text-white",
        "border-2 border-violet-500/30 flex-shrink-0",
        sizes[size],
        className
      )}
    >
      {initial}
    </div>
  );
}