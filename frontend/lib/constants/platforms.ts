export const PLATFORMS = [
  { value: "Netflix",      label: "Netflix",      color: "#E50914", emoji: "🔴" },
  { value: "HBO Max",      label: "HBO Max",      color: "#B0179F", emoji: "🟣" },
  { value: "Amazon",       label: "Amazon Prime", color: "#00A8E1", emoji: "🔵" },
  { value: "Disney+",      label: "Disney+",      color: "#113CCF", emoji: "🏰" },
  { value: "Apple TV+",    label: "Apple TV+",    color: "#555555", emoji: "🍎" },
  { value: "Hulu",         label: "Hulu",         color: "#1CE783", emoji: "🟢" },
  { value: "Paramount+",   label: "Paramount+",   color: "#00B2F5", emoji: "⭐" },
  { value: "Peacock",      label: "Peacock",      color: "#002175", emoji: "🦚" },
  { value: "JioCinema",    label: "JioCinema",    color: "#FF6600", emoji: "🎬" },
  { value: "Crunchyroll",  label: "Crunchyroll",  color: "#FA7D00", emoji: "🍊" },
] as const;

export const PLATFORM_MAP = Object.fromEntries(
  PLATFORMS.map((p) => [p.value, p])
);