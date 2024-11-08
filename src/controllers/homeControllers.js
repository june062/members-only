const queries = require("../models/queries");
const authenticationMiddleware = require("../config/authenticationMiddleware");
const { body, validationResult } = require("express-validator");
const validationMiddleware = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("You must enter a title")
    .isLength({ min: 1, max: 30 })
    .withMessage("Your title can only be between 1 and 30 characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("You must enter a message")
    .isLength({ min: 1, max: 255 })
    .withMessage("Your title can only be between 1 and 255 characters"),
];

async function homePageGet(req, res, next) {
  try {
    let messages = await queries.getAnonymousMessages();

    if (req.user) {
      res.locals.member = req.user.member;
      res.locals.admin = req.user.admin;
    }

    if (res.locals.member || res.locals.admin) {
      messages = await queries.getMessagesNotAnonymous();
    }

    res.locals.user = req.user;
    res.locals.messages = messages;
    res.render("homePageView");
  } catch (error) {
    next(error);
  }
}
function logoutGet(req, res, next) {
  req.logout(() => {
    try {
      res.redirect("/");
      res.end();
    } catch (error) {
      next(error);
    }
  });
}
const newMessagePost = [
  authenticationMiddleware.isLoggedIn,
  validationMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.locals.errorMessages = errors.array();
        console.log(errors.array());
        res.status(400).render("createMessagePageView");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  async (req, res, next) => {
    try {
      await queries.createMessage(
        req.body.title,
        req.body.message,
        new Date(),
        req.user.id
      );
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

const deleteMessage = [
  authenticationMiddleware.isLoggedIn,
  authenticationMiddleware.isAdmin,
  async (req, res, next) => {
    try {
      await queries.deleteMessage(req.params.messageID);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];
module.exports = {
  homePageGet,
  logoutGet,
  newMessagePost,
  deleteMessage,
};
