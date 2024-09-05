import Range from "@/components/Range";
import TransactionListFallback from "@/components/TransactionListFallback";
import TransactionListWrapper from "@/components/TransactionListWrapper";
import Trend from "@/components/Trend";
import TrendFallback from "@/components/TrendFallback";
import { Button } from "@/components/ui/button";
import { types } from "@/lib/consts";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const range = searchParams?.range ?? "last30days";
  return (
    <>
      <div className="space-y-8">
        <section className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Summary</h1>
          <aside>
            <Range />
          </aside>
        </section>
        <section className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {types.map((type) => (
            <ErrorBoundary
              key={type}
              fallback={
                <div className="text-red-500">
                  Cannot fetch {type} trend data
                </div>
              }
            >
              <Suspense fallback={<TrendFallback />}>
                <Trend type={type} range={range} />
              </Suspense>
            </ErrorBoundary>
          ))}
        </section>
        <section className="flex items-center justify-between">
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
          <TransactionListWrapper range={range} />
        </Suspense>
      </div>
    </>
  );
}
