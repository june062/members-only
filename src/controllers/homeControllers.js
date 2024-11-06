const queries = require("../models/queries");

async function homePageGet(req, res, next) {
  try {
    const messages = await queries.getMessages();
    res.render("homePageView", { messages: [] });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  homePageGet,
};
