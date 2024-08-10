import TransactionList from "@/components/TransactionList";
import TransactionListFallback from "@/components/TransactionListFallback";
import Trend from "@/components/Trend";
import TrendFallback from "@/components/TrendFallback";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <>
      <section className="mb-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Income" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Expense" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Savings" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Investment" />
        </Suspense>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
