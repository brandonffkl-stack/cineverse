import type { UserStats }              from "@/types/user.types";
import type { AchievementCheckParams } from "@/types/gamification.types";
import { ACHIEVEMENTS }                from "../constants/achievements";
import { getLevelIndex, getLevelProgress, LEVELS } from "../constants/levels";

// ── XP por acción ─────────────────────────────────────────────────
export const XP_ACTIONS = {
  RATE_MOVIE:      25,
  WRITE_REVIEW:    50,
  ADD_FAVORITE:    10,
  DAILY_BONUS:     100,
} as const;

export function calculateTotalXP(stats: UserStats): number {
  let xp = 0;
  xp += stats.totalRated     * XP_ACTIONS.RATE_MOVIE;
  xp += stats.totalFavorites * XP_ACTIONS.ADD_FAVORITE;

  // Bonus por logros desbloqueados
  const params = buildCheckParams(stats);
  ACHIEVEMENTS.forEach((a) => {
    if (a.check(params)) xp += a.xpReward;
  });

  return xp;
}

// ── Construir parámetros para verificar logros ────────────────────
export function buildCheckParams(stats: UserStats): AchievementCheckParams {
  return {
    totalRated:     stats.totalRated,
    totalFavorites: stats.totalFavorites,
    hasMaxRating:   stats.hasMaxRating,
    genresExplored: stats.genresExplored,
    level:          stats.level,
    avgRating:      stats.avgRating,
  };
}

// ── Logros desbloqueados ──────────────────────────────────────────
export function getUnlockedAchievements(stats: UserStats): string[] {
  const params = buildCheckParams(stats);
  return ACHIEVEMENTS
    .filter((a) => a.check(params))
    .map((a) => a.id);
}

// ── Estado completo de gamificación ──────────────────────────────
export function buildGamificationState(stats: UserStats) {
  const levelIdx  = getLevelIndex(stats.totalRated);
  const level     = LEVELS[levelIdx];
  const nextLevel = LEVELS[levelIdx + 1];
  const totalXP   = calculateTotalXP(stats);
  const progress  = getLevelProgress(stats.totalRated);

  return {
    totalXP,
    level:             levelIdx + 1,
    levelName:         level.name,
    levelEmoji:        level.emoji,
    levelColor:        level.color,
    levelSpeech:       level.speech,
    xpToNextLevel:     nextLevel
                         ? (nextLevel.minRatings - stats.totalRated) * XP_ACTIONS.RATE_MOVIE
                         : 0,
    xpProgressPercent: progress,
    isMaxLevel:        levelIdx === LEVELS.length - 1,
    unlockedAchievements: getUnlockedAchievements(stats),
  };
}