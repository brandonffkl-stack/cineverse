import { Router }            from "express";
import * as GamificationCtrl from "../../controllers/gamification.controller";
import { authenticate }      from "../../middlewares/auth.middleware";

const router = Router();

router.get("/xp",           authenticate, GamificationCtrl.getXP);
router.get("/achievements", authenticate, GamificationCtrl.getAchievements);
router.get("/challenges",   authenticate, GamificationCtrl.getChallenges);
router.get("/leaderboard",               GamificationCtrl.getLeaderboard);

export default router;