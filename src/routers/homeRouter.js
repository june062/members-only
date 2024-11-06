const { Router } = require("express");
const homeControllers = require("../controllers/homeControllers");
const homeRouter = Router();

homeRouter.get(
  "/",
  /* first isAuth middleware then isAdmin middleware */ homeControllers.homePageGet
);

module.exports = {
  homeRouter,
};
