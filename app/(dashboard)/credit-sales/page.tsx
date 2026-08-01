import { CreditSummaryView } from "@/features/credit-sales/components/credit-summary-view";
<<<<<<< HEAD

export default function CreditSalesPage() {
  return <CreditSummaryView />;
=======
import { DASHBOARD } from "@/features/dashboard/data";

export default function CreditSalesPage() {
  return <CreditSummaryView ownerName={DASHBOARD.ownerName} />;
>>>>>>> 954f21ef9b50623d835362d96b782ab17b8150bf
}
