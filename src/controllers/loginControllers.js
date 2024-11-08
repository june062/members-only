const queries = require("../models/queries");
const crypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validationMiddleware = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("You must enter a username")
    .isLength({ min: 1, max: 255 })
    .withMessage("Your username must be between 1 and 30 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("You must enter a password")
    .isLength({ min: 1, max: 255 })
    .withMessage("Your password must be between 1 and 30 characters"),
];
function loginPageGet(req, res, next) {
  try {
    res.render("loginPageView");
  } catch (error) {
    next(error);
  }
}

const loginPost = [
  validationMiddleware,

  (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.locals.errorMessages = errors.array();
        res.status(400).render("loginPageView");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  loginPageGet,
  loginPost,
};
