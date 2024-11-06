const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config({ path: "../.env" });
const session = require("express-session");
const passport = require("passport");

console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const homeRouter = require("./routers/homeRouter");
const loginRouter = () => {};
const signupRouter = () => {};

require("./config/passportConfig");

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use((error, req, res, next) => {
  if (error) {
  }
});

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => [console.log(`You are listening on port: ${PORT}`)]);
