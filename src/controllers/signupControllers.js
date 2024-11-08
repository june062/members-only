const queries = require("../models/queries");
const { body, validationResult } = require("express-validator");
const crypt = require("bcryptjs");

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

async function signupViewGet(req, res, next) {
  try {
    res.render("signupPageView");
  } catch (error) {
    next(error);
  }
}
const signupPost = [
  validationMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.locals.errorMessages = errors.array();
        res.status(400).render("signupPageView");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },

  function (req, res, next) {
    crypt.hash(req.body.password, 12, async (err, hash) => {
      try {
        const password = hash;
        await queries.addUser(
          req.body.username,
          password,
          req.body.member,
          req.body.admin
        );
        res.redirect("/");
      } catch (error) {
        next(err);
      }
    });
  },
];
module.exports = {
  signupViewGet,
  signupPost,
};
