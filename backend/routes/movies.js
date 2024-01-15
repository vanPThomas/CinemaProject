const express = require("express");
const router = express.Router();

const MoviesController = require("../controllers/controller");

// GET "/movies/"
router.get("/", MoviesController.readAllMovies);

router.get("/:title", MoviesController.getMovieByTitle); // New route to get a movie by title

// POST "/movies/"
router.post("/", MoviesController.createMovie);

module.exports = router;
