import { Story, Task, User } from "@/lib/db";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useRouter } from "next/navigation";

export default function Canban({
  tasks,
  story,
  users,
}: {
  tasks: Task[];
  story: Story;
  users: User[];
}) {
  const router = useRouter();

  const todoTasks = tasks.filter((it) => it.state === "todo");
  const doingTasks = tasks.filter((it) => it.state === "doing");
  const doneTasks = tasks.filter((it) => it.state === "done");
  return (
    <div className="flex w-full justify-around mt-4">
      <Card className="w-[30%]">
        <CardHeader>Todo</CardHeader>
        <CardContent>
          {todoTasks.map((it) => {
            return (
              <Card onClick={() => router.push("/task/" + it.id)}>
                <div className="mx-2 my-1">
                  #{it.id} {it.name}
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
      <Card className="w-[30%]">
        <CardHeader>Doing</CardHeader>
        <CardContent>
          {doingTasks.map((it) => {
            return (
              <Card onClick={() => router.push("/task/" + it.id)}>
                <div className="mx-2 my-1">
                  #{it.id} {it.name}
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
      <Card className="w-[30%]">
        <CardHeader>Done</CardHeader>
        <CardContent>
          {doneTasks.map((it) => {
            return (
              <Card onClick={() => router.push("/task/" + it.id)}>
                <div className="mx-2 my-1">
                  #{it.id} {it.name}
                </div>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
