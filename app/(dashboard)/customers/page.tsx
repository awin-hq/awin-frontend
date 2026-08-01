<<<<<<< HEAD
import { PaymentsView } from "@/features/customers/components/debtors-view";

export default function PaymentsPage() {
  return <PaymentsView />;
=======
import { DebtorsView } from "@/features/customers/components/debtors-view";
import { CUSTOMERS } from "@/features/customers/data";

export default function CustomersPage() {
  return <DebtorsView customers={CUSTOMERS} />;
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
}
