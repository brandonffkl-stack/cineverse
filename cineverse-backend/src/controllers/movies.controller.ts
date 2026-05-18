import type { Request, Response } from "express";
import { MoviesService }   from "../services/movies.service";
import { ok, notFound }    from "../utils/response";
import type { AuthRequest } from "../middlewares/auth.middleware";

const svc = new MoviesService();

export async function getAll(req: Request, res: Response) {
  const { genre, platform, sortBy, page = "1", limit = "20" } = req.query;
  const data = await svc.findAll({
    genre:    genre    as string,
    platform: platform as string,
    sortBy:   sortBy   as string,
    page:     Number(page),
    limit:    Number(limit),
  });
  return ok(res, data.items, { total: data.total, page: Number(page) });
}

export async function getTrending(_: Request, res: Response) {
  const data = await svc.findTrending();
  return ok(res, data);
}

export async function getById(req: Request, res: Response) {
  const movie = await svc.findById(req.params.id);
  if (!movie) return notFound(res, "Película no encontrada");
  return ok(res, movie);
}

export async function getRecommendations(req: AuthRequest, res: Response) {
  const data = await svc.findRecommendations(req.userId ?? "");
  return ok(res, data);
}

export async function search(req: Request, res: Response) {
  const { q = "" } = req.query;
  const data = await svc.search(String(q));
  return ok(res, data);
}