const queries = require("../models/queries");

async function homePageGet(req, res, next) {
  try {
    const messages = await queries.getMessages();
    res.render("homePageView", { messages: [], user: req.user });
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

module.exports = {
  homePageGet,
  logoutGet,
};
