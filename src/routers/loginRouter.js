const { Router } = require("express");
const queries = require("../models/queries");
const loginControllers = require("../controllers/loginControllers");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", loginControllers.loginPageGet);
loginRouter.post(
  "/submit",
  loginControllers.loginPost,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = loginRouter;
