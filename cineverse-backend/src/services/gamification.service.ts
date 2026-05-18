import { prisma } from "../config/database";

const LEVELS = [
  { min: 0,  name: "Nuevo Espectador",    xpNext: 75  },
  { min: 75, name: "Cinéfilo Curioso",    xpNext: 150 },
  { min: 150,name: "Crítico Amateur",     xpNext: 250 },
  { min: 250,name: "Experto en Streaming",xpNext: 400 },
  { min: 400,name: "Maestro del Cine",    xpNext: null },
];

function getLevel(xp: number) {
  let lvl = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.min) lvl = l;
  }
  return lvl;
}

export class GamificationService {

  async getXPState(userId: string) {
    const user = await prisma.user.findUnique({
      where:  { id: userId },
      select: { totalXP: true, level: true },
    });
    if (!user) return null;

    const currentLevel = getLevel(user.totalXP);
    const nextLevel    = LEVELS[LEVELS.indexOf(currentLevel) + 1];
    const progress     = nextLevel
      ? Math.round(((user.totalXP - currentLevel.min) /
                    (nextLevel.min - currentLevel.min)) * 100)
      : 100;

    return {
      totalXP:       user.totalXP,
      level:         user.level,
      levelName:     currentLevel.name,
      xpToNextLevel: nextLevel ? nextLevel.min - user.totalXP : 0,
      progress,
      isMaxLevel:    !nextLevel,
    };
  }

  async getAchievements(userId: string) {
    return prisma.userAchievement.findMany({
      where:   { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: "desc" },
    });
  }

  async getChallenges(userId: string) {
    const [ratings, favorites] = await Promise.all([
      prisma.rating.count({ where: { userId } }),
      prisma.favorite.count({ where: { userId } }),
    ]);

    return [
      {
        id:        "ch_first",
        title:     "Primera calificación",
        goal:      1,
        current:   Math.min(ratings, 1),
        completed: ratings >= 1,
        xpReward:  50,
      },
      {
        id:        "ch_streak",
        title:     "Racha de 3",
        goal:      3,
        current:   Math.min(ratings, 3),
        completed: ratings >= 3,
        xpReward:  100,
      },
      {
        id:        "ch_favs",
        title:     "Colección inicial",
        goal:      3,
        current:   Math.min(favorites, 3),
        completed: favorites >= 3,
        xpReward:  75,
      },
      {
        id:        "ch_complete",
        title:     "Colección completa",
        goal:      16,
        current:   Math.min(ratings, 16),
        completed: ratings >= 16,
        xpReward:  500,
      },
    ];
  }

  async getLeaderboard() {
    return prisma.user.findMany({
      orderBy: { totalXP: "desc" },
      take:    10,
      select: {
        displayName: true,
        username:    true,
        avatarUrl:   true,
        totalXP:     true,
        level:       true,
      },
    });
  }
}