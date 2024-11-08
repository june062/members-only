const queries = require("../models/queries");
const validationMiddleware = [];

async function homePageGet(req, res, next) {
  try {
    const messages = await queries.getMessages();
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
module.exports = {
  homePageGet,
  logoutGet,
  newMessagePost,
};
