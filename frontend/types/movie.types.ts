export type Genre =
  | "sci-fi" | "thriller" | "drama" | "comedy"
  | "action" | "horror"   | "romance" | "documentary"
  | "animation" | "crime" | "mystery" | "fantasy";

export type Platform =
  | "Netflix" | "HBO Max"   | "Amazon"   | "Disney+"
  | "Apple TV+" | "Hulu"   | "Paramount+" | "Peacock"
  | "JioCinema" | "Crunchyroll";

export interface Movie {
  id:          string;
  title:       string;
  slug:        string;
  year:        number;
  genre:       Genre;
  platform:    Platform;
  imdbRating:  number;
  votes:       number;
  posterEmoji: string;
  posterColor: string;
  description: string;
  director?:   string;
  runtime?:    number;
  language:    string;
}

export interface MovieWithUserData extends Movie {
  userRating?:   number;
  isFavorite:    boolean;
  ratedAt?:      string;
}

export type SortMode = "rating" | "year" | "votes";

export interface MovieFilters {
  genre?:      Genre | "all";
  platform?:   Platform | "all";
  sortBy:      SortMode;
  search:      string;
}