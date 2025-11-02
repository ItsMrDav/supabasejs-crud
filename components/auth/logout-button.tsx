'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>; // Would be an DropDownItem inside ProfileMenu component
}
