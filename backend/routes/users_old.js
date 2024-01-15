const express = require("express");
const requestTimeStamp = require("../middlewares/request_timestamp");
const router = express.Router();

router.use((req, res, next) => {
  // Authenticatie
  const isVerified = true;

  if (isVerified) {
    next();
  } else {
    res.sendStatus(401);
  }
});

// Middleware om uw request object aan te passen
router.use(requestTimeStamp.requestTimeMiddleware);

/* GET users listing. */
// "GET - /users/"
router.get("/", function (req, res) {
  // Gesimuleerd uit DB - komt na een query uit de DB
  const users = ["David", "Tom", "John"];

  console.log(req.web3);

  res.status(200).json(users);
});

// GET - /users/12 OF /users/34
router.get("/:id([0-9]+)", (req, res) => {
  // const id = req.params.id;
  const {
    params: { id },
  } = req;

  console.log(req.web3);

  res.send(`User met ${id} staat hier.`);
});

// POST - "/users/"
router.post(
  "/",
  (req, res, next) => {
    console.log("Middleware voor de post request!.");
    next();
  },
  (req, res) => {
    console.log(req.body);
    console.log(req.web3);

    res.sendStatus(201);
  }
);

// /users/profile
router.get("/profile", (request, response) => {
  console.log(request.query);

  const language = request.query.lang;

  if (language === "nl") {
    response
      .status(500)
      .send("<html><head></head><body><h1>Profiel</h1></body></html>");
  } else {
    response
      .status(500)
      .send("<html><head></head><body><h1>Profile (ENG)</h1></body></html>");
  }
});

router.get("/ip", (req, res) => {
  res.send(`IP ADRES: ${req.ip}`);
});

router.all("*", (req, res) => {
  res.status(404).send("Ik ben een fallback route");
});

module.exports = router;
