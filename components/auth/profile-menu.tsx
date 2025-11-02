'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CurrentUserAvatar } from '@/components/auth/current-user-avatar'; // show the user's avatar (picture or initials)
import { LogoutButton } from '@/components/auth/logout-button'; // button that signs out user
import type { User } from '@supabase/supabase-js'; // import the "User" type so TypeScript knows what data looks like

// This component shows the dropdown menu for the logged-in user
export default function ProfileMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="focus:outline-none rounded-full overflow-hidden h-9 w-9"
          aria-label="User menu"
        >
          <CurrentUserAvatar />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52" sideOffset={8}>
        <DropdownMenuLabel className="text-sm">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
