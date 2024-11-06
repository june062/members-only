const { Router } = require("express");
const queries = require("../models/queries");
const signupControllers = require("../controllers/signupControllers");
const signupRouter = Router();

signupRouter.get("/", signupControllers.signupViewGet);

module.exports = signupRouter;
