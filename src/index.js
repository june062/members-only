const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { appendFile } = require("node:fs");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config({ path: "../.env" });
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => [console.log(`You are listening on port: ${PORT}`)]);
