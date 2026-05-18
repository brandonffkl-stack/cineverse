import { PrismaClient } from "@prisma/client";
import fs               from "fs";
import path             from "path";
import csv              from "csv-parser";
import dotenv           from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

// ── Ajusta esta ruta al lugar donde tengas el CSV ─────────────────
const CSV_PATH = path.resolve(
  "C:/cineverse/frontend/lib/constants/streaming_catalog.csv"
);

// ── Utilidades ───────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

function parseFloat2(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : Math.round(n * 100) / 100;
}

function parseInt2(val: string): number {
  const n = parseInt(val);
  return isNaN(n) ? 0 : n;
}

function getPosterEmoji(genre: string): string {
  const map: Record<string, string> = {
    drama:       "🎭", comedy:      "😂", thriller:    "😱",
    action:      "💥", documentary: "📹", crime:       "🔍",
    "sci-fi":    "🚀", animation:   "🎨", horror:      "👻",
    romance:     "💕", mystery:     "🔮", fantasy:     "🧙",
    "reality tv":"📸", adventure:   "🗺️", biography:   "📖",
  };
  return map[genre?.toLowerCase()] ?? "🎬";
}

function getPosterColor(platform: string): string {
  const map: Record<string, string> = {
    netflix:      "#1a0014", "amazon prime": "#0a1a2e",
    "disney+":    "#0a0a2e", "hbo max":      "#1a0a2e",
    hulu:         "#0a1a0a", "apple tv+":    "#1a1a1a",
    "paramount+": "#0a0e2e", peacock:        "#0a1e0a",
    jiocinema:    "#2e1a0a", crunchyroll:    "#2e0a0a",
  };
  return map[platform?.toLowerCase()] ?? "#0d0d22";
}

// ── Leer y procesar el CSV ───────────────────────────────────────
interface RawRow {
  show_id:              string;
  title:                string;
  type:                 string;
  platform:             string;
  primary_genre:        string;
  genres:               string;
  director:             string;
  cast:                 string;
  country:              string;
  language:             string;
  release_year:         string;
  date_added:           string;
  rating:               string;
  duration:             string;
  duration_minutes:     string;
  num_seasons:          string;
  num_episodes:         string;
  imdb_rating:          string;
  rotten_tomatoes_score:string;
  imdb_votes:           string;
  budget_million_usd:   string;
  production_company:   string;
  awards_won:           string;
  hours_watched_million:string;
  description:          string;
}

async function importCSV() {
  console.log("🎬 Iniciando importación del CSV...");
  console.log(`📁 Ruta: ${CSV_PATH}`);

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ No se encontró el archivo: ${CSV_PATH}`);
    console.log("\n💡 Ajusta CSV_PATH en el script con la ruta correcta.");
    process.exit(1);
  }

  const rows: RawRow[] = [];

  // Leer CSV
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row: RawRow) => rows.push(row))
      .on("end",  resolve)
      .on("error", reject);
  });

  console.log(`📊 Filas leídas del CSV: ${rows.length}`);

  // Limpiar movies existentes
  console.log("🗑️  Limpiando películas anteriores...");
  await prisma.favorite.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.movie.deleteMany();

  // Procesar en batches de 500 para no sobrecargar
  const BATCH = 500;
  let total   = 0;
  const slugSet = new Set<string>();

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);

    const movies = batch
      .filter(r => r.title?.trim())       // filtrar filas vacías
      .map(r => {
        // Slug único
        let slug = slugify(r.title);
        let counter = 1;
        while (slugSet.has(slug)) {
          slug = `${slugify(r.title)}-${counter++}`;
        }
        slugSet.add(slug);

        return {
          title:       r.title?.trim()          ?? "Sin título",
          slug,
          year:        parseInt2(r.release_year),
          genre:       r.primary_genre?.toLowerCase()?.trim() ?? "drama",
          platform:    r.platform?.trim()        ?? "Netflix",
          imdbRating:  parseFloat2(r.imdb_rating),
          imdbVotes:   parseInt2(r.imdb_votes),
          posterEmoji: getPosterEmoji(r.primary_genre),
          posterColor: getPosterColor(r.platform),
          description: r.description?.trim()     ?? "Sin descripción disponible.",
          director:    r.director?.trim()        || null,
          runtime:     parseInt2(r.duration_minutes) || null,
          language:    r.language?.trim()?.toLowerCase() ?? "en",
        };
      });

    await prisma.movie.createMany({
      data:           movies,
      skipDuplicates: true,
    });

    total += movies.length;
    const pct = Math.round((total / rows.length) * 100);
    process.stdout.write(`\r⏳ Progreso: ${total} / ${rows.length} (${pct}%)`);
  }

  console.log(`\n\n✅ Importación completada`);
  console.log(`   📽  Películas importadas: ${total}`);

  // Verificar
  const count = await prisma.movie.count();
  console.log(`   🗄️  Total en base de datos: ${count}`);
  console.log(`\n🎉 ¡Listo! Ya puedes usar los ${count} títulos en la API.`);
}

importCSV()
  .catch(err => {
    console.error("\n❌ Error durante la importación:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());