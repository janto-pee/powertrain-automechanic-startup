import { User } from "@prisma/client";
import { prisma } from "../../script";
import { comparePassword, hashPassword } from "../utils/hashPassword";

export async function createUserService(input: any) {
  const newpassword = await hashPassword(input.hashed_password);
  const user = await prisma.user.create({
    data: {
      ...input,
      hashed_password: newpassword,
    },
  });
  return user;
}

export async function findUserService(query: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: query,
    },
  });
  return user;
}

export async function findEmailService(query: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: query,
    },
  });
  return user;
}

export async function updateUserService(query: string, update: any) {
  const updateUser = await prisma.user.update({
    where: {
      username: query,
    },
    data: update,
  });
  return updateUser;
}

export async function deleteUserService(query: any) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: query,
    },
  });
  return deleteUser;
}

export async function verifyUserService(query: string) {
  const updateUser = await prisma.user.update({
    where: {
      username: query,
    },
    data: {
      is_email_verified: true,
    },
  });
  return updateUser;
}

export async function forgotUserService(query: string, update: string) {
  const updateUser = await prisma.user.update({
    where: {
      email: query,
    },
    data: {
      passwordResetCode: update,
    },
  });
  return updateUser;
}
export async function passwordResetService(query: string, update: any) {
  const newpassword = await hashPassword(update);
  const updateUser = await prisma.user.update({
    where: {
      username: query,
    },
    data: {
      hashed_password: newpassword,
      passwordResetCode: null,
    },
  });
  return updateUser;
}

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user.hashed_password === null) return false;

  const match = await comparePassword(user.hashed_password, password);

  if (match) {
    return user;
  }

  return false;
}
