"use client";

import { useParams, useRouter } from "next/navigation";
import Button           from "@/components/atoms/Button";
import StarRating       from "@/components/atoms/StarRating";
import Badge            from "@/components/atoms/Badge";
import ProgressBar      from "@/components/atoms/ProgressBar";
import { useMovieStore } from "@/store/useMovieStore";
import { useUserStore }  from "@/store/useUserStore";
import { toast }         from "@/store/useUIStore";
import { formatVotes, formatRuntime, starsToLabel } from "@/lib/utils/formatters";
import { PLATFORM_MAP }  from "@/lib/constants/platforms";
import { GENRE_MAP }     from "@/lib/constants/genres";

export default function MovieDetailPage() {
  const params  = useParams();
  const router  = useRouter();
  const id      = params.id as string;

  const getById        = useMovieStore((s) => s.getById);
  const getTrending    = useMovieStore((s) => s.getTrending);
  const rateMovie      = useUserStore((s) => s.rateMovie);
  const getRating      = useUserStore((s) => s.getRating);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const isFavorite     = useUserStore((s) => s.isFavorite);

  const movie    = getById(id);
  const rating   = getRating(id);
  const fav      = isFavorite(id);
  const platform = movie ? PLATFORM_MAP[movie.platform] : null;
  const genre    = movie ? GENRE_MAP[movie.genre]       : null;

  // Películas similares por género
  const similar = getTrending()
    .filter((m) => m.id !== id && m.genre === movie?.genre)
    .slice(0, 4);

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">🎬</div>
        <p className="text-[#7070a0]">Película no encontrada</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-violet-400 text-sm hover:text-violet-300"
        >
          ← Volver
        </button>
      </div>
    );
  }

  function handleRate(stars: number) {
    const isNew = !rating;
    rateMovie(movie!.id, stars);
    toast.xp(isNew
      ? `🎬 +25 XP — "${movie!.title}" calificada`
      : "✏️ Calificación actualizada"
    );
  }

  function handleFav() {
    toggleFavorite(movie!.id);
    toast.success(fav ? "Eliminado de favoritos" : "❤️ Agregado a favoritos");
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-[#7070a0] hover:text-[#f1f0ff] mb-6 transition-colors"
      >
        ← Volver
      </button>

      {/* Hero de la película */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6 border border-[#1e1e3a]"
        style={{ background: movie.posterColor }}
      >
        {/* Fondo emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-[160px] opacity-20">
          {movie.posterEmoji}
        </div>

        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04040e] via-[#04040e]/60 to-transparent" />

        {/* Contenido */}
        <div className="relative p-8 pt-32">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {platform && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: `${platform.color}25`,
                  color: platform.color,
                  border: `1px solid ${platform.color}40`,
                }}
              >
                {platform.emoji} {movie.platform}
              </span>
            )}
            {genre && (
              <Badge variant="violet">
                {genre.emoji} {genre.label}
              </Badge>
            )}
            <Badge variant="gray">{movie.year}</Badge>
            {movie.runtime && (
              <Badge variant="gray">{formatRuntime(movie.runtime)}</Badge>
            )}
            <Badge variant="gray">{movie.language.toUpperCase()}</Badge>
          </div>

          {/* Título */}
          <h1 className="font-display text-5xl font-black tracking-tight text-[#f1f0ff] mb-3 leading-none">
            {movie.title}
          </h1>

          {/* Director */}
          {movie.director && (
            <p className="text-sm text-[#7070a0] mb-4">
              Dir. <span className="text-[#f1f0ff]">{movie.director}</span>
            </p>
          )}

          {/* Descripción */}
          <p className="text-sm text-[#a09ccc] leading-relaxed max-w-xl mb-6">
            {movie.description}
          </p>

          {/* Acciones */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleFav} variant="secondary" size="md">
              {fav ? "♥ En favoritos" : "♡ Agregar a favoritos"}
            </Button>
          </div>
        </div>
      </div>

      {/* Grid info + calificación */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

        {/* Métricas */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {/* IMDB */}
          <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
            <p className="text-[10px] text-[#3a3a5c] font-bold tracking-widest uppercase mb-2">
              IMDB Rating
            </p>
            <div className="flex items-end gap-2 mb-2">
              <span className="font-display text-4xl font-black text-amber-400">
                {movie.imdbRating}
              </span>
              <span className="text-[#7070a0] text-sm mb-1">/10</span>
            </div>
            <ProgressBar
              value={(movie.imdbRating / 10) * 100}
              color="gold"
              size="sm"
            />
            <p className="text-[10px] text-[#3a3a5c] mt-2">
              {formatVotes(movie.votes)} votos
            </p>
          </div>

          {/* Plataforma */}
          <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
            <p className="text-[10px] text-[#3a3a5c] font-bold tracking-widest uppercase mb-2">
              Disponible en
            </p>
            <div
              className="text-2xl font-display font-black mb-2"
              style={{ color: platform?.color ?? "#a855f7" }}
            >
              {platform?.emoji} {movie.platform}
            </div>
            <p className="text-[10px] text-[#3a3a5c]">
              Género: {genre?.label ?? movie.genre}
            </p>
            <p className="text-[10px] text-[#3a3a5c] mt-1">
              Idioma: {movie.language.toUpperCase()}
            </p>
          </div>

          {/* Tu calificación previa */}
          {rating && (
            <div className="col-span-2 bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
              <p className="text-[10px] text-violet-400 font-bold tracking-widest uppercase mb-2">
                Tu calificación
              </p>
              <div className="flex items-center gap-3">
                <div className="text-amber-400 text-2xl">
                  {"★".repeat(rating.stars)}
                  <span className="text-[#1e1e3a]">
                    {"★".repeat(5 - rating.stars)}
                  </span>
                </div>
                <span className="text-violet-400 font-bold">
                  {starsToLabel(rating.stars)}
                </span>
              </div>
              {rating.review && (
                <p className="text-xs text-[#7070a0] mt-2 italic">
                  "{rating.review}"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Panel de calificación */}
        <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
          <p className="text-[10px] text-[#3a3a5c] font-bold tracking-widest uppercase mb-4">
            {rating ? "Actualizar calificación" : "Calificar película"}
          </p>
          <StarRating
            value={rating?.stars ?? 0}
            onChange={handleRate}
            size="lg"
            showLabel
            className="mb-4"
          />
          {!rating ? (
            <p className="text-[10px] text-[#3a3a5c]">
              +25 XP por calificar ⚡
            </p>
          ) : (
            <p className="text-[10px] text-emerald-400">
              ✓ Ya calificaste esta película
            </p>
          )}
        </div>
      </div>

      {/* Películas similares */}
      {similar.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-bold text-[#f1f0ff] mb-4">
            🎭 Similares en {genre?.label ?? movie.genre}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {similar.map((m) => (
              <div
                key={m.id}
                onClick={() => router.push(`/movie/${m.id}`)}
                className="bg-[#0d0d22] border border-[#1e1e3a] rounded-xl overflow-hidden cursor-pointer hover:border-violet-500/40 transition-all hover:-translate-y-1"
              >
                <div
                  className="h-20 flex items-center justify-center text-4xl"
                  style={{ background: m.posterColor }}
                >
                  {m.posterEmoji}
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-[#f1f0ff] truncate">
                    {m.title}
                  </p>
                  <p className="text-[10px] text-amber-400 mt-0.5">
                    ⭐ {m.imdbRating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}