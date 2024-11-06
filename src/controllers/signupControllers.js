async function signupViewGet(req, res, next) {
  try {
    res.render("signupPageView");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signupViewGet,
};
