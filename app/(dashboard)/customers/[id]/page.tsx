import { CustomerProfile } from "@/features/customers/components/customer-profile";

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerProfilePage({
  params,
}: CustomerPageProps) {
  const { id } = await params;

  return <CustomerProfile customerId={id} />;
}