import { getModelForClass } from "@typegoose/typegoose";
import ShoppingListItem from "../schemas/shoppingListItem";

const shoppingListItemModel = getModelForClass(ShoppingListItem);
export default shoppingListItemModel;
