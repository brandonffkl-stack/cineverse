"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn }                     from "@/lib/utils/cn";
import ProgressBar                from "@/components/atoms/ProgressBar";
import Avatar                     from "@/components/atoms/Avatar";
import { useUserStore }           from "@/store/useUserStore";
import { useUIStore }             from "@/store/useUIStore";
import { getLevelIndex, getLevelProgress, LEVELS } from "@/features/gamification/constants/levels";
import { ROUTES }                 from "@/lib/constants/routes";

// ── Items de navegación ──────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",  href: ROUTES.DASHBOARD, icon: "⊞" },
  { label: "Descubrir",  href: ROUTES.DISCOVER,  icon: "◎" },
  { label: "Rankings",   href: ROUTES.RANKINGS,  icon: "◈" },
  { label: "CineLab",    href: "/analytics",       icon: "📊" },
];

const NAV_PERSONAL = [
  { label: "Mi Perfil",  href: ROUTES.PROFILE,   icon: "◉" },
  { label: "Cinebot",    href: ROUTES.MASCOT,     icon: "◍" },
  { label: "Historial",  href: ROUTES.HISTORY,    icon: "◷" },
  { label: "Favoritos",  href: ROUTES.FAVORITES,  icon: "◇" },
];

export default function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  const sidebarOpen   = useUIStore((s) => s.sidebarOpen);
  const getStats      = useUserStore((s) => s.getStats);
  const stats         = getStats();

  const levelIdx  = getLevelIndex(stats.totalRated);
  const level     = LEVELS[levelIdx];
  const progress  = getLevelProgress(stats.totalRated);
  const nextLevel = LEVELS[levelIdx + 1];

  return (
    <aside suppressHydrationWarning className={cn(
      "fixed left-0 top-0 bottom-0 z-40",
      "bg-[#08081a] border-r border-[#1e1e3a]",
      "flex flex-col transition-all duration-300",
      sidebarOpen ? "w-[220px]" : "w-0 overflow-hidden"
    )}>

      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1e1e3a]">
        <div className="font-display text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          ⬡ CineVerse
        </div>
        <div className="text-[9px] text-[#3a3a5c] tracking-[2px] uppercase mt-0.5">
          Film Intelligence
        </div>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-1">
          <p className="text-[9px] text-[#3a3a5c] tracking-[2px] uppercase mb-2">
            Principal
          </p>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={pathname === item.href}
              onClick={() => router.push(item.href)}
            />
          ))}
        </div>

        <div className="px-4 mt-4">
          <p className="text-[9px] text-[#3a3a5c] tracking-[2px] uppercase mb-2">
            Personal
          </p>
          {NAV_PERSONAL.map((item) => {
            // Badge con conteo
            let badge: number | null = null;
            if (item.href === ROUTES.HISTORY)   badge = stats.totalRated;
            if (item.href === ROUTES.FAVORITES)  badge = stats.totalFavorites;

            return (
              <NavItem
                key={item.href}
                item={item}
                active={pathname === item.href}
                onClick={() => router.push(item.href)}
                badge={badge ?? undefined}
              />
            );
          })}
        </div>
      </nav>

      {/* XP Bar */}
      <div className="px-4 py-3 border-t border-[#1e1e3a]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-semibold text-[#f1f0ff]">
            {level.emoji} {level.name}
          </span>
          <span className="text-[10px] text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded-full">
            Lv.{levelIdx + 1}
          </span>
        </div>
        <ProgressBar value={progress} color="violet" size="sm" />
        <p className="text-[10px] text-[#3a3a5c] mt-1">
          {nextLevel
            ? `${stats.totalRated} / ${nextLevel.minRatings} para subir`
            : "¡Nivel máximo! 🏆"}
        </p>
      </div>

      {/* Avatar de usuario */}
      <div className="px-4 py-3 border-t border-[#1e1e3a] flex items-center gap-3">
        <Avatar name="Juan José" size="sm" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-[#f1f0ff] truncate">
            Juan José
          </div>
          <div className="text-[10px] text-[#3a3a5c]">
            {stats.totalXP} XP total
          </div>
        </div>
      </div>

    </aside>
  );
}

// ── NavItem interno ───────────────────────────────────────────────
function NavItem({
  item,
  active,
  onClick,
  badge,
}: {
  item:    { label: string; href: string; icon: string };
  active:  boolean;
  onClick: () => void;
  badge?:  number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5",
        "text-sm font-medium transition-all duration-150 text-left",
        "relative group",
        active
          ? "bg-violet-500/10 text-violet-300"
          : "text-[#7070a0] hover:bg-white/5 hover:text-[#f1f0ff]"
      )}
    >
      {/* Indicador activo */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-violet-500 to-pink-500 rounded-r" />
      )}

      <span className="text-base w-5 text-center">{item.icon}</span>
      <span className="flex-1">{item.label}</span>

      {badge !== undefined && badge > 0 && (
        <span className="text-[10px] font-bold bg-violet-500 text-white px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}