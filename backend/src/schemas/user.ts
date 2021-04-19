import { prop } from "@typegoose/typegoose";

class User {
  @prop({ index: true, required: true, trim: true, unique: true })
  public username!: string;

  @prop({ required: true, trim: true, unique: true })
  public email!: string;

  @prop({ required: true, trim: true })
  public password!: string;
}

export default User;
