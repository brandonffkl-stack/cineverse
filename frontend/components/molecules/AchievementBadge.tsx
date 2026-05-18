import { cn } from "@/lib/utils/cn";
import { RARITY_COLORS, RARITY_LABELS } from "@/features/gamification/constants/achievements";
import type { Achievement } from "@/types/gamification.types";

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked:    boolean;
  className?:  string;
}

export default function AchievementBadge({
  achievement,
  unlocked,
  className,
}: AchievementBadgeProps) {

  const rarityColor = RARITY_COLORS[achievement.rarity];

  return (
    <div
      className={cn(
        "relative bg-[#0d0d22] border rounded-xl p-4 text-center",
        "transition-all duration-200",
        unlocked
          ? "border-violet-500/30 hover:-translate-y-1 hover:shadow-lg"
          : "border-[#1e1e3a] opacity-40 grayscale",
        className
      )}
      style={unlocked ? {
        boxShadow: `0 4px 20px ${rarityColor}22`
      } : {}}
    >
      {/* Icono de candado si está bloqueado */}
      {!unlocked && (
        <span className="absolute top-2 right-2 text-[10px] text-[#3a3a5c]">
          🔒
        </span>
      )}

      {/* Rareza */}
      {unlocked && (
        <span
          className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            background: `${rarityColor}22`,
            color: rarityColor,
          }}
        >
          {RARITY_LABELS[achievement.rarity]}
        </span>
      )}

      <div className="text-3xl mb-2">{achievement.icon}</div>

      <div className="text-xs font-semibold text-[#f1f0ff] mb-1">
        {achievement.name}
      </div>

      <div className="text-[10px] text-[#7070a0] leading-snug">
        {achievement.description}
      </div>

      {unlocked && (
        <div
          className="text-[10px] font-bold mt-2"
          style={{ color: rarityColor }}
        >
          +{achievement.xpReward} XP
        </div>
      )}
    </div>
  );
}