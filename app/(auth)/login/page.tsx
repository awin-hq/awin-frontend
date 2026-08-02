import { Logo } from "@/components/auth/logo/logo";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { AuthSwitch } from "@/components/auth/auth-switch";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <>
      <Logo />

      <AuthHeader
        title="Welcome back."
        description="Sign in to manage your customers, track repayments, and grow your business."
      />

      <AuthSwitch
        text="New to AWÍN?"
        action="Create an account"
        href="/register"
      />

      <LoginForm />
    </>
  );
}