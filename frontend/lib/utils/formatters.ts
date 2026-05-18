// ── Números ───────────────────────────────────────────────────────
export function formatVotes(votes: number): string {
  if (votes >= 1_000_000) return `${(votes / 1_000_000).toFixed(1)}M`;
  if (votes >= 1_000)     return `${(votes / 1_000).toFixed(1)}K`;
  return votes.toString();
}

export function formatXP(xp: number): string {
  if (xp >= 1_000) return `${(xp / 1_000).toFixed(1)}K XP`;
  return `${xp} XP`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

// ── Fechas ────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CO", {
    month: "short",
    day:   "numeric",
  });
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins  < 1)  return "ahora mismo";
  if (mins  < 60) return `hace ${mins} min`;
  if (hours < 24) return `hace ${hours}h`;
  if (days  < 7)  return `hace ${days}d`;
  return formatDateShort(dateStr);
}

// ── Texto ─────────────────────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(capitalize)
    .join(" ");
}

// ── Runtime ───────────────────────────────────────────────────────
export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

// ── Stars ─────────────────────────────────────────────────────────
export function starsToLabel(stars: number): string {
  const labels: Record<number, string> = {
    1: "Pésima",
    2: "Regular",
    3: "Buena",
    4: "Muy buena",
    5: "Obra maestra",
  };
  return labels[stars] ?? "";
}