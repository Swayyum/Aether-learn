import { prisma } from '../db';
import { AuthUser, Session } from './types';
import { AUTH_ERRORS } from './errors';

export const getSession = async (token: string): Promise<Session & { user: AuthUser }> => {
  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  });

  if (!session) {
    throw AUTH_ERRORS.INVALID_TOKEN;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    throw AUTH_ERRORS.SESSION_EXPIRED;
  }

  return session;
};

export const createSession = async (userId: string): Promise<Session> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  return prisma.session.create({
    data: {
      userId,
      token: crypto.randomUUID(),
      expiresAt,
    },
  });
};

export const deleteSession = async (token: string): Promise<void> => {
  await prisma.session.delete({ where: { token } });
};