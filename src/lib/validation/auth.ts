import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
});

export const handleSignupError = (error: unknown, setError: (msg: string) => void) => {
  if (error instanceof z.ZodError) {
    setError(error.errors[0].message);
  } else if (error instanceof Error) {
    if (error.message.includes('already registered')) {
      setError('This email is already registered. Please sign in or use a different email.');
    } else {
      setError(error.message);
    }
  } else {
    setError('Failed to create account. Please try again.');
  }
};