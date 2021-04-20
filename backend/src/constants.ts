import argon2 from "argon2";

const __prod__ = process.env.NODE_ENV === "production";
const __port__ = process.env.PORT || 4000;
const __mongodbhost__ = "localhost";
const __mongodbport__ = 27017;
const __mongodbdatabasename__ = "familyplanner";
const MONGODB_URI = `mongodb://${__mongodbhost__}:${__mongodbport__}/${__mongodbdatabasename__}`;

export default {
  __prod__,
  __port__,
  MONGODB_URI,
  expressSession: {
    secret: "mySecret",
    name: "fp.connect.sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      // domain: "*",
      secure: __prod__,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: true,
      overwrite: true,
    },
  },
  argon2: {
    type: argon2.argon2id,
    parallelism: 6,
    memoryCost: 2 ** 16,
  },
};
