import { CreditSummaryView } from "@/features/credit-sales/components/credit-summary-view";
import { DASHBOARD } from "@/features/dashboard/data";

export default function CreditSalesPage() {
  return <CreditSummaryView ownerName={DASHBOARD.ownerName} />;
}
