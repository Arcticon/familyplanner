import mongoose from "mongoose";
import { Connection } from "mongoose";

export default {
  getShoppingListCollection: (conn: Connection) =>
    function () {
      return conn.collection("ShoppingList");
    },
  getShoppingListById: (conn: Connection) =>
    function (id: string) {
      return conn
        .collection("ShoppingList")
        .findOne({ _id: new mongoose.Types.ObjectId(id) });
    },
  createNewShoppingList: (conn: Connection) =>
    function (id: string) {
      return conn
        .collection("ShoppingList")
        .findOne({ _id: new mongoose.Types.ObjectId(id) });
    },
};
