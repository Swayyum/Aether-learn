import { Role } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface AuthResponse {
  user: AuthUser;
  session: Session;
}

export interface AuthError extends Error {
  code?: string;
}