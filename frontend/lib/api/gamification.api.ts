import client from "./client";

export const gamificationApi = {

  getXP: async () => {
    const res = await client.get("/gamification/xp");
    return res.data.data;
  },

  getAchievements: async () => {
    const res = await client.get("/gamification/achievements");
    return res.data.data;
  },

  getChallenges: async () => {
    const res = await client.get("/gamification/challenges");
    return res.data.data;
  },

  getLeaderboard: async () => {
    const res = await client.get("/gamification/leaderboard");
    return res.data.data;
  },
};