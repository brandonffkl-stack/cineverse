import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRating, UserStats, UserRatingsMap } from "@/types/user.types";
import { MOVIES_DATA } from "@/lib/constants/movies.data";
import { getLevelIndex } from "@/features/gamification/constants/levels";
import { XP_ACTIONS } from "@/features/gamification/utils/xpCalculator";

interface UserStoreState {
  ratings:   UserRatingsMap;
  favorites: string[];
  rateMovie:       (movieId: string, stars: number, review?: string) => void;
  removeRating:    (movieId: string) => void;
  toggleFavorite:  (movieId: string) => void;
  isFavorite:      (movieId: string) => boolean;
  getStats:        () => UserStats;
  getRating:       (movieId: string) => UserRating | undefined;
  getFavoritesSet: () => Set<string>;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      ratings:   {},
      favorites: [],

      rateMovie: (movieId, stars, review) => {
        set((state) => ({
          ratings: {
            ...state.ratings,
            [movieId]: {
              movieId,
              stars,
              review,
              ratedAt: new Date().toISOString(),
            },
          },
        }));
      },

      removeRating: (movieId) => {
        set((state) => {
          const next = { ...state.ratings };
          delete next[movieId];
          return { ratings: next };
        });
      },

      toggleFavorite: (movieId) => {
        set((state) => ({
          favorites: state.favorites.includes(movieId)
            ? state.favorites.filter((id) => id !== movieId)
            : [...state.favorites, movieId],
        }));
      },

      isFavorite: (movieId) => get().favorites.includes(movieId),

      getFavoritesSet: () => new Set(get().favorites),

      getRating: (movieId) => get().ratings[movieId],

      getStats: () => {
        const { ratings, favorites } = get();
        const ratingList  = Object.values(ratings);
        const totalRated  = ratingList.length;
        const avgRating   = totalRated
          ? ratingList.reduce((sum, r) => sum + r.stars, 0) / totalRated
          : 0;
        const hasMaxRating = ratingList.some((r) => r.stars === 5);

        const genresExplored = new Set(
          Object.keys(ratings).map((id) => {
            const movie = MOVIES_DATA.find((m) => m.id === id);
            return movie?.genre ?? "";
          })
        ).size;

        const ratingsByGenre: Record<string, number> = {};
        Object.keys(ratings).forEach((id) => {
          const movie = MOVIES_DATA.find((m) => m.id === id);
          if (movie) {
            ratingsByGenre[movie.genre] =
              (ratingsByGenre[movie.genre] ?? 0) + 1;
          }
        });

        const topGenre = Object.entries(ratingsByGenre)
          .sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—";

        const ratingsByStars: Record<number, number> = {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
        };
        ratingList.forEach((r) => {
          ratingsByStars[r.stars] = (ratingsByStars[r.stars] ?? 0) + 1;
        });

        const totalXP =
          totalRated       * XP_ACTIONS.RATE_MOVIE +
          favorites.length * XP_ACTIONS.ADD_FAVORITE;

        const level = getLevelIndex(totalRated) + 1;

        return {
          totalRated,
          totalFavorites: favorites.length,
          avgRating:      Math.round(avgRating * 10) / 10,
          totalXP,
          level,
          genresExplored,
          topGenre,
          hasMaxRating,
          ratingsByGenre,
          ratingsByStars,
        };
      },
    }),
    {
      name:    "cineverse-user",
      version: 1,
    }
  )
);