import express from "express";

const router = express.Router();

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

router.get("/", function (_, res) {
  res.status(200).send();
});

export { router as userRouter };
