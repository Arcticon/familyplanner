import shoppingListModel from "../../models/shoppingListModel";
import { DocumentType, mongoose } from "@typegoose/typegoose";
import User from "../../schemas/user";
import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default async function doesUserHaveAccessToShoppingList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = <DocumentType<User>>req.user;
  const { shoppingListId } = req.params;
  const userId = new mongoose.Types.ObjectId(user._id);

  if (!shoppingListId || !isValidObjectId(shoppingListId)) {
    return res.status(400).send();
  }

  const id = new mongoose.Types.ObjectId(shoppingListId);

  const hasAccess = await shoppingListModel.countDocuments({
    userId: userId,
    _id: id,
  });
  if (!hasAccess) {
    return res.status(400).send();
  }
  return next();
}
