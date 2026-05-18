export interface User {
  id:          string;
  email:       string;
  username:    string;
  displayName: string;
  avatarUrl?:  string;
  bio?:        string;
  totalXP:     number;
  level:       number;
  createdAt:   string;
}

export interface UserStats {
  totalRated:     number;
  totalFavorites: number;
  avgRating:      number;
  totalXP:        number;
  level:          number;
  genresExplored: number;
  topGenre:       string;
  hasMaxRating:   boolean;
  ratingsByGenre: Record<string, number>;
  ratingsByStars: Record<number, number>;
}

export interface UserRating {
  movieId:  string;
  stars:    number;
  review?:  string;
  ratedAt:  string;
}

export type UserRatingsMap = Record<string, UserRating>;
export type FavoritesSet   = Set<string>;