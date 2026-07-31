import { OtpBackButton } from "@/components/auth/otp-back-button";
import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { OtpForm } from "@/features/auth/components/otp-form";


export default function OtpPage() {
  return (
    <>
      <OtpBackButton />

      <AuthHeader
        title="Check your Email"
        description="Enter the 6-digit code sent to your email to complete your account setup."
      />

      <OtpForm />
    </>
  );
}