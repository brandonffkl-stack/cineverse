import { Router }     from "express";
import * as UsersCtrl from "../../controllers/users.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authLimiter }  from "../../middlewares/rateLimit.middleware";

const router = Router();

// Auth
router.post("/register", authLimiter, UsersCtrl.register);
router.post("/login",    authLimiter, UsersCtrl.login);
router.post("/refresh",              UsersCtrl.refresh);

// Perfil
router.get("/me",        authenticate, UsersCtrl.getMe);
router.patch("/me",      authenticate, UsersCtrl.updateMe);
router.get("/me/stats",  authenticate, UsersCtrl.getMyStats);
router.get("/:username",              UsersCtrl.getPublicProfile);

export default router;