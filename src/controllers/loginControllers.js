const queries = require("../models/queries");
const crypt = require("bcryptjs");

const validationMiddleware = [];
function loginPageGet(req, res, next) {
  try {
    res.render("loginPageView");
  } catch (error) {
    next(error);
  }
}

const loginPost = [
  validationMiddleware,
  async function (req, res, next) {
    const storedPassword = await queries.retrievePassword(req.body.username);
    if (!storedPassword.password) {
      res.send("Wrong username");
    }
    crypt.compare(
      req.body.password,
      storedPassword.password,
      async (err, result) => {
        try {
          res.redirect("/");
        } catch (err) {
          next(err);
        }
      }
    );
  },
];

module.exports = {
  loginPageGet,
  loginPost,
};
