import { notFound } from "next/navigation";

import { CustomerProfile } from "@/features/customers/components/customer-profile";
import { getCustomer } from "@/features/customers/data";

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerProfilePage({
  params,
}: CustomerPageProps) {
  const { id } = await params;

  const customer = getCustomer(id);

  if (!customer) {
    notFound();
  }

  return <CustomerProfile customer={customer} />;
}
