'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import ProfileMenu from '@/components/profile-menu'; // Shown if logged in
import LoginModal from '@/components/login-modal'; // Shown if logged out

export default function Navbar({ initialUser }: { initialUser: User | null }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser); // State to track down current user

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // When Auth state changes ->
      supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null)); // Set up a new current user
    });
    return () => subscription.unsubscribe(); // Cleanup when component is removed by unsubscribing the user
  }, [supabase]); // only run when supabase instance changes

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link className="text-3xl font-bold" href="/">
          Test App
        </Link>

        <div className="flex items-center gap-6">
          {user ? <ProfileMenu user={user} /> : <LoginModal />}
        </div>
      </div>
    </nav>
  );
}
