import { supabase } from './client';
import type { User } from '../../types/auth';

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session?.user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role,
      created_at: profile.created_at
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://aetherlearn.netlify.app/auth/callback/',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
  
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string, fullName: string) => {
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

  if (signUpError) throw signUpError;
  if (!user) throw new Error('Failed to create user');

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{
      id: user.id,
      email,
      full_name: fullName,
      role: 'student'
    }]);

  if (profileError) throw profileError;

  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
};

export const handlePasswordReset = async (accessToken: string) => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    throw new Error('Invalid or expired reset link');
  }

  return session;
};