"use client";

import { useMemo }        from "react";
import { cn }             from "@/lib/utils/cn";
import ProgressBar        from "@/components/atoms/ProgressBar";
import { useUserStore }   from "@/store/useUserStore";
import { getLevelIndex, getLevelProgress, LEVELS } from "@/features/gamification/constants/levels";

function getBotSVG(levelIdx: number): string {
  const colors = ["#7070a0", "#10b981", "#3b82f6", "#a855f7", "#f59e0b"];
  const c = colors[levelIdx] ?? "#7070a0";

  const accessories = [
    "",
    `<circle cx="70" cy="35" r="7" fill="${c}" opacity=".4"/>`,
    `<path d="M45 30 Q70 20 95 30 L92 38 Q70 28 48 38Z" fill="${c}"/>
     <rect x="60" y="18" width="20" height="12" rx="2" fill="${c}"/>`,
    `<polygon points="70,12 50,34 90,34" fill="${c}"/>
     <rect x="58" y="34" width="24" height="5" rx="2" fill="${c}" opacity=".7"/>`,
    `<circle cx="70" cy="22" r="14" fill="none" stroke="${c}" stroke-width="2.5"/>
     <polygon points="70,11 73,19 82,19 75,24 78,32 70,27 62,32 65,24 58,19 67,19" fill="${c}"/>`,
  ];

  return `
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${c}" stop-opacity=".12"/>
        <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle cx="70" cy="70" r="62" fill="url(#bg)"/>
    ${accessories[levelIdx] ?? ""}
    <rect x="36" y="52" width="68" height="55" rx="12" fill="#0d0d22"
          stroke="${c}" stroke-width="2" filter="url(#glow)"/>
    <rect x="44" y="60" width="52" height="32" rx="6" fill="#04040e"/>
    <circle cx="55" cy="76" r="9" fill="${c}" opacity=".9"/>
    <circle cx="85" cy="76" r="9" fill="${c}" opacity=".9"/>
    <circle cx="57" cy="75" r="4" fill="white"/>
    <circle cx="87" cy="75" r="4" fill="white"/>
    <circle cx="59" cy="74" r="2" fill="#04040e"/>
    <circle cx="89" cy="74" r="2" fill="#04040e"/>
    ${levelIdx >= 2
      ? `<path d="M58 90 Q70 98 82 90" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : `<path d="M60 92 Q70 88 80 92" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`
    }
    <rect x="58" y="107" width="24" height="8" rx="4" fill="${c}" opacity=".3"/>
    <rect x="44" y="105" width="9" height="12" rx="4" fill="#0d0d22" stroke="${c}" stroke-width="1.5"/>
    <rect x="87" y="105" width="9" height="12" rx="4" fill="#0d0d22" stroke="${c}" stroke-width="1.5"/>
    <rect x="62" y="115" width="16" height="16" rx="4" fill="#0d0d22" stroke="${c}" stroke-width="1.5"/>
  `;
}

export default function MascotPanel() {
  const getStats  = useUserStore((s) => s.getStats);
  const stats     = getStats();

  const levelIdx  = getLevelIndex(stats.totalRated);
  const level     = LEVELS[levelIdx];
  const nextLevel = LEVELS[levelIdx + 1];
  const progress  = getLevelProgress(stats.totalRated);
  const botSVG    = useMemo(() => getBotSVG(levelIdx), [levelIdx]);

  return (
    <div className={cn(
      "bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-6",
      "text-center relative overflow-hidden"
    )}>
      {/* Glow de fondo */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${level.color}18, transparent 70%)`
        }}
      />

      {/* SVG del bot */}
      <svg
        viewBox="0 0 140 140"
        className="w-36 h-36 mx-auto mb-4 animate-[float_3s_ease-in-out_infinite]"
        style={{
          filter: `drop-shadow(0 8px 20px ${level.color}44)`
        }}
        dangerouslySetInnerHTML={{ __html: botSVG }}
      />

      {/* Nombre y nivel */}
      <h3 className="font-display text-xl font-bold text-[#f1f0ff] mb-0.5">
        Cinebot
      </h3>
      <p className="text-xs text-[#7070a0] mb-4">
        Nivel {levelIdx + 1} — {level.name} {level.emoji}
      </p>

      {/* XP Bar */}
      <ProgressBar value={progress} color="violet" size="md" className="mb-2" />
      <p className="text-[10px] text-[#3a3a5c] mb-5">
        {nextLevel
          ? `${stats.totalRated} / ${nextLevel.minRatings} calificaciones`
          : "¡Nivel máximo alcanzado! 🏆"}
      </p>

      {/* Speech bubble */}
      <div className={cn(
        "bg-[#12122e] border border-[#1e1e3a] rounded-xl p-3",
        "text-xs text-[#a09ccc] leading-relaxed italic text-left",
        "relative"
      )}>
        <span className="not-italic absolute -top-2 left-3 text-base">💬</span>
        {level.speech}
      </div>
    </div>
  );
}