import StoryBody from "@/components/storyBody";
import StorySummary from "@/components/storySummary";
import { findProjectById } from "@/lib/actions/projectActions";
import { findStoryById } from "@/lib/actions/storiesActions";
import { findTasksByStoryId } from "@/lib/actions/taskActions";
import { findUserById, findUsers } from "@/lib/actions/userActions";

export default async function StoryPage({
  params,
}: {
  params: { id: string };
}) {
  const story = await findStoryById(params.id);
  if (!story) {
    return <div className="ml-auto mr-auto">Story not found.</div>;
  }
  const project = await findProjectById(story.projectId);
  if (!project) {
    return (
      <div className="ml-auto mr-auto">Corresponding project not found.</div>
    );
  }
  const owner = await findUserById(story.userId);
  if (!owner) {
    return <div className="ml-auto mr-auto">Project owner not found.</div>;
  }

  const users = await findUsers();
  const tasks = await findTasksByStoryId(story.id);

  return (
    //todo: make card and sumary fit screen
    <div className="mt-5 flex">
      <StoryBody tasks={tasks} story={story} users={users}></StoryBody>
      <div className="w-[50%] ml-auto mr-5 mb-5">
        <StorySummary
          story={story}
          project={project}
          owner={owner}
        ></StorySummary>
      </div>
    </div>
  );
}
