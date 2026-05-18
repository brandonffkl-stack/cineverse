import type { Response }    from "express";
import { RatingsService }   from "../services/ratings.service";
import { ok, created, badRequest } from "../utils/response";
import type { AuthRequest } from "../middlewares/auth.middleware";
import { z }                from "zod";

const svc = new RatingsService();

const ratingSchema = z.object({
  movieId: z.string().min(1),
  stars:   z.number().int().min(1).max(5),
  review:  z.string().max(500).optional(),
});

export async function create(req: AuthRequest, res: Response) {
  try {
    const ratingData = ratingSchema.parse(req.body);
    const data = await svc.upsert({
      userId: req.userId!,
      movieId: ratingData.movieId,
      stars: ratingData.stars,
      review: ratingData.review,
    });
    return created(res, data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return badRequest(res, "Datos inválidos", error.errors);
    }
    throw error;
  }
}

export async function getUserRatings(req: AuthRequest, res: Response) {
  const data = await svc.findByUser(req.params.userId);
  return ok(res, data);
}

export async function getMovieRatings(req: AuthRequest, res: Response) {
  const data = await svc.findByMovie(req.params.movieId);
  return ok(res, data);
}

export async function remove(req: AuthRequest, res: Response) {
  await svc.delete(req.userId!, req.params.movieId);
  return ok(res, { deleted: true });
}