import express from "express";
import userModel from "../models/userModel";

const router = express.Router();

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

router.get("/", function (req, res, next) {
  res.status(200).send();
});

export { router as userRouter };
