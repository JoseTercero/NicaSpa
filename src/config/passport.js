import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "Not User Found" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          if (!user.verified) {
            done(null, false, {
              message:
                "Account found, but isn't verified. Please verified your account. Check your email inbox for security code and enter it",
            });
            return;
          }
          done(null, user, { message: "You are in" });
          await User.findByIdAndUpdate(user, { lastSignIn: Date.now() });
          return;
        } else {
          return done(null, false, { message: "Incorrect Passsword" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .lean()
    .exec(function (err, user) {
      done(err, user);
    });
});
