const queries = require("../models/queries");
const authenticationMiddleware = require("../config/authenticationMiddleware");
const validationMiddleware = [];

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
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.end("You are not authorized to create a message");
    }
  },
  validationMiddleware,
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
