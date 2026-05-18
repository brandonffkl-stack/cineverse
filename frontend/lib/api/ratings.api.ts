import client from "./client";

export const ratingsApi = {

  create: async (data: {
    movieId: string;
    stars:   number;
    review?: string;
  }) => {
    const res = await client.post("/ratings", data);
    return res.data.data;
  },

  getUserRatings: async (userId: string) => {
    const res = await client.get(`/ratings/user/${userId}`);
    return res.data.data;
  },

  remove: async (movieId: string) => {
    const res = await client.delete(`/ratings/${movieId}`);
    return res.data.data;
  },
};