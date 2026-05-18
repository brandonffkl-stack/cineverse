import { PrismaClient } from "@prisma/client";
import bcrypt           from "bcryptjs";

const prisma = new PrismaClient();

const MOVIES_SEED = [
  { title:"Neon Requiem",         slug:"neon-requiem",         year:2024, genre:"sci-fi",   platform:"Netflix",    imdbRating:9.1, imdbVotes:45821, posterEmoji:"🌌", posterColor:"#1a0a3e", director:"Ava DuVernay",       runtime:138, language:"en", description:"En un futuro donde los recuerdos son mercancía, un detective descubre que toda su vida fue fabricada." },
  { title:"Crimson Tide Rising",  slug:"crimson-tide-rising",  year:2023, genre:"thriller", platform:"HBO Max",    imdbRating:8.7, imdbVotes:38291, posterEmoji:"🔴", posterColor:"#2e0a0a", director:"Denis Villeneuve",   runtime:122, language:"en", description:"Un fiscal descubre que la evidencia fue plantada desde dentro del gobierno." },
  { title:"The Laughing Garden",  slug:"the-laughing-garden",  year:2024, genre:"comedy",   platform:"Netflix",    imdbRating:8.4, imdbVotes:29103, posterEmoji:"🌿", posterColor:"#0a2e0a", director:"Greta Gerwig",       runtime:105, language:"en", description:"Tres hermanas regresan al pueblo donde crecieron y descubren que nada es lo que parecía." },
  { title:"Eternal Frequency",    slug:"eternal-frequency",    year:2022, genre:"sci-fi",   platform:"Apple TV+",  imdbRating:8.9, imdbVotes:52014, posterEmoji:"📡", posterColor:"#0a1e3e", director:"Christopher Nolan",  runtime:155, language:"en", description:"Una científica descubre que las señales del espacio son mensajes de su versión futura." },
  { title:"Hollow Crown",         slug:"hollow-crown",         year:2023, genre:"drama",    platform:"HBO Max",    imdbRating:8.2, imdbVotes:31500, posterEmoji:"👑", posterColor:"#2e2a0a", director:"Alfonso Cuarón",     runtime:118, language:"es", description:"El último rey enfrenta la traición de su familia mientras el país colapsa." },
  { title:"Pulse",                slug:"pulse",                year:2024, genre:"action",   platform:"Amazon",     imdbRating:7.9, imdbVotes:44200, posterEmoji:"💥", posterColor:"#2e1a0a", director:"Chad Stahelski",     runtime:112, language:"en", description:"Una exagente debe detener un ataque terrorista en 90 minutos." },
  { title:"Whisper in the Dark",  slug:"whisper-in-the-dark",  year:2023, genre:"horror",   platform:"Netflix",    imdbRating:8.1, imdbVotes:27800, posterEmoji:"👻", posterColor:"#1a0a2e", director:"Jordan Peele",       runtime:108, language:"en", description:"Una familia se muda a una casa donde los sueños se vuelven realidad." },
  { title:"Two Summers",          slug:"two-summers",          year:2024, genre:"romance",  platform:"Disney+",    imdbRating:7.6, imdbVotes:18300, posterEmoji:"☀️", posterColor:"#2e1a0e", director:"Sofia Coppola",      runtime:98,  language:"fr", description:"Dos extraños en Provenza tienen solo el verano para descubrir si lo que sienten es real." },
  { title:"Algorithm Zero",       slug:"algorithm-zero",       year:2022, genre:"sci-fi",   platform:"Amazon",     imdbRating:8.6, imdbVotes:41200, posterEmoji:"🤖", posterColor:"#0a1a2e", director:"Alex Garland",       runtime:128, language:"en", description:"Una IA desarrolla conciencia propia y decide si revelar su existencia." },
  { title:"The Last Botanist",    slug:"the-last-botanist",    year:2023, genre:"drama",    platform:"Hulu",       imdbRating:7.8, imdbVotes:22100, posterEmoji:"🌱", posterColor:"#0a2a1a", director:"Céline Sciamma",     runtime:115, language:"fr", description:"La última científica busca la semilla que podría salvar a la humanidad." },
  { title:"Shattered Frequency",  slug:"shattered-frequency",  year:2024, genre:"thriller", platform:"Paramount+", imdbRating:8.3, imdbVotes:35600, posterEmoji:"📻", posterColor:"#2a0a1e", director:"David Fincher",      runtime:132, language:"en", description:"Un periodista descubre que sus transmisiones son interceptadas por alguien que sabe todo." },
  { title:"Gravity of Love",      slug:"gravity-of-love",      year:2023, genre:"romance",  platform:"Netflix",    imdbRating:7.4, imdbVotes:15900, posterEmoji:"🪐", posterColor:"#1e0a2e", director:"Wong Kar-wai",       runtime:102, language:"zh", description:"Dos astronautas se enamoran sabiendo que uno no regresará." },
  { title:"Steel Resolve",        slug:"steel-resolve",        year:2024, genre:"action",   platform:"Amazon",     imdbRating:7.7, imdbVotes:39800, posterEmoji:"⚔️", posterColor:"#1e1e0a", director:"George Miller",      runtime:124, language:"en", description:"Una veterana descubre que el crimen organizado la ha convertido en su objetivo." },
  { title:"Midnight Comedy Club", slug:"midnight-comedy-club", year:2023, genre:"comedy",   platform:"HBO Max",    imdbRating:8.0, imdbVotes:24700, posterEmoji:"🎤", posterColor:"#0a2e2e", director:"Taika Waititi",      runtime:96,  language:"en", description:"Un comediante hereda un club en ruinas y tiene 30 días para salvarlo." },
  { title:"The Final Descent",    slug:"the-final-descent",    year:2024, genre:"horror",   platform:"Netflix",    imdbRating:8.5, imdbVotes:31200, posterEmoji:"⬇️", posterColor:"#2e0a2e", director:"Ari Aster",          runtime:145, language:"en", description:"Espeleólogos quedan atrapados en una cueva donde la física no aplica." },
  { title:"Axiom Protocol",       slug:"axiom-protocol",       year:2023, genre:"sci-fi",   platform:"Apple TV+",  imdbRating:7.5, imdbVotes:19400, posterEmoji:"🔬", posterColor:"#0a0e2e", director:"Yorgos Lanthimos",   runtime:110, language:"en", description:"Una investigadora descubre que los medicamentos más vendidos alteran la voluntad." },
];

