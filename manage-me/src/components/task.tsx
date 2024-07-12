"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { saveTask } from "@/lib/actions/taskActions";
import { Story, Task, User } from "@/lib/db";
import { editTaskSchema } from "@/lib/formSchema";
import { DATE_ISO_FORMAT } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import UserComboBox from "./userComboBox";

export default function TaskCard({
  task,
  story,
  users,
}: {
  task: Task;
  story: Story;
  users: User[];
}) {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      priority: task.priority,
      state: task.state,
      expectedManHours: task.expectedManHours,
      assignedUserId: task.assignedUserId,
    },
  });

  const onSubmit = async (values: z.infer<typeof editTaskSchema>) => {
    const result = await saveTask(values, story, task.id);
    if (result?.error) {
      form.setError("root", {
        type: "custom",
        message: result.error,
      });
      return;
    }
  };

  return (
    <Card className="overflow-hidden m-4">
      <CardHeader className="flex flex-row items-start bg-muted/50 justify-between">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <span>#{task.id}</span> {task.name}
          </CardTitle>
          <CardDescription>{story.name}</CardDescription>
        </div>
        <Button variant="outline" onClick={() => setEditMode(!editMode)}>
          <Pencil />
        </Button>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        {editMode
          ? TaskEdit({
              task,
              users,
              form,
              story,
              onSubmit,
              setEditMode,
            })
          : TaskInfo({ task, users })}
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Created {format(task.createTimestamp, DATE_ISO_FORMAT)}
        </div>
      </CardFooter>
    </Card>
  );
}

function TaskInfo({ task, users }: { task: Task; users: User[] }) {
  const assignedUser = users.find((it) => it.id === task.assignedUserId);
  return (
    <>
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
              ? "-"
              : `${assignedUser.name} ${assignedUser.surname} (${assignedUser.username})`}
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
                {format(task.startTimestamp, DATE_ISO_FORMAT)}
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
                {format(task.endTimestamp, DATE_ISO_FORMAT)}
              </div>
            </div>
            <Separator className="mt-1 mb-4" />
          </>
        )}
      </div>
      <div>
        <div className="font-semibold mb-1">Description</div>
        <div>{task.description}</div>
      </div>
    </>
  );
}

function TaskEdit({
  task,
  users,
  form,
  onSubmit,
  setEditMode,
}: {
  task: Task;
  users: User[];
  story: Story;
  form: any;
  onSubmit: any;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3 w-[30%]">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="flex justify-between">
                      <div className="font-semibold">Priority</div>
                      <div className="text-muted-foreground">
                        <Select {...field}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Priority</SelectLabel>
                              <SelectItem value="low">low</SelectItem>
                              <SelectItem value="medium">medium</SelectItem>
                              <SelectItem value="high">high</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator className="my-1" />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="flex justify-between">
                      <div className="font-semibold">State</div>
                      <div className="text-muted-foreground">
                        <Select {...field}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Priority</SelectLabel>
                              <SelectItem value="todo">Todo</SelectItem>
                              <SelectItem value="doing">Doing</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator className="mt-1 mb-4" />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedUserId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <>
                      <div className="flex justify-between">
                        <div className="font-semibold">Assigned user</div>
                        <div className="text-muted-foreground">
                          <UserComboBox
                            users={users}
                            selectedUserId={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </div>
                      <Separator className="mt-1 mb-4" />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="expectedManHours"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="flex justify-between">
                      <div className="font-semibold">Expected man hours</div>
                      <div className="text-muted-foreground">
                        <Input
                          type="number"
                          placeholder="Expected man hours"
                          {...field}
                        />
                      </div>
                    </div>
                    <Separator className="mt-1 mb-4" />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {task.startTimestamp !== null && (
            <>
              <div className="flex justify-between">
                <div className="font-semibold">Start date</div>
                <div className="text-muted-foreground">
                  {format(task.startTimestamp, DATE_ISO_FORMAT)}
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
                  {format(task.endTimestamp, DATE_ISO_FORMAT)}
                </div>
              </div>
              <Separator className="mt-1 mb-4" />
            </>
          )}
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full">
                  <div className="font-semibold mb-1">Description</div>
                  <Textarea
                    className="w-full"
                    placeholder="description"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="w-full text-center font-semibold text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <div className="flex gap-x-5 mt-5">
          <Button type="submit">Save changes</Button>
          <Button variant="outline" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
