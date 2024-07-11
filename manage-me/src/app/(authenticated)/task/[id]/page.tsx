import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { findStoryById } from "@/lib/actions/storiesActions";
import { findTaskById } from "@/lib/actions/taskActions";
import { findUserById } from "@/lib/actions/userActions";

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

  const assignedUser = task.assignedUserId
    ? await findUserById(task.assignedUserId)
    : undefined;

  return (
    <Card className="overflow-hidden m-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <span>#{task.id}</span> {task.name}
          </CardTitle>
          <CardDescription>{story.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3 w-[30%]">
          <div className="flex justify-between">
            <div className="font-semibold">Priority</div>
            <div className="text-muted-foreground">{task.priority}</div>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between">
            <div className="font-semibold">State</div>
            <div className="text-muted-foreground">{task.state}</div>
          </div>
          <Separator className="mt-1 mb-4" />
          <div className="flex justify-between">
            <div className="font-semibold">Assigned user</div>
            <div className="text-muted-foreground">
              {assignedUser === undefined
                ? "none"
                : assignedUser.name +
                  " " +
                  assignedUser.surname +
                  " (" +
                  assignedUser.username +
                  ")"}
            </div>
          </div>
          <Separator className="mt-1 mb-4" />
          {task.expectedManHours !== null && (
            <>
              <div className="flex justify-between">
                <div className="font-semibold">Expected man hours</div>
                <div className="text-muted-foreground">
                  {task.expectedManHours}
                </div>
              </div>
              <Separator className="mt-1 mb-4" />
            </>
          )}
          {task.startTimestamp !== null && (
            <>
              <div className="flex justify-between">
                <div className="font-semibold">Start date</div>
                <div className="text-muted-foreground">
                  {task.startTimestamp.toLocaleString()}
                </div>
              </div>
              <Separator className="mt-1 mb-4" />
            </>
          )}
          {task.endTimestamp !== null && (
            <>
              <div className="flex justify-between">
                <div className="font-semibold">End date</div>
                <div className="text-muted-foreground">
                  {task.endTimestamp.toLocaleString()}
                </div>
              </div>
              <Separator className="mt-1 mb-4" />
            </>
          )}
        </div>
        <div>
          <div className="font-semibold mb-1">Description</div>
          <div>{story.description}</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Created{" "}
          <time dateTime="2023-11-23 12:12">
            {task.createTimestamp.toLocaleString()}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
