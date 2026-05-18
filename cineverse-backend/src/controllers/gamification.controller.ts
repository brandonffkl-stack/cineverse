import type { Response }       from "express";
import { GamificationService } from "../services/gamification.service";
import { ok }                  from "../utils/response";
import type { AuthRequest }    from "../middlewares/auth.middleware";

const svc = new GamificationService();

export async function getXP(req: AuthRequest, res: Response) {
  const data = await svc.getXPState(req.userId!);
  return ok(res, data);
}

export async function getAchievements(req: AuthRequest, res: Response) {
  const data = await svc.getAchievements(req.userId!);
  return ok(res, data);
}

export async function getChallenges(req: AuthRequest, res: Response) {
  const data = await svc.getChallenges(req.userId!);
  return ok(res, data);
}

export async function getLeaderboard(_: AuthRequest, res: Response) {
  const data = await svc.getLeaderboard();
  return ok(res, data);
}