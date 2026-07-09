const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/users/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        let user = await User.findOne({
        
          email: profile.emails[0].value,
        });
      

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-oauth-user",
            googleId: profile.id,
            avatar: profile.photos[0].value,
            authProvider: "google",
          });
        } else {
          user.googleId = profile.id;
          if (!user.avatar) {
            user.avatar = profile.photos[0].value;
          }
          user.authProvider = "google";
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.log(error)
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  
  return done(null, user);
});

module.exports = passport;