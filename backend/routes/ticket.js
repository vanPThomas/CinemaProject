const express = require("express");
const router = express.Router();

const MovieTicketsController = require("../controllers/controller");

// GET "/movie-tickets/"
router.get("/", MovieTicketsController.readAllMovieTickets);

// POST "/movie-tickets/"
router.post("/", MovieTicketsController.createMovieTicket);

module.exports = router;
