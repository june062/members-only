function loginPageGet(req, res, next) {
  try {
    res.render("loginPageView");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginPageGet,
};
