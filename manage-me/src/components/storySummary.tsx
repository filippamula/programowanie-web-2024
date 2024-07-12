import { Project, Story, User } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { DATE_ISO_FORMAT } from "@/lib/utils";

export default function StorySummary({
  story,
  project,
  owner,
}: {
  story: Story;
  project: Project;
  owner: User;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {story.name}
          </CardTitle>
          <CardDescription>{project.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="flex justify-between">
            <div className="font-semibold">Owner</div>
            <div className="text-muted-foreground">
              {owner.name} {owner.surname} ({owner.role})
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between">
            <div className="font-semibold">Priority</div>
            <div className="text-muted-foreground">{story.priority}</div>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between">
            <div className="font-semibold">State</div>
            <div className="text-muted-foreground">{story.state}</div>
          </div>
          <Separator className="mt-1 mb-4" />
          <div>
            <div className="font-semibold">Description</div>
            <div>{story.description}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Created {format(story.createDate, DATE_ISO_FORMAT)}
        </div>
      </CardFooter>
    </Card>
  );
}
