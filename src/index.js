const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config({ path: "../.env" });
const app = express();
const homeRouter = () => {};
const loginRouter = () => {};
const signupRouter = () => {};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(passport.session());

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use((error, req, res, next) => {
  if (error) {
  }
});

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => [console.log(`You are listening on port: ${PORT}`)]);
