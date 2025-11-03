'use server';

import { revalidatePath } from 'next/cache';
import { taskSchema, ListViewType } from './types';
import { createClient } from './supabase/server';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from './db-types';

///////////////////////////////// WRAPPER FUNCTIONS ///////////////////////////////////
async function getAuthContext(
  actionName: string
): Promise<{ supabase: SupabaseClient<Database>; user: User } | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(`[${actionName}] User authentication failed:`, userError);
    return null;
  }

  return { supabase, user };
}

///////////////////////////////// CREATE ACTION ///////////////////////////////////
export async function createTaskAction(formData: FormData) {
  const authContext = await getAuthContext('createTaskAction');
  if (!authContext) return;
  const { supabase, user } = authContext;

  const parsed = taskSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    console.error('[createTaskAction] validation failed');
    return;
  }

  const { data, error } = await supabase
    .from('todos')
    .insert({
      title: parsed.data.title,
      desc: parsed.data.desc,
      user_id: user.id,
    })
    .select();
  if (error) {
    console.error('[createdTaskAction] Supabase error:', { data, error });
  }
  revalidatePath('/dashboard');
}
///////////////////////////////// RETRIEVE ACTION /////////////////////////////////
export async function retrieveTaskAction() {
  const authContext = await getAuthContext('retrieveTaskAction');
  if (!authContext) return;
  const { supabase, user } = authContext;

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[retrieveTaskAction] Supabase error:', { data, error });
  }
  return (data as ListViewType[]) ?? [];
}
///////////////////////////////// UPDATE ACTION ///////////////////////////////////
export async function updateTaskAction(formData: FormData) {
  const authContext = await getAuthContext('createTaskAction');
  if (!authContext) return;
  const { supabase, user } = authContext;

  const id = formData.get('id');
  const title = formData.get('title');
  const desc = formData.get('desc');

  if (!id) return;

  const parsed = taskSchema.safeParse({
    title,
    desc,
  });

  if (!parsed.success) {
    console.error('[updateTaskAction] validation failed');
    return;
  }

  const { data, error } = await supabase
    .from('todos')
    .update(parsed.data)
    .eq('id', Number(id))
    .eq('user_id', user.id);

  if (error) {
    console.error('[updateTaskAction] Supabase error:', { data, error });
  }
  revalidatePath('/dashboard');
}
///////////////////////////////// DELETE ACTION ///////////////////////////////////
export async function deleteTaskAction(formData: FormData) {
  const authContext = await getAuthContext('createTaskAction');
  if (!authContext) return;
  const { supabase, user } = authContext;

  const id = formData.get('id');
  if (!id) return;

  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', Number(id))
    .eq('user_id', user.id);

  if (error) {
    console.error('[deleteTaskAction] Supabase error:', { data, error });
  }
  revalidatePath('/dashboard');
}
