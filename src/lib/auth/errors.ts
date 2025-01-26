export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new AuthError('Invalid email or password', 'INVALID_CREDENTIALS'),
  EMAIL_EXISTS: new AuthError('Email already registered', 'EMAIL_EXISTS'),
  INVALID_TOKEN: new AuthError('Invalid or expired token', 'INVALID_TOKEN'),
  SESSION_EXPIRED: new AuthError('Session has expired', 'SESSION_EXPIRED'),
  UNAUTHORIZED: new AuthError('Unauthorized access', 'UNAUTHORIZED'),
} as const;