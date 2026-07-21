import { OtpBackButton } from "@/components/auth/otp-back-button";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { OtpForm } from "@/features/auth/components/otp-form";

export default function OtpPage() {
  return (
    <>
      <OtpBackButton />

      <AuthHeader
        title="Verify your phone number"
        description="Enter the 6-digit verification code we sent to your phone."
      />

      <OtpForm />
    </>
  );
}