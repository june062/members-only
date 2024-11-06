async function signupViewGet(req, res, next) {
  try {
    res.render("signupView");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signupViewGet,
};
