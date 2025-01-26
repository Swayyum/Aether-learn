import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Validation schemas
const profileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string(),
  avatar_url: z.string().optional(),
  role: z.enum(['student', 'instructor', 'admin']),
  created_at: z.string().optional()
});

export type Profile = z.infer<typeof profileSchema>;

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const getCurrentUser = async (): Promise<Profile | null> => {
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

    return profileSchema.parse(profile);
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
    throw new AuthError('Invalid email or password');
  }
};

export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new AuthError('Email already registered');
    }

    // Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
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
    if (!data.user) throw new AuthError('Failed to create user');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        role: 'student'
      }]);

    if (profileError) {
      throw new AuthError('Failed to create profile');
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    if (error instanceof AuthError) throw error;
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