import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { OtpForm } from "@/features/auth/components/otp-form";
import { BackButton } from "@/components/auth/back-button/back-button";


export default function OtpPage() {
  return (
    <>
      <BackButton href="/phone" />

      <AuthHeader
        title="Check your email"
        description="Enter the 6-digit verification code we sent to your Email."
      />

      <OtpForm />
    </>
  );
}