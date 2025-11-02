'use server';

// import { revalidatePath } from 'next/cache';
// import { taskSchema, ListViewType } from './types';
// import { createClient } from './supabase/server';

// export async function createTaskAction(formData: FormData) {
//   const parsed = taskSchema.safeParse(Object.fromEntries(formData));

//   if (!parsed.success) {
//     console.error('[createTaskAction] validation failed');
//     return;
//   }

//   try {
//     await prisma.todo.create({
//       data: {
//         title: parsed.data.title,
//         desc: parsed.data.desc,
//       },
//     });
//     revalidatePath('/');
//   } catch (err) {
//     console.error('[createdTaskAction] Prisma error:', err);
//   }
// }

// const supabase = createClient();
///////////////////////////////// CREATE ACTION ///////////////////////////////////
// export async function createTaskAction(formData: FormData) {
//   const parsed = taskSchema.safeParse(Object.fromEntries(formData));

//   if (!parsed.success) {
//     console.error('[createTaskAction] validation failed');
//     return;
//   }

//   const { error } = (await supabase).from('todos');
// }
///////////////////////////////// RETRIEVE ACTION /////////////////////////////////
export async function retrieveTaskAction() {}
///////////////////////////////// UPDATE ACTION ///////////////////////////////////
export async function updateTaskAction() {}
///////////////////////////////// DELETE ACTION ///////////////////////////////////
export async function deleteTaskAction() {}
