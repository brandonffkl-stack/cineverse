"use client";

import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { cn }                  from "@/lib/utils/cn";

// ── Películas flotantes en el hero ───────────────────────────────
const FLOATING_CARDS = [
  { emoji:"🌌", color:"#1a0a3e", title:"Neon Requiem",        rating:"9.1", x:"-left-4",  y:"top-8",    rotate:"-rotate-6",  delay:"0s"    },
  { emoji:"📡", color:"#0a1e3e", title:"Eternal Frequency",   rating:"8.9", x:"left-20",  y:"top-32",   rotate:"rotate-3",   delay:"0.5s"  },
  { emoji:"🔴", color:"#2e0a0a", title:"Crimson Tide",        rating:"8.7", x:"left-4",   y:"bottom-20",rotate:"-rotate-3",  delay:"1s"    },
  { emoji:"🤖", color:"#0a1a2e", title:"Algorithm Zero",      rating:"8.6", x:"right-20", y:"top-20",   rotate:"rotate-6",   delay:"0.3s"  },
  { emoji:"👑", color:"#2e2a0a", title:"Hollow Crown",        rating:"8.2", x:"right-4",  y:"bottom-32",rotate:"-rotate-4",  delay:"0.8s"  },
  { emoji:"👻", color:"#1a0a2e", title:"Whisper in the Dark", rating:"8.1", x:"right-16", y:"bottom-8", rotate:"rotate-2",   delay:"1.2s"  },
];

const STATS = [
  { value:"15K+",  label:"Títulos analizados" },
  { value:"10",    label:"Plataformas"         },
  { value:"24",    label:"Países"              },
  { value:"99%",   label:"Satisfacción"        },
];

const FEATURES = [
  { icon:"🎬", title:"Catálogo masivo",       desc:"Más de 15,000 títulos de las plataformas más grandes del mundo, actualizados y clasificados."  },
  { icon:"📊", title:"CineLab Analytics",     desc:"Visualizaciones avanzadas con filter, map y reduce sobre datos reales de streaming."             },
  { icon:"🤖", title:"Cinebot IA",            desc:"Tu mascota cinematográfica que evoluciona contigo mientras calificas y exploras el catálogo."    },
  { icon:"⭐", title:"Sistema de XP",         desc:"Gana experiencia, desbloquea logros y sube de nivel con cada película que calificas."            },
  { icon:"🔍", title:"Búsqueda inteligente",  desc:"Filtra por género, plataforma, año y rating con resultados en tiempo real."                      },
  { icon:"🏆", title:"Rankings globales",     desc:"Descubre las mejores películas ordenadas por rating IMDB, votos y tendencias actuales."          },
];

