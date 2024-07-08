import Link from "next/link";
import { CircleUser, LayoutListIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserFromAuthToken } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";
import ActiveProject from "@/components/activeProject";
import { getProjects, Project } from "@/lib/db";
import Projects from "@/components/projects";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/navBar";

export default async function Home() {
  if ((await getUserFromAuthToken()) === null) {
    redirect("/login");
  }

  const projects = await getProjects();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar projects={projects} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Projects projects={projects}></Projects>
      </main>
    </div>
  );
}
