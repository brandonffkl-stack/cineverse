import { Router }      from "express";
import * as SearchCtrl from "../../controllers/movies.controller";

const router = Router();

router.get("/", SearchCtrl.search);

export default router;