export default function LandingPage() {
  const router  = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#04040e] text-[#f1f0ff] overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#04040e]/80 backdrop-blur-xl border-b border-[#1e1e3a]/50">
        <div className="font-display text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          ⬡ CineVerse
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/auth/login")}
            className="px-4 py-2 text-sm font-medium text-[#7070a0] hover:text-[#f1f0ff] transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Comenzar gratis
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* Fondo con gradiente */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-[#04040e] to-[#04040e]" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background:"radial-gradient(circle, #7c3aed, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background:"radial-gradient(circle, #ec4899, transparent 70%)" }}
          />
        </div>

        {/* Tarjetas flotantes */}
        {mounted && FLOATING_CARDS.map((card, i) => (
          <div
            key={i}
            className={cn(
              "absolute hidden lg:flex flex-col items-center",
              "bg-[#0d0d22]/80 backdrop-blur border border-[#1e1e3a]",
              "rounded-2xl p-3 w-28 gap-2",
              "animate-[float_3s_ease-in-out_infinite]",
              card.x, card.y, card.rotate
            )}
            style={{ animationDelay: card.delay }}
          >
            <div
              className="w-full h-16 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: card.color }}
            >
              {card.emoji}
            </div>
            <p className="text-[10px] font-semibold text-[#f1f0ff] truncate w-full text-center">
              {card.title}
            </p>
            <span className="text-[9px] text-amber-400 font-mono font-bold">
              ⭐ {card.rating}
            </span>
          </div>
        ))}

        {/* Contenido central */}
        <div className="relative text-center px-6 max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            Film Intelligence Platform · v2.0
          </div>

          {/* Título */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="bg-gradient-to-r from-[#f1f0ff] via-violet-200 to-[#f1f0ff] bg-clip-text text-transparent">
              Tu universo
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              cinematográfico
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-lg text-[#7070a0] leading-relaxed mb-8 max-w-2xl mx-auto">
            Explora más de{" "}
            <span className="text-violet-400 font-semibold">15,000 títulos</span>,
            califica películas, evoluciona tu mascota IA y descubre insights
            cinematográficos únicos con nuestro motor de análisis de datos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.push("/auth/register")}
              className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-base rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-violet-900/40"
            >
              Comenzar gratis
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="px-8 py-4 bg-transparent border border-[#1e1e3a] hover:border-violet-500/50 text-[#f1f0ff] font-semibold text-base rounded-xl transition-all hover:bg-violet-500/5"
            >
              Ya tengo cuenta
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-black text-violet-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#3a3a5c] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-violet-500 to-transparent" />
          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </div>
      </section>

      {/* ── Preview del dashboard ── */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#1e1e3a] shadow-2xl shadow-violet-900/20">
            {/* Barra de browser */}
            <div className="bg-[#0d0d22] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e3a]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 bg-[#12122e] rounded-md px-3 py-1 text-[10px] text-[#3a3a5c] font-mono">
                localhost:3000/dashboard
              </div>
            </div>
            {/* Screenshot del dashboard */}
            <div className="bg-[#0d0d22] p-6 min-h-[300px] flex items-center justify-center">
              <div className="w-full grid grid-cols-4 gap-3">
                {[
                  { icon:"🎬", val:"247",   lbl:"Calificadas", color:"#7c3aed" },
                  { icon:"⭐", val:"4.2",   lbl:"Rating prom.", color:"#f59e0b" },
                  { icon:"❤️", val:"89",    lbl:"Favoritos",    color:"#10b981" },
                  { icon:"⚡", val:"6,175", lbl:"XP Total",     color:"#06b6d4" },
                ].map((s) => (
                  <div key={s.lbl} className="bg-[#12122e] border border-[#1e1e3a] rounded-xl p-4">
                    <div className="text-xl mb-2">{s.icon}</div>
                    <div className="font-display text-2xl font-bold" style={{ color: s.color }}>
                      {s.val}
                    </div>
                    <div className="text-[10px] text-[#3a3a5c] mt-1">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-[#3a3a5c] mt-4">
            Dashboard en tiempo real con datos de tu actividad
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-black text-[#f1f0ff] mb-3">
              Todo lo que necesitas
            </h2>
            <p className="text-[#7070a0] text-base max-w-xl mx-auto">
              Una plataforma completa de análisis, calificación y
              descubrimiento cinematográfico.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-6 hover:border-violet-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display text-lg font-bold text-[#f1f0ff] mb-2 group-hover:text-violet-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-[#7070a0] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background:"radial-gradient(ellipse at center, #7c3aed22, transparent 70%)" }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🎬</div>
          <h2 className="font-display text-5xl font-black text-[#f1f0ff] mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-[#7070a0] text-base mb-8">
            Únete a la plataforma de análisis cinematográfico más completa.
            Gratis para siempre.
          </p>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-10 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-violet-900/40"
          >
            Crear cuenta gratis →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e1e3a] py-8 px-6 text-center">
        <p className="font-display text-lg font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
          ⬡ CineVerse
        </p>
        <p className="text-xs text-[#3a3a5c]">
          Juan José & Brandon · Fundamentos de Programación · 2026
        </p>
      </footer>

    </div>
  );
}