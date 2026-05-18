import { Router } from "express";
import moviesRouter       from "./movies.routes";
import ratingsRouter      from "./ratings.routes";
import usersRouter        from "./users.routes";
import favoritesRouter    from "./favorites.routes";
import gamificationRouter from "./gamification.routes";
import searchRouter       from "./search.routes";

const router = Router();

router.use("/movies",        moviesRouter);
router.use("/ratings",       ratingsRouter);
router.use("/users",         usersRouter);
router.use("/favorites",     favoritesRouter);
router.use("/gamification",  gamificationRouter);
router.use("/search",        searchRouter);

// Info de la API
router.get("/", (_, res) => {
  res.json({
    success: true,
    data: {
      name:      "CineVerse API",
      version:   "v1",
      endpoints: [
        "GET    /api/v1/movies",
        "GET    /api/v1/movies/trending",
        "GET    /api/v1/movies/:id",
        "POST   /api/v1/ratings",
        "GET    /api/v1/ratings/user/:id",
        "POST   /api/v1/favorites",
        "DELETE /api/v1/favorites/:movieId",
        "GET    /api/v1/users/me",
        "PATCH  /api/v1/users/me",
        "GET    /api/v1/gamification/xp",
        "GET    /api/v1/gamification/achievements",
        "GET    /api/v1/search?q=",
      ],
    },
  });
});

export default router;