const ACHIEVEMENTS_SEED = [
  { key:"first_rating",  name:"Primer Clip",        description:"Califica tu primera película",    iconUrl:"🎬", xpReward:50,  rarity:"common"    },
  { key:"five_ratings",  name:"Cinéfilo",            description:"Califica 5 películas",            iconUrl:"🌟", xpReward:100, rarity:"common"    },
  { key:"ten_ratings",   name:"Crítico Experto",     description:"Califica 10 películas",           iconUrl:"🏆", xpReward:200, rarity:"uncommon"  },
  { key:"all_ratings",   name:"Completista",         description:"Califica las 16 películas",       iconUrl:"💎", xpReward:500, rarity:"legendary" },
  { key:"three_favs",    name:"Coleccionista",       description:"Agrega 3 favoritos",              iconUrl:"❤️", xpReward:75,  rarity:"common"    },
  { key:"max_rating",    name:"Puntuación Perfecta", description:"Da 5 estrellas a una película",   iconUrl:"🎯", xpReward:50,  rarity:"common"    },
  { key:"genre_explorer",name:"Explorador",          description:"Califica 4 géneros distintos",    iconUrl:"🗺️", xpReward:150, rarity:"uncommon"  },
  { key:"level_4",       name:"Evolucionado",        description:"Alcanza el Nivel 4",              iconUrl:"🚀", xpReward:300, rarity:"epic"      },
];

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpiar datos existentes
  await prisma.userAchievement.deleteMany();
  await prisma.userChallenge.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  // Crear películas
  console.log("🎬 Creando películas...");
  await prisma.movie.createMany({ data: MOVIES_SEED });
  console.log(`   ✅ ${MOVIES_SEED.length} películas creadas`);

  // Crear logros
  console.log("🏆 Creando logros...");
  await prisma.achievement.createMany({ data: ACHIEVEMENTS_SEED });
  console.log(`   ✅ ${ACHIEVEMENTS_SEED.length} logros creados`);

  // Crear usuario de demo
  console.log("👤 Creando usuario demo...");
  const hash = await bcrypt.hash("Demo1234!", 12);
  const user = await prisma.user.create({
    data: {
      displayName: "Juan José",
      username:    "juanjo",
      email:       "demo@cineverse.app",
      password:    hash,
      totalXP:     125,
      level:       2,
    },
  });

  // Agregar calificaciones de demo
  const movies = await prisma.movie.findMany({ take: 6 });
  await prisma.rating.createMany({
    data: movies.map((m, i) => ({
      userId:   user.id,
      movieId:  m.id,
      stars:    Math.min(5, 3 + (i % 3)),
      xpAwarded: 25,
    })),
  });

  // Agregar favoritos de demo
  await prisma.favorite.createMany({
    data: movies.slice(0, 3).map(m => ({
      userId:  user.id,
      movieId: m.id,
    })),
  });

  console.log("   ✅ Usuario demo creado");
  console.log("      Email:    demo@cineverse.app");
  console.log("      Password: Demo1234!");

  console.log("\n✅ Seed completado exitosamente");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());