import "@/app/globals.css";
import NavBar from "@/components/navBar";
import {
  getUserFromAuthToken,
  refreshAuthToken,
} from "@/lib/actions/userActions";
import { getProjects } from "@/lib/db";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manage-me",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if ((await getUserFromAuthToken()) === null) {
    await refreshAuthToken();
    redirect("/login");
  }

  const projects = await getProjects();
  return (
    <div className="min-h-screen">
      <NavBar projects={projects} />
      {children}
    </div>
  );
}
