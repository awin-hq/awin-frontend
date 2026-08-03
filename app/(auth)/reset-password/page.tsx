import { ResetPasswordForm } from "@/features/auth/components/reset-password-form/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  const token = Array.isArray(params.token)
    ? params.token[0] ?? null
    : params.token ?? null;

  return <ResetPasswordForm token={token} />;
}