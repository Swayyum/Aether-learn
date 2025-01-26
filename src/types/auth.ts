export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'student' | 'instructor' | 'admin';
  created_at?: string;
}

export interface AuthError extends Error {
  code?: string;
}