import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Field, FieldGroup, FieldLabel, FieldSet } from './ui/field';
import { Textarea } from './ui/textarea';
import { createTaskAction } from '@/lib/actions';

export default function NewListButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form action={createTaskAction}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" name="title" placeholder="Title" />
              </Field>
              <Field>
                <FieldLabel htmlFor="desc">Description</FieldLabel>
                <Textarea id="desc" name="desc" placeholder="Description" />
              </Field>
              <Field>
                <Button type="submit">Create</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
