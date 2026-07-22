import { DebtorsView } from "@/features/customers/components/debtors-view";
import { CUSTOMERS } from "@/features/customers/data";

export default function CustomersPage() {
  return <DebtorsView customers={CUSTOMERS} />;
}
