import { AuthSphere } from "@/modules/auth/components/auth-sphere";
import LoginForm from "@/modules/auth/components/login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">

			<AuthSphere />

      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
