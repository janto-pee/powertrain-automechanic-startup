import { prisma } from "../../script";

export async function createSession(input: any) {
  const session = await prisma.session.create({
    data: input,
  });
  return session;
}

export async function findSession(query: any) {
  const session = await prisma.user.findUnique({
    where: {
      id: query,
    },
  });
  return session;
}
export async function updateSession(query: string, update: any) {
  const updateUser = await prisma.session.update({
    where: {
      username: query,
    },
    data: update,
  });
  return updateUser;
}

export async function accesTokenSession(input: any) {
  const session = await prisma.session.create({
    data: input,
  });
  return session;
}

// export async function refreshTokenSession(input: any) {
//   const session = await prisma.session.create({
//     data: input,
//   });
//   return session;
// }
