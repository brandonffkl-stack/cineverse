import { Router }         from "express";
import * as FavoritesCtrl from "../../controllers/favorites.controller";
import { authenticate }   from "../../middlewares/auth.middleware";

const router = Router();

router.get("/",           authenticate, FavoritesCtrl.getAll);
router.post("/",          authenticate, FavoritesCtrl.toggle);
router.delete("/:movieId",authenticate, FavoritesCtrl.remove);

export default router;