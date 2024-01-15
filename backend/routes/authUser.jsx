const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/controller");

router.post("/authenticate", UsersController.authenticateUser);

module.exports = router;
