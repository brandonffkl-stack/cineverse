"use client";

import MascotPanel      from "@/components/organisms/MascotPanel";
import ProgressBar      from "@/components/atoms/ProgressBar";
import StatCard         from "@/components/molecules/StatCard";
import { useUserStore } from "@/store/useUserStore";
import { LEVELS, getLevelIndex } from "@/features/gamification/constants/levels";
import { CHALLENGES }   from "@/features/gamification/constants/challenges";
import { ACHIEVEMENTS } from "@/features/gamification/constants/achievements";
import { buildCheckParams } from "@/features/gamification/utils/xpCalculator";

export default function MascotPage() {
  const getStats = useUserStore((s) => s.getStats);
  const stats    = getStats();
  const levelIdx = getLevelIndex(stats.totalRated);
  const params   = buildCheckParams(stats);

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-[#f1f0ff] mb-1">
          Cinebot
        </h1>
        <p className="text-sm text-[#7070a0]">
          Tu asistente cinematográfico personal. Califica películas para hacerlo evolucionar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Panel izquierdo — Mascota */}
        <div className="lg:col-span-1 space-y-4">
          <MascotPanel />

          {/* Retos activos */}
          <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
            <h3 className="font-display text-lg font-bold text-[#f1f0ff] mb-4">
              ⚡ Retos activos
            </h3>
            <div className="space-y-3">
              {CHALLENGES.map((ch) => {
                const current   = ch.getProgress(params);
                const completed = current >= ch.goal;
                const pct       = Math.min(100, Math.round((current / ch.goal) * 100));

                return (
                  <div
                    key={ch.id}
                    className={`rounded-xl p-3 border transition-all ${
                      completed
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-[#12122e] border-[#1e1e3a]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                        completed ? "bg-emerald-500/20" : "bg-violet-500/10"
                      }`}>
                        {ch.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-xs font-semibold ${
                            completed ? "text-emerald-400" : "text-[#f1f0ff]"
                          }`}>
                            {ch.title}
                          </p>
                          {completed ? (
                            <span className="text-emerald-400 text-xs font-bold flex-shrink-0">
                              ✓ Completado
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              +{ch.xpReward} XP
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#7070a0] mt-0.5 mb-2">
                          {ch.subtitle}
                        </p>
                        <ProgressBar
                          value={pct}
                          color={completed ? "green" : "violet"}
                          size="sm"
                        />
                        <p className="text-[9px] text-[#3a3a5c] mt-1">
                          {current} / {ch.goal}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="lg:col-span-2 space-y-6">

          {/* Evolución */}
          <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
            <h3 className="font-display text-lg font-bold text-[#f1f0ff] mb-4">
              🚀 Evolución de Cinebot
            </h3>
            <div className="space-y-2">
              {LEVELS.map((lv, i) => {
                const isPast    = i < levelIdx;
                const isCurrent = i === levelIdx;
                const isFuture  = i > levelIdx;

                return (
                  <div
                    key={lv.name}
                    className={`flex items-center gap-4 rounded-xl p-4 border transition-all ${
                      isCurrent
                        ? "bg-violet-500/08 border-violet-500/40"
                        : isPast
                        ? "bg-[#0d0d22] border-[#1e1e3a] opacity-70"
                        : "bg-[#0a0a18] border-[#1e1e3a] opacity-35"
                    }`}
                    style={isCurrent ? {
                      background: `${lv.color}10`,
                      borderColor: `${lv.color}40`,
                    } : {}}
                  >
                    {/* Círculo nivel */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: isPast || isCurrent ? `${lv.color}22` : "rgba(30,30,58,0.5)"
                      }}
                    >
                      {lv.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-[#f1f0ff]">
                          {lv.name}
                        </p>
                        {isCurrent && (
                          <span
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${lv.color}22`, color: lv.color }}
                          >
                            ACTUAL
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[9px] text-emerald-400 font-bold">
                            ✓ Superado
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7070a0] mt-0.5">
                        Nivel {i + 1} · {lv.minRatings}+ calificaciones
                      </p>
                      {/* Perks */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {lv.perks.map((perk) => (
                          <span
                            key={perk}
                            className="text-[9px] px-1.5 py-0.5 rounded border"
                            style={{
                              background: `${lv.color}10`,
                              borderColor: `${lv.color}25`,
                              color: lv.color,
                            }}
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requisito */}
                    <div className="text-right flex-shrink-0">
                      {isPast ? (
                        <span className="text-emerald-400 text-lg">✅</span>
                      ) : isCurrent ? (
                        <div>
                          <p className="font-display font-bold text-lg"
                             style={{ color: lv.color }}>
                            {stats.totalRated}
                          </p>
                          <p className="text-[9px] text-[#3a3a5c]">califs.</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-display font-bold text-lg text-[#3a3a5c]">
                            {lv.minRatings}
                          </p>
                          <p className="text-[9px] text-[#3a3a5c]">necesitas</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estadísticas del bot */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon="🎬" value={stats.totalRated}     label="Películas calificadas" color="violet" />
            <StatCard icon="⭐" value={stats.avgRating || "—"} label="Tu rating promedio"  color="gold"   />
            <StatCard icon="🎭" value={stats.genresExplored} label="Géneros explorados"    color="green"  />
            <StatCard icon="❤️" value={stats.totalFavorites} label="Favoritos guardados"   color="cyan"   />
          </div>

        </div>
      </div>
    </div>
  );
}