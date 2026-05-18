import { Router }       from "express";
import * as RatingsCtrl from "../../controllers/ratings.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/",           authenticate, RatingsCtrl.create);
router.get("/user/:userId",authenticate, RatingsCtrl.getUserRatings);
router.get("/movie/:movieId",            RatingsCtrl.getMovieRatings);
router.delete("/:movieId", authenticate, RatingsCtrl.remove);

export default router;