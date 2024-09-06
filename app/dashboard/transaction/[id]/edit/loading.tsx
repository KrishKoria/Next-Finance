import SkeletonLoading from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Edit Transaction</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12" />
        <SkeletonLoading className="h-12 md:col-span-2" />
      </div>
    </>
  );
}
