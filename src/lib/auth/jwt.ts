import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export const createSession = async (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: SESSION_DURATION,
  });

  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000);

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return session;
};

export const verifySession = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const session = await prisma.session.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
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
      throw new Error('Session not found or expired');
    }

    return session.user;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const deleteSession = async (token: string) => {
  await prisma.session.delete({
    where: { token },
  });
};