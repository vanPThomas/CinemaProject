const { body } = require("express-validator");

const registerValidator = [
  (req, res, next) => {
    console.log("Validation middleware is executing");
    next();
  },
  body("email")
    .notEmpty()
    .withMessage("Email mag niet leeg zijn.")
    .normalizeEmail()
    .isEmail()
    .withMessage("Geen geldig emailadres"),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Minstens 8 karakters"),
];

module.exports = registerValidator;
