"use client";

import { useState, useEffect } from "react";
import { useRouter }           from "next/navigation";
import { cn }                  from "@/lib/utils/cn";
import { useUIStore }          from "@/store/useUIStore";
import { useMovieStore }       from "@/store/useMovieStore";
import { useUserStore }        from "@/store/useUserStore";
import { ROUTES }              from "@/lib/constants/routes";
import { getLevelIndex, LEVELS } from "@/features/gamification/constants/levels";

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title }: TopbarProps) {
  const router        = useRouter();
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSearch_    = useMovieStore((s) => s.setSearch);
  const getStats      = useUserStore((s) => s.getStats);
  const stats         = getStats();
  const levelIdx      = getLevelIndex(stats.totalRated);
  const level         = LEVELS[levelIdx];

  // Debounce búsqueda
  useEffect(() => {
    const t = setTimeout(() => setSearch_(search), 300);
    return () => clearTimeout(t);
  }, [search, setSearch_]);

  return (
    <header className={cn(
      "sticky top-0 z-30 h-14",
      "bg-[#04040e]/85 backdrop-blur-xl",
      "border-b border-[#1e1e3a]",
      "flex items-center gap-3 px-5"
    )}>

      {/* Botón hamburguesa */}
      <button
        onClick={toggleSidebar}
        className="w-8 h-8 flex flex-col justify-center gap-1.5 flex-shrink-0 group"
      >
        <span className="block w-5 h-px bg-[#7070a0] group-hover:bg-violet-400 transition-colors" />
        <span className="block w-3.5 h-px bg-[#7070a0] group-hover:bg-violet-400 transition-colors" />
        <span className="block w-4 h-px bg-[#7070a0] group-hover:bg-violet-400 transition-colors" />
      </button>

      {/* Título de página */}
      {title && (
        <h1 className="font-display text-lg font-bold tracking-tight text-[#f1f0ff] flex-shrink-0">
          {title}
        </h1>
      )}

      {/* Barra de búsqueda */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3a3a5c] text-sm">
            ⌕
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar películas..."
            className={cn(
              "w-full bg-[#0d0d22] border border-[#1e1e3a] rounded-lg",
              "pl-8 pr-3 py-1.5 text-xs text-[#f1f0ff]",
              "placeholder:text-[#3a3a5c] outline-none",
              "focus:border-violet-500/50 transition-colors"
            )}
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Nivel actual */}
      <div className="hidden sm:flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
        <span className="text-sm">{level.emoji}</span>
        <span className="text-xs font-medium text-violet-300">
          Lv.{levelIdx + 1}
        </span>
      </div>

      {/* XP */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#7070a0]">
        <span className="text-amber-400">⚡</span>
        <span className="font-mono text-amber-400 font-bold">
          {stats.totalXP}
        </span>
        <span>XP</span>
      </div>

      {/* Notificaciones */}
      <div className="relative">
        <button
          onClick={() => setShowNotif(!showNotif)}
          className={cn(
            "w-8 h-8 rounded-lg border flex items-center justify-center",
            "border-[#1e1e3a] text-[#7070a0] transition-all",
            "hover:border-violet-500/50 hover:text-violet-400 text-sm",
            showNotif && "border-violet-500 text-violet-400"
          )}
        >
          🔔
        </button>

        {/* Dot de notificación */}
        {stats.totalRated > 0 && (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-pink-500 rounded-full" />
        )}

        {/* Dropdown */}
        {showNotif && (
          <div className={cn(
            "absolute right-0 top-10 w-64",
            "bg-[#0d0d22] border border-[#1e1e3a] rounded-xl",
            "shadow-xl shadow-black/50 p-3 z-50"
          )}>
            <p className="text-xs font-semibold text-[#f1f0ff] mb-2">
              Notificaciones
            </p>
            {stats.totalRated === 0 ? (
              <p className="text-xs text-[#3a3a5c] text-center py-4">
                Sin notificaciones aún
              </p>
            ) : (
              <div className="text-xs text-[#7070a0] py-2">
                🎬 Has calificado {stats.totalRated} película{stats.totalRated > 1 ? "s" : ""}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Avatar */}
      <button
        onClick={() => router.push(ROUTES.PROFILE)}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-violet-600 to-pink-500",
          "text-white text-xs font-bold border-2 border-violet-500/30",
          "hover:border-violet-400 transition-colors flex-shrink-0"
        )}
      >
        J
      </button>

    </header>
  );
}