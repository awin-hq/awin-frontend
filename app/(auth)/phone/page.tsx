import { AuthHeader } from "@/components/auth/auth-header/auth-header";
import { PhoneForm } from "@/features/auth/components/phone-form";
import { BackButton } from "@/components/auth/back-button/back-button";

export default function PhonePage() {
  return (
    <>
      <BackButton />

      <AuthHeader
        title="Enter your phone number"
        description="We'll send a verification code to confirm your number and secure your AWÍN account."
      />

      <PhoneForm />
    </>
  );
}