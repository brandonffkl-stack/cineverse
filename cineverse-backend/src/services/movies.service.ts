import { prisma } from "../config/database";

interface FindAllParams {
  genre?:    string;
  platform?: string;
  sortBy?:   string;
  page:      number;
  limit:     number;
}

export class MoviesService {

  async findAll({ genre, platform, sortBy, page, limit }: FindAllParams) {
    const where: any = {};
    if (genre    && genre    !== "all") where.genre    = genre;
    if (platform && platform !== "all") where.platform = platform;

    const orderBy: any =
      sortBy === "year"  ? { releaseYear:  "desc" } :
      sortBy === "votes" ? { imdbVotes:    "desc" } :
                           { imdbRating:   "desc" };

    const [items, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy,
        skip:  (page - 1) * limit,
        take:  limit,
      }),
      prisma.movie.count({ where }),
    ]);

    return { items, total };
  }

  async findTrending() {
    return prisma.movie.findMany({
      orderBy: { imdbRating: "desc" },
      take:    8,
    });
  }

  async findById(id: string) {
    return prisma.movie.findUnique({ where: { id } });
  }

  async findRecommendations(userId: string) {
    // Géneros más calificados por el usuario
    const ratings = await prisma.rating.findMany({
      where:   { userId },
      include: { movie: { select: { genre: true } } },
      orderBy: { stars: "desc" },
      take:    10,
    });

    // Reducir a géneros favoritos
    const genreCount = ratings.reduce((acc: Record<string, number>, r) => {
      const g = r.movie.genre;
      acc[g] = (acc[g] ?? 0) + 1;
      return acc;
    }, {});

    const topGenres = Object.entries(genreCount)
      .sort(([,a],[,b]) => b - a)
      .slice(0, 3)
      .map(([g]) => g);

    // IDs ya calificadas
    const ratedIds = ratings.map(r => r.movieId);

    // Películas similares no calificadas
    return prisma.movie.findMany({
      where: {
        genre: { in: topGenres.length ? topGenres : undefined },
        id:    { notIn: ratedIds },
      },
      orderBy: { imdbRating: "desc" },
      take:    8,
    });
  }

  async search(query: string) {
    return prisma.movie.findMany({
      where: {
        OR: [
          { title:    { contains: query, mode: "insensitive" } },
          { genre:    { contains: query, mode: "insensitive" } },
          { platform: { contains: query, mode: "insensitive" } },
          { director: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });
  }
}