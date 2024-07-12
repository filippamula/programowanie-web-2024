import { default as Task, default as TaskCard } from "@/components/task";
import { findStoryById } from "@/lib/actions/storiesActions";
import { findTaskById } from "@/lib/actions/taskActions";
import { findUserById, findUsers } from "@/lib/actions/userActions";

export default async function TaskPage({ params }: { params: { id: number } }) {
  const task = await findTaskById(params.id);
  if (!task) {
    return <div className="ml-auto mr-auto">Task not found.</div>;
  }

  const story = await findStoryById(task.storyId);
  if (!story) {
    return (
      <div className="ml-auto mr-auto">Corresponding story not found.</div>
    );
  }

  const users = await findUsers();

  return <TaskCard task={task} story={story} users={users}></TaskCard>;
}
