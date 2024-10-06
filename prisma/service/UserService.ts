import { User } from "@prisma/client";
import { prisma } from "../../script";

export async function createUserService(input: any) {
  const user = await prisma.user.create({
    data: input,
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
  const user = await prisma.user.findFirst({
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
      email: "bert@prisma.io",
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

export async function forgotUserService(query: string, update: any) {
  const updateUser = await prisma.user.update({
    where: {
      email: query,
    },
    data: update,
  });
  return updateUser;
}
export async function passwordResetService(query: string, update: any) {
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

export async function validateUser(query: any) {
  const email = query.email;
  const password = query.password;

  const user = await findEmailService(email);
  if (!user) return false;
  // const isValid = user.comparePassword(password);

  // if (!isValid) {
  //   return false;
  // }
  // return omit(user.toJSON(), "password");
  return user;
}
