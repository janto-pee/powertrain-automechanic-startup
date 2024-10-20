import { get } from 'lodash';
import { prisma } from '../script';
import { signJwt, verifyJwt } from '../utils/jwt';
import { findUserService } from './UserService';
import config from 'config';

export async function createSession(input: any) {
  const session = await prisma.session.create({
    data: input,
  });
  return session;
}

export async function findSession(query: string) {
  const session = await prisma.session.findUnique({
    where: {
      id: query,
    },
  });
  return session;
}

export async function updateSession(query: string) {
  const updateUser = await prisma.session.update({
    where: {
      id: query,
      valid: true,
    },
    data: {
      valid: false,
    },
  });
  return updateUser;
}

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublic');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await findSession(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUserService(session.userId);

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    'accessTokenPrivate',
    { expiresIn: config.get<string>('accessTokenTtl') },
  );

  return accessToken;
}
