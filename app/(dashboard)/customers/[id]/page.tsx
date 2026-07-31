<<<<<<< HEAD
import { CustomerProfile } from "@/features/customers/components/customer-profile";
=======
import { notFound } from "next/navigation";

import { CustomerProfile } from "@/features/customers/components/customer-profile";
import { getCustomer } from "@/features/customers/data";
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf

type CustomerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerProfilePage({
  params,
}: CustomerPageProps) {
  const { id } = await params;

<<<<<<< HEAD
  return <CustomerProfile customerId={id} />;
=======
  const customer = getCustomer(id);

  if (!customer) {
    notFound();
  }

  return <CustomerProfile customer={customer} />;
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
}
