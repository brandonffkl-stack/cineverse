export const ROUTES = {
  // Públicas
  LANDING:   "/",
  LOGIN:     "/login",
  REGISTER:  "/register",

  // Dashboard (protegidas)
  DASHBOARD: "/dashboard",
  DISCOVER:  "/discover",
  RANKINGS:  "/rankings",
  PROFILE:   "/profile",
  MASCOT:    "/mascot",
  HISTORY:   "/history",
  FAVORITES: "/favorites",
  MOVIE:     (id: string) => `/movie/${id}`,

  // API interna
  API: {
    MOVIES:         "/api/v1/movies",
    MOVIE:          (id: string) => `/api/v1/movies/${id}`,
    TRENDING:       "/api/v1/movies/trending",
    RECOMMENDATIONS:"/api/v1/movies/recommendations",
    RATINGS:        "/api/v1/ratings",
    FAVORITES:      "/api/v1/favorites",
    ME:             "/api/v1/users/me",
    MY_STATS:       "/api/v1/users/me/stats",
    XP:             "/api/v1/gamification/xp",
    ACHIEVEMENTS:   "/api/v1/gamification/achievements",
    CHALLENGES:     "/api/v1/gamification/challenges",
    SEARCH:         "/api/v1/search",
  },
} as const;