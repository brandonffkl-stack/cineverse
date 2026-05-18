import { prisma } from "../config/database";

interface UpsertRatingParams {
  userId:   string;
  movieId:  string;
  stars:    number;
  review?:  string;
}

export class RatingsService {

  async upsert({ userId, movieId, stars, review }: UpsertRatingParams) {
    return prisma.rating.upsert({
      where:  { userId_movieId: { userId, movieId } },
      update: { stars, review, updatedAt: new Date() },
      create: { userId, movieId, stars, review, xpAwarded: 25 },
    });
  }

  async findByUser(userId: string) {
    return prisma.rating.findMany({
      where:   { userId },
      include: { movie: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByMovie(movieId: string) {
    return prisma.rating.findMany({
      where:   { movieId },
      include: { user: { select: { displayName: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(userId: string, movieId: string) {
    return prisma.rating.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  }
}

export class FavoritesService {

  async findByUser(userId: string) {
    return prisma.favorite.findMany({
      where:   { userId },
      include: { movie: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async toggle(userId: string, movieId: string) {
    const existing = await prisma.favorite.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });
    if (existing) {
      await prisma.favorite.delete({
        where: { userId_movieId: { userId, movieId } },
      });
      return { action: "removed", movieId };
    }
    await prisma.favorite.create({ data: { userId, movieId } });
    return { action: "added", movieId };
  }

  async remove(userId: string, movieId: string) {
    return prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  }
}