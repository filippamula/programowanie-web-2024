import {
  getUserFromAuthToken,
  refreshAuthToken,
} from "@/lib/actions/userActions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage-me",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await getUserFromAuthToken()) !== null) {
    refreshAuthToken();
    redirect("/");
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
