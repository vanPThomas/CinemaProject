const prisma = require("../config/db/prisma");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const UsersController = {
  readAll: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          email: "desc",
        },
        include: {
          courses: {
            orderBy: {
              name: "asc",
            },
          },
        },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = req.body;
      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const user = await prisma.user.create({
        data: {
          email: newUser.email,
          password: hashedPassword,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json(error);
    }
  },

  readAllMovies: async (req, res) => {
    try {
      const movies = await prisma.film.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createMovie: async (req, res) => {
    try {
      const newMovie = req.body;
      const movie = await prisma.film.create({
        data: {
          title: newMovie.title,
          year: newMovie.year,
          cast: newMovie.cast,
          genre: newMovie.genre,
          description: newMovie.description,
          poster: newMovie.poster,
        },
      });

      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getMovieByTitle: async (req, res) => {
    try {
      const { title } = req.params;
      console.log(title);
      const movie = await prisma.film.findFirst({
        where: {
          title,
        },
      });
      console.log(movie);

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  readAllMovieTickets: async (req, res) => {
    try {
      const movieTickets = await prisma.movieTicket.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.json(movieTickets);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createMovieTicket: async (req, res) => {
    try {
      const newMovieTicket = req.body;

      console.log("Received Movie Ticket Data:", newMovieTicket);

      const movieTicket = await prisma.movieTicket.create({
        data: {
          filmId: newMovieTicket.filmId,
          clientEmail: newMovieTicket.clientEmail,
          ticketTime: newMovieTicket.ticketTime,
        },
      });

      console.log("Created Movie Ticket:", movieTicket);

      res.status(201).json(movieTicket);
    } catch (error) {
      console.error("Error creating movie ticket:", error);
      res.status(500).json({ error: "Failed to create ticket" });
    }
  },

  authenticateUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json({ message: "Authentication successful!" });
      } else {
        res
          .status(401)
          .json({ message: "Authentication failed. Incorrect password." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = UsersController;
