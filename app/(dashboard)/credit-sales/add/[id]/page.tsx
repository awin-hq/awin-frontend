import { notFound } from "next/navigation";
import RecordCreditForm from "@/features/credit-sales/components/RecordCreditForm";
import { getCustomer } from "@/features/customers/data";
import { formatNaira } from "@/lib/format";

type RecordCreditPageProps = {
    params: Promise<{ id: string }>;
};

export default async function RecordCreditPage({
    params,
}: RecordCreditPageProps) {
    const { id } = await params;
    const customer = getCustomer(id);

    if (!customer) {
        notFound();
    }

    return (
        <RecordCreditForm
            customerName={customer.name}
            customerPhone={customer.phone}
            outstandingBalance={formatNaira(customer.outstandingBalance, 2)}
        />
    );
}