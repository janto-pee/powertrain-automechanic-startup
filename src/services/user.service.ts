import { Omit, omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../model/user.model";

export async function createUser(input: UserInput) {
  const user = await UserModel.create(input);
  return omit(user.toJSON(), "password");
}

export async function findAllUser() {
  const users = await UserModel.find();
  return users;
}
export async function findUser(query: FilterQuery<UserDocument>) {
  const user = await UserModel.findOne(query);
  return omit(user?.toJSON(), "password");
}
export async function validateUser(
  query: DocumentDefinition<Omit<UserInput, "name" | "confirm_password">>
) {
  const email = query.email;
  const password = query.password;

  const user = await UserModel.findOne({ email });
  if (!user) return false;
  const isValid = user.comparePassword(password);

  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
}
