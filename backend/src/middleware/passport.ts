import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import userModel from "../models/userModel";
import User from "../schemas/user";
import argon2 from "argon2";
import { formatPromise } from "../util";

export default function (passport: PassportStatic) {
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password", session: true },
      async function (email, password, done) {
        let [err, user] = await formatPromise(
          userModel.findOne({
            email: email,
          })
        );

        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }

        let isValid;
        [err, isValid] = await formatPromise(
          argon2.verify(user.password, password)
        );
        if (err) {
          return done(err, false);
        }
        if (!isValid) {
          return done(null, false);
        }

        return done(null, user.toJSON());
      }
    )
  );

  passport.serializeUser(function (user, done) {
    // console.log("serializeUser", user);
    done(null, user);
  });

  passport.deserializeUser(function (user: User, done) {
    // console.log("deserializeUser", user);
    done(null, user);
  });
}
