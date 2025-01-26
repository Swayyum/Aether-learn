import { supabase } from './supabase';
import { z } from 'zod';

// Validation schemas
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string(),
  avatar_url: z.string().optional(),
  role: z.enum(['student', 'instructor', 'admin']),
  created_at: z.string().optional()
});

export type User = z.infer<typeof userSchema>;

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw new AuthError(sessionError.message);
    if (!session?.user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw new AuthError(profileError.message);
    if (!profile) return null;

    return userSchema.parse(profile);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw new AuthError(error.message);
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new AuthError('Failed to sign in. Please try again.');
  }
};

export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'student'
        }
      }
    });

    if (signUpError) throw new AuthError(signUpError.message);
    if (!user) throw new AuthError('Failed to create user');

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        email,
        full_name: fullName,
        role: 'student'
      }]);

    if (profileError) throw new AuthError(profileError.message);

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new AuthError('Failed to create account. Please try again.');
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message);
  } catch (error) {
    console.error('Error signing out:', error);
    throw new AuthError('Failed to sign out. Please try again.');
  }
};