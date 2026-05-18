import { prisma }  from "../config/database";
import bcrypt      from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { ENV }     from "../config/environment";
import { AppError } from "../utils/errors";

interface RegisterParams {
  displayName: string;
  username:    string;
  email:       string;
  password:    string;
}

export class UsersService {

  private generateTokens(userId: string, email: string) {
    const accessToken = jwt.sign(
      { userId, email },
      ENV.JWT_SECRET as Secret,
      { expiresIn: ENV.JWT_EXPIRES_IN } as any
    );
    const refreshToken = jwt.sign(
      { userId, email },
      ENV.JWT_REFRESH_SECRET as Secret,
      { expiresIn: "7d" } as any
    );
    return { accessToken, refreshToken };
  }

  async register({ displayName, username, email, password }: RegisterParams) {
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (exists) throw new AppError("Email o username ya en uso", 409, "DUPLICATE");

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { displayName, username, email, password: hash },
      select: { id: true, displayName: true, username: true, email: true },
    });

    const tokens = this.generateTokens(user.id, user.email);
    return { user, ...tokens };
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    const tokens = this.generateTokens(user.id, user.email);
    return {
      user: {
        id:          user.id,
        displayName: user.displayName,
        username:    user.username,
        email:       user.email,
        totalXP:     user.totalXP,
        level:       user.level,
      },
      ...tokens,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, ENV.JWT_REFRESH_SECRET) as {
        userId: string;
        email:  string;
      };
      return this.generateTokens(payload.userId, payload.email);
    } catch {
      return null;
    }
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where:  { id },
      select: {
        id: true, displayName: true, username: true,
        email: true, avatarUrl: true, bio: true,
        totalXP: true, level: true, createdAt: true,
      },
    });
  }

  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where:  { username },
      select: {
        id: true, displayName: true, username: true,
        avatarUrl: true, totalXP: true, level: true,
        _count: { select: { ratings: true, favorites: true } },
      },
    });
  }

  async update(id: string, data: { displayName?: string; bio?: string }) {
    return prisma.user.update({
      where:  { id },
      data,
      select: { id: true, displayName: true, bio: true },
    });
  }

  async getStats(userId: string) {
    const [ratings, favorites] = await Promise.all([
      prisma.rating.findMany({
        where:   { userId },
        include: { movie: { select: { genre: true } } },
      }),
      prisma.favorite.count({ where: { userId } }),
    ]);

    const totalRated  = ratings.length;
    const avgRating   = totalRated
      ? ratings.reduce((s, r) => s + r.stars, 0) / totalRated
      : 0;

    const genreMap = ratings.reduce((acc: Record<string, number>, r) => {
      const g = r.movie.genre;
      acc[g] = (acc[g] ?? 0) + 1;
      return acc;
    }, {});

    const topGenre = Object.entries(genreMap)
      .sort(([,a],[,b]) => b - a)[0]?.[0] ?? "—";

    return {
      totalRated,
      totalFavorites: favorites,
      avgRating:      Math.round(avgRating * 10) / 10,
      topGenre,
      genreMap,
    };
  }
}