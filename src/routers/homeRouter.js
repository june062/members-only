const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get("/", homeControllers.homePageGet);
homeRouter.get("/logout", homeControllers.logoutGet);
homeRouter.get("/createMessage", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.end("Create message form");
  } else {
    res.end("You need to login to create a message");
  }
});

module.exports = homeRouter;
