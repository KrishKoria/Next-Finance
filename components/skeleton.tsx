type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return <Skeleton className={`w-full h-4 ${className}`} />;
}
