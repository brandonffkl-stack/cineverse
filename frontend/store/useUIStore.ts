import { create } from "zustand";

interface Toast {
  id:      string;
  message: string;
  type:    "success" | "error" | "info" | "xp";
}

interface UIStoreState {
  // Sidebar
  sidebarOpen:    boolean;
  toggleSidebar:  () => void;
  setSidebar:     (open: boolean) => void;

  // Modal de calificación
  ratingModal: {
    open:    boolean;
    movieId: string | null;
  };
  openRatingModal:  (movieId: string) => void;
  closeRatingModal: () => void;

  // Toasts
  toasts:     Toast[];
  addToast:   (message: string, type?: Toast["type"]) => void;
  removeToast:(id: string) => void;

  // Loading global
  isLoading:  boolean;
  setLoading: (v: boolean) => void;
}

export const useUIStore = create<UIStoreState>()((set, get) => ({
  // ── Sidebar ───────────────────────────────────────────────────
  sidebarOpen:   true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar:    (open) => set({ sidebarOpen: open }),

  // ── Modal ─────────────────────────────────────────────────────
  ratingModal: { open: false, movieId: null },

  openRatingModal: (movieId) =>
    set({ ratingModal: { open: true, movieId } }),

  closeRatingModal: () =>
    set({ ratingModal: { open: false, movieId: null } }),

  // ── Toasts ───────────────────────────────────────────────────
  toasts: [],

  addToast: (message, type = "success") => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    // Auto-remove después de 3.5 segundos
    setTimeout(() => get().removeToast(id), 3500);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // ── Loading ───────────────────────────────────────────────────
  isLoading:  false,
  setLoading: (v) => set({ isLoading: v }),
}));

// ── Helpers para usar toasts fácilmente ──────────────────────────
export const toast = {
  success: (msg: string) => useUIStore.getState().addToast(msg, "success"),
  error:   (msg: string) => useUIStore.getState().addToast(msg, "error"),
  info:    (msg: string) => useUIStore.getState().addToast(msg, "info"),
  xp:      (msg: string) => useUIStore.getState().addToast(msg, "xp"),
};