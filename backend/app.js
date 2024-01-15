// Dotenv
require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Lokale modules om routing mogelijk te maken
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const ipLoggerMiddleware = require("./middlewares/ip_logger");

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(ipLoggerMiddleware);

// Koppeling tussen het pad en de router
app.use("/", indexRouter);
app.use("/users", usersRouter);

const moviesRoutes = require("./routes/movies");
app.use("/movies", moviesRoutes);

// Include movie ticket routes
const movieTicketsRoutes = require("./routes/ticket");
app.use("/movie-tickets", movieTicketsRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Fallback vanuit de APP.js");
});

module.exports = app;
