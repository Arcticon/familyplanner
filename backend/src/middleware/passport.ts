import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import userModel from "../models/userModel";
import User from "../schemas/user";
import argon2 from "argon2";

export default function (passport: PassportStatic) {
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password", session: true },
      async function (email, password, done) {
        let user;
        try {
          user = await userModel.findOne({
            email: email,
          });
        } catch (error) {
          return done(error, false);
        }

        let isValid;
        try {
          isValid = await argon2.verify(user?.password || "", password);
        } catch (error) {
          return done(error, false);
        }
        if (!isValid) {
          return done(null, false);
        }

        return done(null, user?.toJSON());
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
