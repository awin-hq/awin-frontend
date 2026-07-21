import { Logo } from "@/components/auth/logo/logo";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { AuthSwitch } from "@/components/auth/auth-switch";
import { RegisterForm } from "@/features/auth/components/register-form/register-form";

export default function RegisterPage() {
  return (
    <>
      <Logo />

      <AuthHeader
        title="Let's get to know you."
        description="Your personal data is secure in compliance with strict data
protections regulations."
      />

      <AuthSwitch
          text="Already have an account?"
          action="Login"
          href="/login"
      />

      <RegisterForm />
    </>
  );
}