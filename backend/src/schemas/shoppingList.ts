import ShoppingListItem from "./shoppingListItem";
import { mongoose, prop } from "@typegoose/typegoose";
class ShoppingList {
  @prop({ index: true, required: true, trim: true })
  public name!: string;

  @prop({ required: true })
  public items!: ShoppingListItem[];

  @prop({ required: true })
  public lastUsedItems!: ShoppingListItem[];

  @prop({ required: true })
  public allItems!: ShoppingListItem[];

  @prop({ required: true })
  public userId!: mongoose.Types.ObjectId;
}

export default ShoppingList;
