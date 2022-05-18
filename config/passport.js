const twitchStrategy = require("passport-twitch-strategy").Strategy;
const mongoose = require("mongoose");
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const callbackURL = "/auth/twitch/callback";
const scope = "user:read:email";

const User = mongoose.model("user");

module.exports = (passport) => {
  passport.use(
    new twitchStrategy(
      {
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        callbackURL,
        scope,
        state: true,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          twitchId: profile.id,
        })
          .then((user) => {
            if (user) {
              done(null, user);
            } else {
              const newUser = {
                twitchId: profile.id,
                displayName: profile.displayName,
              };

              new User(newUser)
                .save()
                .then((user) => done(null, user))
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
  });
};
