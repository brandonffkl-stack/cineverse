"use client";

import { useState, useEffect } from "react";
import { cn }          from "@/lib/utils/cn";
import Button          from "@/components/atoms/Button";
import StarRating      from "@/components/atoms/StarRating";
import { useUIStore }  from "@/store/useUIStore";
import { useUserStore } from "@/store/useUserStore";
import { useMovieStore } from "@/store/useMovieStore";
import { toast }       from "@/store/useUIStore";
import { starsToLabel, formatRuntime } from "@/lib/utils/formatters";

export default function RatingModal() {
  const { ratingModal, closeRatingModal } = useUIStore();
  const rateMovie   = useUserStore((s) => s.rateMovie);
  const getRating   = useUserStore((s) => s.getRating);
  const getById     = useMovieStore((s) => s.getById);

  const [stars,  setStars]  = useState(0);
  const [review, setReview] = useState("");

  const movie      = ratingModal.movieId ? getById(ratingModal.movieId) : null;
  const existing   = ratingModal.movieId ? getRating(ratingModal.movieId) : undefined;

  // Cargar calificación existente
  useEffect(() => {
    if (existing) {
      setStars(existing.stars);
      setReview(existing.review ?? "");
    } else {
      setStars(0);
      setReview("");
    }
  }, [ratingModal.movieId, existing]);

  if (!ratingModal.open || !movie) return null;

  function handleSubmit() {
    if (stars === 0) {
      toast.error("Selecciona al menos 1 estrella");
      return;
    }
    const isNew = !existing;
    rateMovie(movie!.id, stars, review || undefined);
    toast.xp(isNew
      ? `🎬 +25 XP — "${movie!.title}" calificada`
      : `✏️ Calificación actualizada`
    );
    closeRatingModal();
  }

  return (
    <>
      {/* Backdrop */}
<div
  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[199]"
  onClick={closeRatingModal}
/>

{/* Modal */}
<div className={cn(
  "fixed z-[200]",
  "w-[90vw] max-w-sm",
  "bg-[#0d0d22] border border-[#1e1e3a]",
  "rounded-2xl shadow-2xl shadow-black/60",
  "overflow-y-auto max-h-[85vh]",
  "animate-[scaleIn_0.2s_ease_forwards]"
)}
style={{
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}}
>
        {/* Header */}
        <div
          className="h-32 flex items-center justify-center relative rounded-t-2xl overflow-hidden"
          style={{ background: movie.posterColor }}
        >
          <span className="text-6xl">{movie.posterEmoji}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d22] to-transparent" />
          <button
            onClick={closeRatingModal}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/40 text-white/60 hover:text-white flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">

          {/* Info película */}
          <div className="mb-5">
            <h3 className="font-display text-2xl font-bold text-[#f1f0ff] leading-tight mb-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#7070a0] mb-3">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.platform}</span>
              <span>·</span>
              <span>{movie.genre}</span>
              {movie.runtime && (
                <>
                  <span>·</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                </>
              )}
            </div>
            <p className="text-xs text-[#7070a0] leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Stars */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-[#a09ccc] mb-2 uppercase tracking-wide">
              Tu calificación
            </p>
            <div className="flex items-center gap-4">
              <StarRating
                value={stars}
                onChange={setStars}
                size="lg"
                showLabel
              />
              {stars > 0 && (
                <span className="text-2xl font-display font-bold text-amber-400">
                  {stars}/5
                </span>
              )}
            </div>
          </div>

          {/* Review opcional */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#a09ccc] mb-2 uppercase tracking-wide">
              Reseña <span className="text-[#3a3a5c] normal-case font-normal">(opcional)</span>
            </p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="¿Qué te pareció la película?"
              maxLength={500}
              rows={3}
              className={cn(
                "w-full bg-[#12122e] border border-[#1e1e3a] rounded-xl",
                "px-3 py-2.5 text-sm text-[#f1f0ff]",
                "placeholder:text-[#3a3a5c] outline-none resize-none",
                "focus:border-violet-500/50 transition-colors"
              )}
            />
            <p className="text-[10px] text-[#3a3a5c] text-right mt-1">
              {review.length}/500
            </p>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={closeRatingModal}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={stars === 0}
            >
              {existing ? "Actualizar" : "Calificar"} +25 XP ⚡
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}