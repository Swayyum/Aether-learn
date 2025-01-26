import { prisma } from '../db';
import { hashPassword, verifyPassword } from './password';
import { createSession, deleteSession } from './session';
import { AUTH_ERRORS } from './errors';
import type { LoginInput, RegisterInput } from './validation';

export const login = async ({ email, password }: LoginInput) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw AUTH_ERRORS.INVALID_CREDENTIALS;

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) throw AUTH_ERRORS.INVALID_CREDENTIALS;

    const session = await createSession(user.id);
    return { user, session };
  } catch (error) {
    console.error('Login error:', error);
    throw error instanceof Error ? error : new Error('Login failed');
  }
};

export const register = async ({ email, password, name }: RegisterInput) => {
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw AUTH_ERRORS.EMAIL_EXISTS;

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        role: 'STUDENT'
      },
    });

    const session = await createSession(user.id);
    return { user, session };
  } catch (error) {
    console.error('Registration error:', error);
    if (error === AUTH_ERRORS.EMAIL_EXISTS) throw error;
    throw new Error('Failed to create account');
  }
};

export const logout = async (token: string) => {
  try {
    await deleteSession(token);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};

export * from './validation';
export * from './session';
export * from './types';