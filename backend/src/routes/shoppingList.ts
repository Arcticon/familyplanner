import express from "express";
import shoppingListModel from "../models/shoppingListModel";
import { DocumentType, mongoose } from "@typegoose/typegoose";
import User from "src/schemas/user";
import shoppingListItemModel from "../models/shoppingListItemModel";
import doesUserHaveAccessToShoppingList from "../middleware/shoppingList/doesUserHaveAccess";
import { isValidObjectId } from "mongoose";

const router = express.Router();

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router

router.get("/", async function (req, res) {
  const user = <DocumentType<User>>req.user;
  const userId = new mongoose.Types.ObjectId(user._id);

  let shoppingLists = await shoppingListModel
    .find({
      userId: userId,
    })
    .lean();
  res.json(shoppingLists);
});

router.post("/", async function (req, res) {
  const { name } = req.body;

  const user = <DocumentType<User>>req.user;

  const list = new shoppingListModel({
    name: name,
    userId: user._id,
  });
  let savedList = await list.save();
  res.json(savedList.toJSON());
});

router.get(
  "/:shoppingListId",
  doesUserHaveAccessToShoppingList,
  async function (req, res) {
    const { shoppingListId } = req.params;

    if (!shoppingListId || !isValidObjectId(shoppingListId)) {
      throw new Error("no shoppingListId provided");
    }

    const id = new mongoose.Types.ObjectId(shoppingListId);

    let shoppingList = await shoppingListModel
      .find({
        _id: id,
      })
      .lean();
    res.json(shoppingList);
  }
);

router.post(
  `/:shoppingListId/item`,
  doesUserHaveAccessToShoppingList,
  async function (req, res) {
    console.log("user has access");
    const { shoppingListId } = req.params;
    const { newItem } = req.body;

    if (!shoppingListId || !isValidObjectId(shoppingListId)) {
      throw new Error("no shoppingListId provided");
    }

    const id = new mongoose.Types.ObjectId(shoppingListId);

    if (!newItem) {
      throw new Error("invalid object:newItem");
    }
    const newShoppingListItem = new shoppingListItemModel(newItem);
    const dbData = {
      $push: {
        items: newShoppingListItem,
      },
    };

    await shoppingListModel
      .updateOne(
        {
          _id: id,
        },
        dbData,
        {
          omitUndefined: true,
        }
      )
      .lean();
    res.json(newShoppingListItem.toJSON());
  }
);

router.delete(
  `/:shoppingListId/item/:itemId`,
  doesUserHaveAccessToShoppingList,
  async function (req, res) {
    const { shoppingListId, itemId } = req.params;

    if (!shoppingListId || !isValidObjectId(shoppingListId)) {
      throw new Error("no shoppingListId provided");
    }

    if (!itemId || !isValidObjectId(itemId)) {
      throw new Error("no itemId provided");
    }

    const id = new mongoose.Types.ObjectId(shoppingListId);
    const _itemId = new mongoose.Types.ObjectId(itemId);

    const backupShoppingList = await shoppingListModel.findById(id).lean();
    const backupItem = backupShoppingList?.items.find(
      (elem: any) => elem?._id.toString() === itemId
    );

    const dbData = {
      $pull: {
        items: { _id: _itemId },
      },
      $push: {
        lastUsedItems: backupItem,
        allItems: backupItem,
      },
    };

    let shoppingList = await shoppingListModel
      .updateOne(
        {
          _id: id,
        },
        dbData,
        {
          omitUndefined: true,
        }
      )
      .lean();
    res.json(shoppingList);
  }
);

router.delete(
  `/:shoppingListId/lastUsed/:itemId`,
  doesUserHaveAccessToShoppingList,
  async function (req, res) {
    const { shoppingListId, itemId } = req.params;

    if (!shoppingListId || !isValidObjectId(shoppingListId)) {
      throw new Error("no shoppingListId provided");
    }

    if (!itemId || !isValidObjectId(itemId)) {
      throw new Error("no itemId provided");
    }

    const id = new mongoose.Types.ObjectId(shoppingListId);
    const _itemId = new mongoose.Types.ObjectId(itemId);

    const backupShoppingList = await shoppingListModel.findById(id).lean();
    const backupItem = backupShoppingList?.lastUsedItems.find(
      (elem: any) => elem?._id.toString() === itemId
    );

    const dbData = {
      $pull: {
        lastUsedItems: { _id: _itemId },
      },
      $push: {
        items: backupItem,
      },
    };

    let shoppingList = await shoppingListModel
      .updateOne(
        {
          _id: id,
        },
        dbData,
        {
          omitUndefined: true,
        }
      )
      .lean();
    res.json(shoppingList);
  }
);

router.put(
  `/:shoppingListId/name`,
  doesUserHaveAccessToShoppingList,
  async function (req, res) {
    const { shoppingListId } = req.params;
    const { name } = req.body;

    if (!shoppingListId || !isValidObjectId(shoppingListId)) {
      throw new Error("no shoppingListId provided");
    }

    const id = new mongoose.Types.ObjectId(shoppingListId);

    let shoppingList = await shoppingListModel
      .updateOne(
        {
          _id: id,
        },
        {
          name,
        },
        {
          omitUndefined: true,
        }
      )
      .lean();
    res.send(shoppingList);
  }
);

export { router as shoppingListRouter };
