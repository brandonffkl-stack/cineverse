"use client";

import { useState, useMemo } from "react";
import { GENRE_STATS, PLATFORM_STATS, COUNTRY_STATS } from "@/lib/constants/analytics.data";
import { MOVIES_DATA } from "@/lib/constants/movies.data";

type QueryType = "top_movies" | "by_genre" | "by_platform" | "by_country";
type SortField = "imdbRating" | "votes" | "year";

export default function QueryExplorer() {
  const [queryType,  setQueryType]  = useState<QueryType>("top_movies");
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterPlat,  setFilterPlat]  = useState("all");
  const [sortField,  setSortField]  = useState<SortField>("imdbRating");
  const [limit,      setLimit]      = useState(5);

  // ── Consulta dinámica con filter + sort + slice ───────────────
  const results = useMemo(() => {
    let data = [...MOVIES_DATA];

    // filter por género
    if (filterGenre !== "all") {
      data = data.filter(m => m.genre === filterGenre);
    }

    // filter por plataforma
    if (filterPlat !== "all") {
      data = data.filter(m => m.platform === filterPlat);
    }

    // sort
    data.sort((a, b) => {
      if (sortField === "imdbRating") return b.imdbRating - a.imdbRating;
      if (sortField === "votes")      return b.votes      - a.votes;
      if (sortField === "year")       return b.year       - a.year;
      return 0;
    });

    return data.slice(0, limit);
  }, [filterGenre, filterPlat, sortField, limit]);

  // Código que se genera dinámicamente
  const pseudoCode = `// Consulta generada en tiempo real
const results = MOVIES_DATA
  ${filterGenre !== "all" ? `.filter(m => m.genre === "${filterGenre}")` : "// sin filtro de género"}
  ${filterPlat  !== "all" ? `.filter(m => m.platform === "${filterPlat}")` : "// sin filtro de plataforma"}
  .sort((a, b) => b.${sortField} - a.${sortField})
  .slice(0, ${limit});

// Resultado: ${results.length} película${results.length !== 1 ? "s" : ""}`;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
        <p className="text-xs text-violet-400 font-bold uppercase tracking-widest mb-1">
          🔍 Query Explorer interactivo
        </p>
        <p className="text-sm text-[#f1f0ff]">
          Construye consultas en tiempo real sobre el dataset.
          Usa <span className="text-violet-400 font-mono">filter</span>,{" "}
          <span className="text-amber-400 font-mono">sort</span> y{" "}
          <span className="text-pink-400 font-mono">slice</span> combinados.
        </p>
      </div>

      {/* Controles */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest mb-4">
          Parámetros de consulta
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          {/* Género */}
          <div>
            <label className="text-[10px] text-[#3a3a5c] font-bold uppercase block mb-1">
              filter género
            </label>
            <select
              value={filterGenre}
              onChange={e => setFilterGenre(e.target.value)}
              className="w-full bg-[#12122e] border border-[#1e1e3a] rounded-lg px-3 py-2 text-xs text-[#f1f0ff] outline-none focus:border-violet-500/50"
            >
              <option value="all">Todos</option>
              {[...new Set(MOVIES_DATA.map(m => m.genre))].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Plataforma */}
          <div>
            <label className="text-[10px] text-[#3a3a5c] font-bold uppercase block mb-1">
              filter plataforma
            </label>
            <select
              value={filterPlat}
              onChange={e => setFilterPlat(e.target.value)}
              className="w-full bg-[#12122e] border border-[#1e1e3a] rounded-lg px-3 py-2 text-xs text-[#f1f0ff] outline-none focus:border-violet-500/50"
            >
              <option value="all">Todas</option>
              {[...new Set(MOVIES_DATA.map(m => m.platform))].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-[10px] text-[#3a3a5c] font-bold uppercase block mb-1">
              sort por
            </label>
            <select
              value={sortField}
              onChange={e => setSortField(e.target.value as SortField)}
              className="w-full bg-[#12122e] border border-[#1e1e3a] rounded-lg px-3 py-2 text-xs text-[#f1f0ff] outline-none focus:border-violet-500/50"
            >
              <option value="imdbRating">IMDB Rating</option>
              <option value="votes">Votos</option>
              <option value="year">Año</option>
            </select>
          </div>

          {/* Limit */}
          <div>
            <label className="text-[10px] text-[#3a3a5c] font-bold uppercase block mb-1">
              slice limit
            </label>
            <select
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
              className="w-full bg-[#12122e] border border-[#1e1e3a] rounded-lg px-3 py-2 text-xs text-[#f1f0ff] outline-none focus:border-violet-500/50"
            >
              {[3, 5, 8, 10, 16].map(n => (
                <option key={n} value={n}>Top {n}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Pseudo código generado */}
      <div className="bg-[#07071a] border border-violet-500/20 rounded-2xl p-5">
        <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mb-3">
          Código generado
        </p>
        <pre className="text-xs font-mono text-[#a09ccc] leading-relaxed whitespace-pre-wrap">
          {pseudoCode}
        </pre>
      </div>

      {/* Resultados */}
      <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e1e3a] flex items-center justify-between">
          <p className="text-xs font-bold text-[#7070a0] uppercase tracking-widest">
            Resultados
          </p>
          <span className="text-xs text-violet-400 font-bold">
            {results.length} registros
          </span>
        </div>

        {results.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#3a3a5c] text-sm">
              No hay resultados para esa combinación de filtros
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e1e3a]">
                  {["#","Título","Plataforma","Género","IMDB","Votos","Año"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[#3a3a5c] font-bold uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-b border-[#1e1e3a]/50 hover:bg-violet-500/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-[#3a3a5c] font-mono">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded flex items-center justify-center text-sm flex-shrink-0"
                          style={{ background: m.posterColor }}
                        >
                          {m.posterEmoji}
                        </span>
                        <span className="font-semibold text-[#f1f0ff] truncate max-w-[140px]">
                          {m.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#7070a0]">{m.platform}</td>
                    <td className="px-4 py-3 text-[#7070a0]">{m.genre}</td>
                    <td className="px-4 py-3 font-mono text-amber-400 font-bold">{m.imdbRating}</td>
                    <td className="px-4 py-3 font-mono text-[#7070a0]">{m.votes.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-[#7070a0]">{m.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}