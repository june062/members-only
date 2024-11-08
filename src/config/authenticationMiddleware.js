const passport = require("passport");

function isLoggedIn(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send("You must be signed in to access this");
    }
  } catch (error) {
    next(error);
  }
}
function isAdmin(req, res, next) {
  try {
    if (req.user.admin) {
      next();
    } else {
      res.status(401).send("You must be an admin to delete messages");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
