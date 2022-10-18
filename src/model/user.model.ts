import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword(confirm_password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user-${nanoid()}`,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  confirm_password: string
): Promise<boolean> {
  return bcrypt.compare(confirm_password, this.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
