import { getUserFromAuthToken } from "@/lib/actions/userActions";
import LoginPage from "./login/page";
import { redirect } from "next/navigation";

export default async function Home() {
  if ((await getUserFromAuthToken()) === null) {
    redirect("/login");
  }
  return <div>hello</div>;
}
