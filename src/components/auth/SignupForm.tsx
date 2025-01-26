import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { signupSchema, handleSignupError } from '../../lib/validation/auth';
import FormInput from './FormInput';
import FormError from './FormError';
import SubmitButton from './SubmitButton';
import SocialLogin from './SocialLogin';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData);
      
      // Attempt to create account
      await signUp(validatedData.email, validatedData.password, validatedData.name);
      
      // Redirect to login with success message
      navigate('/login', { 
        state: { message: 'Account created successfully! Please sign in.' }
      });
    } catch (err) {
      handleSignupError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading(true);
    try {
      await signInWithGoogle();
      // The redirect will happen automatically
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
      setSocialLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <FormError message={error} />}

        <FormInput
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          autoComplete="name"
          required
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />

        <SubmitButton
          loading={loading}
          text="Create Account"
          loadingText="Creating Account..."
        />
      </form>

      <SocialLogin
        onGoogleClick={handleGoogleSignIn}
        loading={socialLoading}
      />
    </div>
  );
};