import { getModelForClass } from "@typegoose/typegoose";
import User from "../schemas/user";

const userModel = getModelForClass(User);
export default userModel;
