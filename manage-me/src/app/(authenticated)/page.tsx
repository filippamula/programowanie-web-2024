import Stories from "@/components/stories";
import { findActiveProject } from "@/lib/actions/projectActions";
import { findStories } from "@/lib/actions/storiesActions";

export default async function ProjectsPage() {
  const activeProject = await findActiveProject();

  if (!activeProject) {
    return (
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="ml-auto mr-auto text-lg">
          Select project to view stories
        </div>
      </main>
    );
  }

  const stories = await findStories();

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <Stories stories={stories} activeProject={activeProject}></Stories>
    </main>
  );
}
