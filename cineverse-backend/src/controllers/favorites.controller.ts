import type { Response }    from "express";
import { FavoritesService } from "../services/ratings.service";
import { ok }               from "../utils/response";
import type { AuthRequest } from "../middlewares/auth.middleware";

const svc = new FavoritesService();

export async function getAll(req: AuthRequest, res: Response) {
  const data = await svc.findByUser(req.userId!);
  return ok(res, data);
}

export async function toggle(req: AuthRequest, res: Response) {
  const { movieId } = req.body;
  const data = await svc.toggle(req.userId!, movieId);
  return ok(res, data);
}

export async function remove(req: AuthRequest, res: Response) {
  await svc.remove(req.userId!, req.params.movieId);
  return ok(res, { removed: true });
}