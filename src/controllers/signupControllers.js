const queries = require("../models/queries");
const { body, validationResult } = require("express-validator");
const crypt = require("bcryptjs");

const validationMiddleware = [];

async function signupViewGet(req, res, next) {
  try {
    res.render("signupPageView");
  } catch (error) {
    next(error);
  }
}
const signupPost = [
  validationMiddleware,

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
