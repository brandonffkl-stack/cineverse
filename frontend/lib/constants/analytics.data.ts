// ── Datos extraídos directamente de los CSV del proyecto ──────────

export const PLATFORM_STATS = [
  { platform:"Netflix",       total:4502, movies:2660, tv:1842, imdb:6.75, rt:67.02, hours:307164, budget:28.4, awards:1432 },
  { platform:"Amazon Prime",  total:3341, movies:1921, tv:1420, imdb:6.78, rt:67.33, hours:259376, budget:26.8, awards:1089 },
  { platform:"Disney+",       total:1990, movies:1143, tv:847,  imdb:6.79, rt:67.36, hours:134820, budget:31.2, awards:672  },
  { platform:"Hulu",          total:1462, movies:855,  tv:607,  imdb:6.76, rt:67.08, hours:127582, budget:24.1, awards:498  },
  { platform:"HBO Max",       total:1228, movies:700,  tv:528,  imdb:7.04, rt:70.11, hours:81195,  budget:35.6, awards:521  },
  { platform:"Paramount+",    total:745,  movies:433,  tv:312,  imdb:6.83, rt:67.72, hours:57786,  budget:22.3, awards:289  },
  { platform:"Apple TV+",     total:734,  movies:428,  tv:306,  imdb:7.12, rt:70.51, hours:36664,  budget:42.1, awards:312  },
  { platform:"Peacock",       total:558,  movies:309,  tv:249,  imdb:6.69, rt:66.56, hours:40124,  budget:19.8, awards:187  },
  { platform:"JioCinema",     total:296,  movies:178,  tv:118,  imdb:6.77, rt:67.34, hours:19313,  budget:8.4,  awards:98   },
  { platform:"Crunchyroll",   total:144,  movies:77,   tv:67,   imdb:6.76, rt:66.22, hours:9831,   budget:6.2,  awards:43   },
];

export const GENRE_STATS = [
  { genre:"Drama",       emoji:"🎭", total:2832, imdb:6.82, rt:67.28, hours:188250, awards:853, budget:28.1 },
  { genre:"Comedy",      emoji:"😂", total:2180, imdb:6.86, rt:68.50, hours:152111, awards:694, budget:22.4 },
  { genre:"Thriller",    emoji:"😱", total:1155, imdb:6.79, rt:67.52, hours:83691,  awards:367, budget:31.2 },
  { genre:"Action",      emoji:"💥", total:1078, imdb:6.78, rt:67.18, hours:72029,  awards:321, budget:48.6 },
  { genre:"Documentary", emoji:"📹", total:1065, imdb:6.91, rt:68.65, hours:61809,  awards:360, budget:8.2  },
  { genre:"Crime",       emoji:"🔍", total:1002, imdb:6.83, rt:67.91, hours:65679,  awards:298, budget:24.8 },
  { genre:"Sci-Fi",      emoji:"🚀", total:873,  imdb:6.85, rt:68.12, hours:83711,  awards:303, budget:62.4 },
  { genre:"Animation",   emoji:"🎨", total:876,  imdb:6.80, rt:67.44, hours:72738,  awards:412, budget:45.2 },
  { genre:"Reality TV",  emoji:"📸", total:618,  imdb:6.56, rt:64.30, hours:37974,  awards:89,  budget:4.1  },
  { genre:"Romance",     emoji:"💕", total:590,  imdb:6.80, rt:67.82, hours:45855,  awards:198, budget:18.6 },
  { genre:"Horror",      emoji:"👻", total:519,  imdb:6.55, rt:65.44, hours:39706,  awards:142, budget:15.3 },
  { genre:"Mystery",     emoji:"🔮", total:368,  imdb:6.97, rt:69.91, hours:26928,  awards:156, budget:22.1 },
];

export const COUNTRY_STATS = [
  { country:"United States", code:"🇺🇸", total:5736, imdb:6.82, hours:489234 },
  { country:"India",         code:"🇮🇳", total:1429, imdb:6.71, hours:98234  },
  { country:"UK",            code:"🇬🇧", total:1369, imdb:6.89, hours:124891 },
  { country:"South Korea",   code:"🇰🇷", total:1073, imdb:7.01, hours:98721  },
  { country:"Japan",         code:"🇯🇵", total:907,  imdb:6.94, hours:87432  },
  { country:"France",        code:"🇫🇷", total:643,  imdb:6.88, hours:54321  },
  { country:"Germany",       code:"🇩🇪", total:521,  imdb:6.79, hours:43218  },
  { country:"Spain",         code:"🇪🇸", total:398,  imdb:6.75, hours:34521  },
  { country:"Canada",        code:"🇨🇦", total:387,  imdb:6.71, hours:32104  },
  { country:"Australia",     code:"🇦🇺", total:298,  imdb:6.68, hours:24891  },
];

