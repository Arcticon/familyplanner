import mongoose from "mongoose";
import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import passport from "passport";
import session from "express-session";
import constants from "./constants";
import { apiRouter } from "./router";
import redis from "redis";
import connectRedis from "connect-redis";
import initPassport from "./middleware/passport";
import argon2 from "argon2";
import userModel from "./models/userModel";
import { promisify } from "util";
import { formatPromise } from "./util";
const RedisStore = connectRedis(session);
mongoose.Promise = global.Promise;
mongoose.set("debug", !constants.__prod__);

//mongodb init

(async () => {
  try {
    await mongoose.connect(constants.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
})();

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.on("connected", async () => {
  console.log(`⚡️[mongodb]: connected`);
  // const doc = new shoppingListModel({
  //   name: "test",
  //   items: [],
  // });
  // await doc.save();
});

//express init

const corsOptions: CorsOptions = {
  // origin: `http://localhost:4000`,
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://192.168.178.77:3000",
  ],
  // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  // allowedHeaders: ["Content-Type"],
};

const app = express();

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

const redisClient = redis.createClient();
app.use(express.json());
app.use(
  session({
    ...constants.expressSession,
    store: new RedisStore({ client: redisClient }),
  })
);
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.use(cors(corsOptions));

app.post("/api/logout", function (req, res) {
  req.logOut();
  res.status(200).send();
});

app.post("/api/register", async function (req, res) {
  const logInP = promisify(req.logIn).bind(req);
  const { password } = req?.body;

  const hashedPassword = await argon2.hash(password, constants.argon2);

  const user = new userModel({
    ...req.body,
    password: hashedPassword,
  });
  console.log({ user: user.toJSON() });

  let err;

  [err] = await formatPromise(user.save());

  if (err) {
    console.error({ err });
    res.send().status(400);
  }

  [err] = await formatPromise(logInP(user));

  if (err) {
    console.error({ err });
    await formatPromise(userModel.deleteOne({ _id: user._id }));
    res.send().status(400);
  }

  const userToSend = {
    ...user,
    password: undefined,
  };
  res.json(userToSend);
});

app.post("/api/login", passport.authenticate("local"), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  const userToSend = {
    ...req.user,
    password: undefined,
  };
  res.json(userToSend);
});

app.use("/api", apiRouter);

app.get("/", (_, res) => res.send("Express + TypeScript Server"));

app.listen(constants.__port__, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${constants.__port__}`
  );
});
