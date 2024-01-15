const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/controller");
const registerValidator = require("../validators/registerValidator");

router.use(express.json());

// GET "/users/"
router.get("/", UsersController.readAll);

router.post("/createuser", registerValidator, UsersController.create);

router.post("/authenticate", UsersController.authenticateUser);

module.exports = router;
