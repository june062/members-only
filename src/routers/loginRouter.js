const { Router } = require("express");
const queries = require("../models/queries");
const loginControllers = require("../controllers/loginControllers");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", loginControllers.loginPageGet);
loginRouter.post(
  "/submit",
  passport.authenticate("local", {
    successRedirect: "/",
    failureMessage: "/login",
  })
);

module.exports = loginRouter;
