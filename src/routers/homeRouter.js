const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get("/", homeControllers.homePageGet);
homeRouter.get("/logout", homeControllers.logoutGet);
homeRouter.get("/createMessage", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("createMessagePageView");
  } else {
    res.status(401).send("You need to login to create a message");
  }
});

homeRouter.post("/createMessage/submit", homeControllers.newMessagePost);
homeRouter.get("/message/:messageID/delete", homeControllers.deleteMessage);

module.exports = homeRouter;
