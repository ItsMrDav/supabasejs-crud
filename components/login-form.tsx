'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// The LoginForm component lets users log in using Google, GitHub, or email
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);

  // Create a Supabase client (only works in browser)
  const supabase = createClient();

  // 🔹 Handle Google or GitHub login
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(provider);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth?next=/`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsLoading(null);
    }
  };

  // 🔹 Handle Magic Link (Email) login
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('magic');
    setError(null);
    setLinkSent(false);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?next=/`,
        },
      });
      if (error) throw error;
      setLinkSent(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {error && <p className="text-sm text-destructive-500">{error}</p>}

            {/* Social Login Buttons */}
            <Button
              type="button"
              className="w-full"
              disabled={!!isLoading}
              onClick={() => handleSocialLogin('google')}
              variant="outline"
            >
              {isLoading === 'google'
                ? 'Logging in with Google...'
                : 'Continue with Google'}
            </Button>

            <Button
              type="button"
              className="w-full"
              disabled={!!isLoading}
              onClick={() => handleSocialLogin('github')}
              variant="outline"
            >
              {isLoading === 'github'
                ? 'Logging in with GitHub...'
                : 'Continue with GitHub'}
            </Button>

            {/* Divider */}
            <div className="flex items-center space-x-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Magic Link */}
            <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full"
                disabled={!!isLoading || !email}
              >
                {isLoading === 'magic'
                  ? 'Sending magic link...'
                  : 'Send magic link'}
              </Button>
            </form>

            {linkSent && (
              <p className="text-sm text-muted-foreground text-center">
                ✨ Magic link sent to <strong>{email}</strong>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
