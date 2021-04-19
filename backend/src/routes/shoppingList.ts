import express from "express";
import { formatPromise } from "../util";
import shoppingListModel from "../models/shoppingListModel";
import { DocumentType, mongoose } from "@typegoose/typegoose";
import User from "src/schemas/user";

const router = express.Router();

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

router.get("/", async function (req, res) {
  const user = <DocumentType<User>>req.user;

  let [err, shoppingLists] = await formatPromise(
    shoppingListModel
      .find({
        userId: new mongoose.Types.ObjectId(user._id),
      })
      .lean()
  );
  if (err) {
    res.status(400).json(err);
  }
  res.json(shoppingLists);
});

router.post("/", function (req, res) {
  const user = <DocumentType<User>>req.user;

  const list = new shoppingListModel({
    ...req.body,
    userId: user._id,
  });
  res.json(list.toJSON());
});

export { router as shoppingListRouter };
