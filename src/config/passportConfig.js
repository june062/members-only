const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../models/pool");
const crypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = rows[0];
      if (!user) {
        return done(false, null, { message: "Wrong username" });
      }
      const enteredPassword = await crypt.hash(password, 32);
      if ((enteredPassword = user.password)) {
        done(null, username);
      } else {
        done(null, false, { message: "Wrong password" });
      }
    } catch (error) {
      return done(error, null);
    }
  })
);
