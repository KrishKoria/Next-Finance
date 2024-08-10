import TransactionListFallback from "@/components/TransactionFallback";
import TransactionList from "@/components/TransactionList";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionList />
      </Suspense>
    </>
  );
}
