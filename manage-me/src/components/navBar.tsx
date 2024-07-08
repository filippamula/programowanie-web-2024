"use client";

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
import ActiveProject from "@/components/activeProject";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/lib/db";
import { useState } from "react";

export default function NavBar({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    projects.find((project) => project.active)
  );
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <LayoutListIcon className="h-6 w-6" />
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Projects
        </Link>
        <Separator orientation="vertical" className="h-10" />
        <Link
          href="#stories"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Stories
        </Link>
        <Link
          href="#tasks"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Tasks
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="relative ml-auto">
          <ActiveProject
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          ></ActiveProject>
        </div>
        <Separator orientation="vertical" className="h-10" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
