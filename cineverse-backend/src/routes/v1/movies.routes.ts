import { Router }          from "express";
import * as MoviesCtrl     from "../../controllers/movies.controller";
import { optionalAuth }    from "../../middlewares/auth.middleware";

const router = Router();

router.get("/",             optionalAuth, MoviesCtrl.getAll);
router.get("/trending",     MoviesCtrl.getTrending);
router.get("/recommendations", optionalAuth, MoviesCtrl.getRecommendations);
router.get("/:id",          optionalAuth, MoviesCtrl.getById);

export default router;