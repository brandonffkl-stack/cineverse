export interface Level {
  index:      number;
  name:       string;
  emoji:      string;
  color:      string;
  minRatings: number;
  speech:     string;
  perks:      string[];
}

export interface Achievement {
  id:          string;
  icon:        string;
  name:        string;
  description: string;
  xpReward:    number;
  rarity:      "common" | "uncommon" | "rare" | "epic" | "legendary";
  check:       (stats: AchievementCheckParams) => boolean;
}

export interface AchievementCheckParams {
  totalRated:     number;
  totalFavorites: number;
  hasMaxRating:   boolean;
  genresExplored: number;
  level:          number;
  avgRating:      number;
}

export interface Challenge {
  id:       string;
  icon:     string;
  title:    string;
  subtitle: string;
  xpReward: number;
  goal:     number;
  getProgress: (stats: AchievementCheckParams) => number;
}

export interface GamificationState {
  totalXP:              number;
  level:                number;
  levelName:            string;
  xpToNextLevel:        number;
  xpProgressPercent:    number;
  unlockedAchievements: string[];
  activeChallenges:     ChallengeProgress[];
}

export interface ChallengeProgress extends Challenge {
  current:   number;
  completed: boolean;
}