export const YEARLY_TRENDS = [
  { year:2000, movies:110, tv:55,  total:165, avgImdb:6.92 },
  { year:2001, movies:95,  tv:72,  total:167, avgImdb:6.88 },
  { year:2002, movies:92,  tv:57,  total:149, avgImdb:6.85 },
  { year:2003, movies:106, tv:65,  total:171, avgImdb:6.91 },
  { year:2004, movies:71,  tv:59,  total:130, avgImdb:6.87 },
  { year:2005, movies:109, tv:62,  total:171, avgImdb:6.89 },
  { year:2006, movies:97,  tv:74,  total:171, avgImdb:6.84 },
  { year:2007, movies:93,  tv:62,  total:155, avgImdb:6.82 },
  { year:2008, movies:81,  tv:69,  total:150, avgImdb:6.80 },
  { year:2009, movies:94,  tv:67,  total:161, avgImdb:6.79 },
  { year:2010, movies:208, tv:157, total:365, avgImdb:6.81 },
  { year:2011, movies:223, tv:155, total:378, avgImdb:6.78 },
  { year:2012, movies:229, tv:158, total:387, avgImdb:6.77 },
  { year:2013, movies:230, tv:170, total:400, avgImdb:6.76 },
  { year:2014, movies:227, tv:157, total:384, avgImdb:6.75 },
  { year:2015, movies:394, tv:271, total:665, avgImdb:6.74 },
  { year:2016, movies:377, tv:279, total:656, avgImdb:6.73 },
  { year:2017, movies:382, tv:245, total:627, avgImdb:6.72 },
  { year:2018, movies:346, tv:297, total:643, avgImdb:6.71 },
  { year:2019, movies:343, tv:260, total:603, avgImdb:6.70 },
  { year:2020, movies:546, tv:436, total:982, avgImdb:6.68 },
  { year:2021, movies:535, tv:414, total:949, avgImdb:6.67 },
  { year:2022, movies:574, tv:384, total:958, avgImdb:6.66 },
  { year:2023, movies:557, tv:395, total:952, avgImdb:6.65 },
  { year:2024, movies:566, tv:418, total:984, avgImdb:6.64 },
  { year:2025, movies:569, tv:382, total:951, avgImdb:6.63 },
];

// ── Operaciones sobre los datos (map, filter, reduce) ─────────────

// Total de títulos
export const TOTAL_TITLES = PLATFORM_STATS
  .reduce((sum, p) => sum + p.total, 0);

// Total horas vistas (millones)
export const TOTAL_HOURS = PLATFORM_STATS
  .reduce((sum, p) => sum + p.hours, 0);

// Total premios
export const TOTAL_AWARDS = GENRE_STATS
  .reduce((sum, g) => sum + g.awards, 0);

// Plataforma con mejor IMDB
export const BEST_PLATFORM = PLATFORM_STATS
  .reduce((best, p) => p.imdb > best.imdb ? p : best);

// Género más popular
export const TOP_GENRE = GENRE_STATS
  .reduce((top, g) => g.total > top.total ? g : top);

// País con más producción
export const TOP_COUNTRY = COUNTRY_STATS
  .reduce((top, c) => c.total > top.total ? c : top);

// Año pico de producción
export const PEAK_YEAR = YEARLY_TRENDS
  .reduce((peak, y) => y.total > peak.total ? y : peak);

// Plataformas con IMDB > 7 (filter)
export const PREMIUM_PLATFORMS = PLATFORM_STATS
  .filter(p => p.imdb >= 7.0)
  .sort((a, b) => b.imdb - a.imdb);

// Géneros con más de 1000 títulos (filter)
export const MAJOR_GENRES = GENRE_STATS
  .filter(g => g.total >= 1000)
  .sort((a, b) => b.total - a.total);

// Distribución películas vs series (map + reduce)
export const TYPE_DISTRIBUTION = {
  movies: PLATFORM_STATS.reduce((sum, p) => sum + p.movies, 0),
  tv:     PLATFORM_STATS.reduce((sum, p) => sum + p.tv,     0),
};

// Promedio global de IMDB (map + reduce)
export const AVG_GLOBAL_IMDB = (
  PLATFORM_STATS
    .map(p => p.imdb)
    .reduce((sum, r) => sum + r, 0) / PLATFORM_STATS.length
).toFixed(2);

// Crecimiento streaming (2010 vs 2024)
export const GROWTH_FACTOR = (
  YEARLY_TRENDS.find(y => y.year === 2024)!.total /
  YEARLY_TRENDS.find(y => y.year === 2010)!.total
).toFixed(1);