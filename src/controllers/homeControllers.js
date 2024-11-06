function homePageGet(req, res, next) {
  try {
    res.render("homePageView");
  } catch (error) {
    next(error);
  }
}
module.exports = {
  homePageGet,
};
