import { create } from "zustand";
import type { Movie, MovieFilters, SortMode } from "@/types/movie.types";
import { MOVIES_DATA } from "@/lib/constants/movies.data";

interface MovieStoreState {
  // Datos
  movies:  Movie[];
  filters: MovieFilters;

  // Acciones
  setSearch:  (search: string)  => void;
  setGenre:   (genre: string)   => void;
  setPlatform:(platform: string)=> void;
  setSortBy:  (sort: SortMode)  => void;
  resetFilters: ()              => void;

  // Computed
  getFiltered:   () => Movie[];
  getTrending:   () => Movie[];
  getByGenre:    (genre: string) => Movie[];
  getById:       (id: string)    => Movie | undefined;
}

const DEFAULT_FILTERS: MovieFilters = {
  genre:    "all",
  platform: "all",
  sortBy:   "rating",
  search:   "",
};

export const useMovieStore = create<MovieStoreState>()((set, get) => ({
  movies:  MOVIES_DATA,
  filters: DEFAULT_FILTERS,

  // ── Setters ───────────────────────────────────────────────────
  setSearch:   (search)   => set((s) => ({ filters: { ...s.filters, search } })),
  setGenre:    (genre)    => set((s) => ({ filters: { ...s.filters, genre: genre as any } })),
  setPlatform: (platform) => set((s) => ({ filters: { ...s.filters, platform: platform as any } })),
  setSortBy:   (sortBy)   => set((s) => ({ filters: { ...s.filters, sortBy } })),
  resetFilters: ()        => set({ filters: DEFAULT_FILTERS }),

  // ── Películas filtradas y ordenadas ───────────────────────────
  getFiltered: () => {
    const { movies, filters } = get();
    let list = [...movies];

    // Filtro búsqueda
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.platform.toLowerCase().includes(q) ||
          (m.director?.toLowerCase().includes(q) ?? false)
      );
    }

    // Filtro género
    if (filters.genre && filters.genre !== "all") {
      list = list.filter((m) => m.genre === filters.genre);
    }

    // Filtro plataforma
    if (filters.platform && filters.platform !== "all") {
      list = list.filter((m) => m.platform === filters.platform);
    }

    // Ordenamiento
    switch (filters.sortBy) {
      case "rating": list.sort((a, b) => b.imdbRating - a.imdbRating); break;
      case "year":   list.sort((a, b) => b.year       - a.year);       break;
      case "votes":  list.sort((a, b) => b.votes      - a.votes);      break;
    }

    return list;
  },

  // ── Top 8 por rating ─────────────────────────────────────────
  getTrending: () =>
    [...get().movies]
      .sort((a, b) => b.imdbRating - a.imdbRating)
      .slice(0, 8),

  // ── Por género ───────────────────────────────────────────────
  getByGenre: (genre) =>
    get().movies.filter((m) => m.genre === genre),

  // ── Por ID ───────────────────────────────────────────────────
  getById: (id) =>
    get().movies.find((m) => m.id === id),
}));

// Hook para cargar películas desde la API real
export async function loadMoviesFromAPI() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies?limit=100`
    );
    const json = await res.json();
    if (json.success && json.data.length > 0) {
      useMovieStore.setState({ movies: json.data });
    }
  } catch {
    // Usar datos locales como fallback
    console.log("Usando datos locales");
  }
}