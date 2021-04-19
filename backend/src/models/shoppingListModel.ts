import { getModelForClass } from "@typegoose/typegoose";
import ShoppingList from "../schemas/shoppingList";

const shoppingListModel = getModelForClass(ShoppingList);
export default shoppingListModel;
