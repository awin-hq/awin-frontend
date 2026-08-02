import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { BackButton } from "@/components/auth/back-button/back-button";

export default function ForgotPasswordPage() {
  return (
    <>
      <BackButton href="/login" />
    
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email to reset your password."        
        />

      <ForgotPasswordForm />
    </>
  );
}