import client from "./client";

export const usersApi = {

  register: async (data: {
    displayName:     string;
    username:        string;
    email:           string;
    password:        string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...body } = data;
    const res = await client.post("/users/register", body);
    const token = res.data.data?.accessToken;
    if (token) {
      // Guardar en cookie para el middleware
      document.cookie = `cineverse_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      localStorage.setItem("cineverse_token", token);
    }
    return res.data.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await client.post("/users/login", data);
    const token = res.data.data?.accessToken;
    if (token) {
      document.cookie = `cineverse_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      localStorage.setItem("cineverse_token", token);
    }
    return res.data.data;
  },

  logout: () => {
    document.cookie = "cineverse_token=; path=/; max-age=0";
    localStorage.removeItem("cineverse_token");
  },

  getMe: async () => {
    const res = await client.get("/users/me");
    return res.data.data;
  },

  updateMe: async (data: { displayName?: string; bio?: string }) => {
    const res = await client.patch("/users/me", data);
    return res.data.data;
  },

  getMyStats: async () => {
    const res = await client.get("/users/me/stats");
    return res.data.data;
  },
};