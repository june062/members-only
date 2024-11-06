const { Router } = require("express");
const queries = require("../models/queries");
const signupControllers = require("../controllers/signupControllers");
const signupRouter = Router();

signupRouter.get("/", signupControllers.signupViewGet);
signupRouter.post("/submit", signupControllers.signupPost);

module.exports = signupRouter;
