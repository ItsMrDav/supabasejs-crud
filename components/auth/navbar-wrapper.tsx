import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/auth/navbar'; // import the Navbar component that shows the top bar

export default async function NavbarWrapper() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser(); // Ask Supabase for the currently logged-in user
  const user = data?.user ?? null; // If a user exists, store it; otherwise set to null

  return <Navbar initialUser={user} />; // The navbar will use this user info as a starting user state (initialUser)
}
