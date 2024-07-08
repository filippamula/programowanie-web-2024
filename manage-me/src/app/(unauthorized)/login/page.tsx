import "@/app/globals.css";
import AuthForm from "@/components/form/authForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <Card className="m-auto align-middle max-w-sm min-w-80">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm></AuthForm>
        </CardContent>
      </Card>
    </div>
  );
}
