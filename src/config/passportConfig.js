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
      const match = await crypt.compare(password, user.password);
      if (match) {
        done(null, user);
      } else {
        done(null, false, { message: "Wrong password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userID, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userID,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    return done(error);
  }
});
