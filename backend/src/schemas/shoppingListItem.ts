import { prop } from "@typegoose/typegoose";

class ShoppingListItem {
  @prop({ index: true, required: true, trim: true })
  public name!: string;

  @prop({ trim: true, default: "" })
  public description!: string;
}

export default ShoppingListItem;
