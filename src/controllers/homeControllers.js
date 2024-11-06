function homePageGet(req, res, next) {
  console.log("hi");
  res.render("../views/homePageView");
}
module.exports = {
  homePageGet,
};
