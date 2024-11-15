import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },

    role: {
      type: String,
      enum: ["ADMIN", "TRAINER", "TRAINEE"],
      default: "TRAINEE",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
export const UserModel = model<IUser>("Users", userSchema);
