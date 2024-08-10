import { Skeleton } from "./ui/skeleton";

type SkeletonProps = {
  className?: string;
};

export default function SkeletonLoading({ className }: SkeletonProps) {
  return <Skeleton className={`h-4 w-full ${className}`} />;
}
