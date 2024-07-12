"use client";

import { Story, Task, User } from "@/lib/db";
import Canban from "./canban";
import Tasks from "./tasks";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function StoryBody({
  tasks,
  story,
  users,
}: {
  tasks: Task[];
  story: Story;
  users: User[];
}) {
  return (
    <Card className=" w-full mx-4 mb-4 ">
      <CardContent className="mt-6">
        <Tabs defaultValue="tasks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="canban">Canban</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <Tasks tasks={tasks} story={story} users={users}></Tasks>
          </TabsContent>
          <TabsContent value="canban">
            <Canban tasks={tasks} story={story} users={users}></Canban>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
