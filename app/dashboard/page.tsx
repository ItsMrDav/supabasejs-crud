import ListView from '@/components/list-view';
import NewListButton from '@/components/newlist-button';
import { ItemGroup } from '@/components/ui/item';
import { retrieveTaskAction } from '@/lib/actions';

export default async function Dashboard() {
  const myList = await retrieveTaskAction();
  return (
    <div className="container mx-auto px-16 py-8 flex flex-col justify-center items-center gap-4">
      <div className="flex w-full justify-between items-center">
        <h1>My List</h1>
        <NewListButton />
      </div>

      {/* Todo List */}
      {myList && myList.length > 0 ? (
        <ItemGroup className="w-full max-w-xl gap-4">
          {myList.map(task => (
            <ListView key={task.id} {...task} />
          ))}
        </ItemGroup>
      ) : (
        <p className="italic">Nothing added to the list</p>
      )}
    </div>
  );
}
