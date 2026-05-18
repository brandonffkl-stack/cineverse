import type { Level } from "@/types/gamification.types";

export const LEVELS: Level[] = [
  {
    index:      0,
    name:       "Nuevo Espectador",
    emoji:      "👶",
    color:      "#7070a0",
    minRatings: 0,
    speech:     "¡Hola! Soy Cinebot. Califica películas conmigo y evolucionaré contigo. ¡Empecemos!",
    perks:      ["Acceso al catálogo completo", "Dashboard básico"],
  },
  {
    index:      1,
    name:       "Cinéfilo Curioso",
    emoji:      "🍿",
    color:      "#10b981",
    minRatings: 3,
    speech:     "¡Bien! Ya veo que tienes buen gusto. Sigo aprendiendo de tus preferencias.",
    perks:      ["Recomendaciones personalizadas", "Filtros avanzados"],
  },
  {
    index:      2,
    name:       "Crítico Amateur",
    emoji:      "🎭",
    color:      "#3b82f6",
    minRatings: 6,
    speech:     "¡Excelente! Ya analizo patrones en tus calificaciones. Tu radar cinematográfico mejora.",
    perks:      ["Estadísticas de géneros", "Gráfica de actividad"],
  },
  {
    index:      3,
    name:       "Experto en Streaming",
    emoji:      "⭐",
    color:      "#a855f7",
    minRatings: 10,
    speech:     "Impresionante. Mi base de conocimiento crece contigo. Ya casi somos inseparables.",
    perks:      ["Rankings comparativos", "Perfil público", "Badge exclusivo"],
  },
  {
    index:      4,
    name:       "Maestro del Cine",
    emoji:      "🏆",
    color:      "#f59e0b",
    minRatings: 15,
    speech:     "¡Lo logramos! Nivel máximo desbloqueado. Eres un verdadero Maestro del Cine. 🎬",
    perks:      ["Halo dorado en Cinebot", "Título exclusivo", "Acceso VIP"],
  },
];

export function getLevelIndex(totalRated: number): number {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalRated >= LEVELS[i].minRatings) idx = i;
  }
  return idx;
}

export function getLevelProgress(totalRated: number): number {
  const idx  = getLevelIndex(totalRated);
  const curr = LEVELS[idx];
  const next = LEVELS[idx + 1];
  if (!next) return 100;
  const range = next.minRatings - curr.minRatings;
  const done  = totalRated    - curr.minRatings;
  return Math.min(100, Math.round((done / range) * 100));
}