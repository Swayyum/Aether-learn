import { createContext } from 'react';
import type { User } from '../../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => { throw new Error('Not implemented') },
  signInWithGoogle: async () => { throw new Error('Not implemented') },
  signUp: async () => { throw new Error('Not implemented') },
  signOut: async () => { throw new Error('Not implemented') }
});