"use client";

import { useUIStore }   from "@/store/useUIStore";
import { useUserStore } from "@/store/useUserStore";
import { toast }        from "@/store/useUIStore";
import { MOVIES_DATA }  from "@/lib/constants/movies.data";
import Button           from "@/components/atoms/Button";

export default function HeroSection() {
  const openModal      = useUIStore((s) => s.openRatingModal);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const isFavorite     = useUserStore((s) => s.isFavorite);

  // Película destacada — la de mayor rating
  const featured = MOVIES_DATA[0];
  const fav      = isFavorite(featured.id);

  function handleFav() {
    toggleFavorite(featured.id);
    toast.success(fav ? "Eliminado de favoritos" : "❤️ Agregado a favoritos");
  }

  return (
    <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] border border-[#1e1e3a]">

      {/* Fondo */}
      <div
        className="absolute inset-0 flex items-center justify-center text-[100px] opacity-15"
        style={{ background: featured.posterColor }}
      >
        {featured.posterEmoji}
      </div>

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04040e] via-[#04040e]/80 to-transparent" />

      {/* Contenido */}
      <div className="relative h-full flex flex-col justify-center px-8 max-w-lg">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-bold px-3 py-1 rounded-full mb-3 w-fit tracking-wide uppercase">
          ⭐ Destacada de la semana
        </div>

        {/* Título */}
        <h2 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] leading-none mb-2">
          {featured.title}
        </h2>

        {/* Descripción */}
        <p className="text-xs text-[#7070a0] leading-relaxed mb-4 max-w-sm line-clamp-2">
          {featured.description}
        </p>

        {/* Acciones */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => openModal(featured.id)}
          >
            ▶ Calificar
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleFav}
          >
            {fav ? "♥ Guardada" : "♡ Favorito"}
          </Button>
        </div>

      </div>

      {/* IMDB badge */}
      <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/30 rounded-lg px-3 py-1.5 text-center">
        <div className="text-[9px] text-amber-400/70 font-bold tracking-widest uppercase">
          IMDB
        </div>
        <div className="font-mono text-lg font-black text-amber-400 leading-none">
          {featured.imdbRating}
        </div>
      </div>

    </div>
  );
}