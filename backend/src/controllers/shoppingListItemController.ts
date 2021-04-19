import mongoose from "mongoose";
import { Connection } from "mongoose";

export default {
  getShoppingListItemById: (conn: Connection) =>
    function (id: string) {
      return conn
        .collection("ShoppingList")
        .findOne({ _id: new mongoose.Types.ObjectId(id) });
    },
};
