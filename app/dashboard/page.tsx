import TransactionList from "@/components/TransactionList";
import TransactionListFallback from "@/components/TransactionListFallback";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
