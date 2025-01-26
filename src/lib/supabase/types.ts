export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email?: string;
  role?: string;
  aud: string;
}

export interface AuthResponse {
  data: {
    session: AuthSession | null;
    user: AuthUser | null;
  };
  error: Error | null;
}