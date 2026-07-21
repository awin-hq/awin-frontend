import { BackButton } from "@/components/auth/back-button";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { OtpForm } from "@/features/auth/components/otp-form";

export default function OtpPage() {
  return (
    <>
      <BackButton />

      <AuthHeader
        title="Verify your phone number"
        description="Enter the 6-digit verification code we sent to your phone."
      />

      <OtpForm />
    </>
  );
}