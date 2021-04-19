import ShoppingListItem from "./shoppingListItem";
import { mongoose, prop, Ref } from "@typegoose/typegoose";

class ShoppingList {
  @prop({ index: true, required: true, trim: true })
  public name!: string;

  @prop({ required: true, default: [], ref: () => ShoppingListItem })
  public items!: Ref<ShoppingListItem>[];

  @prop({ required: true, default: [], ref: () => ShoppingListItem })
  public lastUsedItems!: Ref<ShoppingListItem>[];

  @prop({ required: true })
  public userId!: mongoose.Types.ObjectId;
}

export default ShoppingList;
