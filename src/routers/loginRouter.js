const { Router } = require("express");
const queries = require("../models/queries");
const loginControllers = require("../controllers/loginControllers");
const loginRouter = Router();

loginRouter.get("/", loginControllers.loginPageGet);

module.exports = loginRouter;
