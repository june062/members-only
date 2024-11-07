const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get("/", homeControllers.homePageGet);
homeRouter.get("/logout", homeControllers.logoutGet);

module.exports = homeRouter;
