const passport = require("passport");

function isLoggedIn(req, res, next) {
  try {
    passport.authenticate("local", (error, user) => {
      if (!user) {
        res.send("You cant access this");
        res.end();
      }
      res.login(user, next);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isLoggedIn,
};
