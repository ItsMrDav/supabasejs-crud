import z from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be under 100 characters'),
  desc: z.string().max(200, 'Description too long'),
});

export interface ListViewType {
  id: number;
  title: string;
  desc: string;
}
