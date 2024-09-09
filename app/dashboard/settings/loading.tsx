import SkeletonLoading from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12" />
      <SkeletonLoading className="h-12 md:col-span-2" />
    </div>
  );
}
