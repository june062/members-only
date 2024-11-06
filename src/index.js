const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config({ path: "../.env" });
const session = require("express-session");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const homeRouter = require("./routers/homeRouter");

require("./config/passportConfig");

app.use("/", homeRouter);

app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
  }
});

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => {
  console.log(`You are listening on port: ${PORT}`);
});
