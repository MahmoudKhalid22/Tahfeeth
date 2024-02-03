const passport = require("passport");
const User = require("../model/user");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const oauth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/user/details",
      // passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = new User({
          name: profile.displayName,
          email: profile.email,
          googleId: profile.id,
          role: "student",
          verified: true,
        });
        await user.save();
        done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

module.exports = { oauth };
