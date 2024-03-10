const passport = require("passport");
const User = require("../model/user");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

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
      callbackURL: "https://tahfeeth-system.onrender.com/user/details",
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

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/user/auth/facebook/callback",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       try {
//         const existingUser = await User.findOne({ facebookId: profile.id });
//         if (existingUser) {
//           return cb(null, existingUser);
//         }
//         const user = new User({
//           name: profile.displayName,
//           facebookId: profile.id,
//           role: "student",
//           verified: true,
//         });
//         await user.save();
//         cb(null, user);
//       } catch (err) {
//         console.log(err);
//         cb(err);
//       }
//     }
//   )
// );

module.exports = { oauth };
