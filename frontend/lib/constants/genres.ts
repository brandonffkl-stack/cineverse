export const GENRES = [
  { value: "sci-fi",       label: "Sci-Fi",       emoji: "🚀", color: "#06b6d4" },
  { value: "thriller",     label: "Thriller",     emoji: "😱", color: "#ef4444" },
  { value: "drama",        label: "Drama",        emoji: "🎭", color: "#a855f7" },
  { value: "comedy",       label: "Comedia",      emoji: "😂", color: "#f59e0b" },
  { value: "action",       label: "Acción",       emoji: "💥", color: "#e85d04" },
  { value: "horror",       label: "Terror",       emoji: "👻", color: "#7c3aed" },
  { value: "romance",      label: "Romance",      emoji: "💕", color: "#ec4899" },
  { value: "documentary",  label: "Documental",   emoji: "📹", color: "#10b981" },
  { value: "animation",    label: "Animación",    emoji: "🎨", color: "#3b82f6" },
  { value: "crime",        label: "Crimen",       emoji: "🔍", color: "#64748b" },
  { value: "mystery",      label: "Misterio",     emoji: "🔮", color: "#8b5cf6" },
  { value: "fantasy",      label: "Fantasía",     emoji: "🧙", color: "#06b6d4" },
] as const;

export const GENRE_MAP = Object.fromEntries(
  GENRES.map((g) => [g.value, g])
);