import axios from "axios";

const client = axios.create({
  baseURL:         process.env.NEXT_PUBLIC_API_URL,
  timeout:         10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Interceptor de request — agrega el token ─────────────────────
client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("cineverse_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Interceptor de response — manejo de errores ───────────────────
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cineverse_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default client;