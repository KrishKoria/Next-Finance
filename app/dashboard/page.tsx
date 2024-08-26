import TransactionList from "@/components/TransactionList";
import TransactionListFallback from "@/components/TransactionListFallback";
import Trend from "@/components/Trend";
import TrendFallback from "@/components/TrendFallback";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-4xl font-semibold">Summary</h1>
      </section>
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
      <section className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl">Transactions</h2>
        <Button asChild size={"sm"} variant={"outline"}>
          <Link
            href="/dashboard/transaction/add"
            className={"flex items-center space-x-1"}
          >
            <PlusCircle className="h-4 w-4" />
            <div>Add</div>
          </Link>
        </Button>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
