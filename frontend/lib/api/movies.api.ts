import client from "./client";
import type { Movie } from "@/types/movie.types";

export const moviesApi = {

  getAll: async (params?: {
    genre?:    string;
    platform?: string;
    sortBy?:   string;
    page?:     number;
    limit?:    number;
  }) => {
    const res = await client.get("/movies", { params });
    return res.data.data as Movie[];
  },

  getTrending: async () => {
    const res = await client.get("/movies/trending");
    return res.data.data as Movie[];
  },

  getById: async (id: string) => {
    const res = await client.get(`/movies/${id}`);
    return res.data.data as Movie;
  },

  getRecommendations: async () => {
    const res = await client.get("/movies/recommendations");
    return res.data.data as Movie[];
  },

  search: async (q: string) => {
    const res = await client.get("/search", { params: { q } });
    return res.data.data as Movie[];
  },
};