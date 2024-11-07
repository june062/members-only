const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config({ path: "../.env" });
const passport = require("passport");
const authenticationMiddleware = require("./config/authenticationMiddleware");
const session = require("express-session");
const PostgressConnection = require("connect-pg-simple")(session);
const pool = require("./models/pool");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const sessionStore = new PostgressConnection({
  pool: pool,
});
app.use(
  session({
    secret: process.env.DEV_SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

require("./config/passportConfig");
app.use(passport.session());

const homeRouter = require("./routers/homeRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
app.use((req, res, next) => {
  console.log(res.locals);
  next();
});
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    /* send some error page to the client */
  }
});

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => {
  console.log(`You are listening on port: ${PORT}`);
});
