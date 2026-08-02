import { BackButton } from "@/components/auth/back-button";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <>
      <BackButton href="/forgot-password" />

      <AuthHeader
        title="Kindly check your email"
        description="Enter the 6-digit verification code sent to se*****@gmail.com"
      />

      <ResetPasswordForm />
    </>
  );
}