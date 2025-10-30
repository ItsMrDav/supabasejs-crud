import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// This runs when a user visits /auth?code=XXXX&next=/something
export async function GET(request: Request) {
  // Create a URL object so we can read query parameters like "code" or "next"
  const { searchParams, origin } = new URL(request.url);

  // "code" is the temporary code Supabase gives after OAuth login
  const code = searchParams.get('code');

  // "next" is where we want to send the user after login (defaults to home "/")
  let next = searchParams.get('next') ?? '/';

  // If "next" starts with "http" or some external URL, block it (for safety)
  if (!next.startsWith('/')) {
    next = '/';
  }

  // If code exists → exchange that code for a real session (login!)
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // If the exchange worked (no error)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original host if behind proxy
      const isLocalEnv = origin.includes('localhost'); // detect local testing

      // If local (e.g., localhost:3000)
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      // If running behind a load balancer / proxy
      else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      // Otherwise, just use the current origin
      else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If there was no code, or login failed, redirect to /auth/error page
  return NextResponse.redirect(`${origin}/auth/error`);
}
