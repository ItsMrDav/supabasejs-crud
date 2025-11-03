import { PenLine, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { type ListViewType } from '@/lib/types';
import { deleteTaskAction, updateTaskAction } from '@/lib/actions';
import { Field, FieldGroup, FieldLabel, FieldSet } from './ui/field';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from './ui/item';
import { Textarea } from './ui/textarea';

export default function ListView({ id, title, desc }: ListViewType) {
  return (
    <Item variant="outline">
      <ItemContent className="flex-1 min-w-0">
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription className="line-clamp-2 wrap-break-words">
          {desc}
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        {/* Update dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon-sm">
              <PenLine />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update task</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form action={updateTaskAction}>
              <FieldSet>
                <FieldGroup>
                  <Field className="hidden">
                    <Input id="id" name="id" defaultValue={id} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input id="title" name="title" defaultValue={title} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="desc">Description</FieldLabel>
                    <Textarea id="desc" name="desc" defaultValue={desc ?? ''} />
                  </Field>
                  <Field>
                    <Button type="submit">Update</Button>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon-sm">
              <Trash size={6} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                task from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form action={deleteTaskAction}>
              <Input className="hidden" id="id" name="id" defaultValue={id} />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button type="submit">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </ItemActions>
    </Item>
  );
}
