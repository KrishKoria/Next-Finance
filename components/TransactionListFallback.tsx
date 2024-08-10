import SkeletonLoading from "@/components/skeleton";
import Skeleton from "@/components/skeleton";

export default function TransactionListFallback() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>

      <div className="space-y-4">
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
    </div>
  );
}

function TransactionItemSkeleton() {
  return (
    <div className="flex w-full items-center space-x-4">
      <div className="flex grow items-center">
        <SkeletonLoading />
      </div>
      <div className="hidden min-w-[150px] items-center md:flex">
        <SkeletonLoading />
      </div>
      <div className="min-w-[70px] text-right">
        <SkeletonLoading />
      </div>
      <div className="flex min-w-[50px] justify-end">
        <SkeletonLoading />
      </div>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
  return (
    <div className="flex space-x-4">
      <div className="grow">
        <SkeletonLoading />
      </div>

      <div className="min-w-[70px]">
        <SkeletonLoading />
      </div>
      <div className="min-w-[50px]"></div>
    </div>
  );
}
