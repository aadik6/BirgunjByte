import { Skeleton } from "@/components/ui/skeleton";

const NewsCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-background/50 overflow-hidden shadow-md">
      {/* Image skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-48" />
        {/* Category badge skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-5 w-16 rounded" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Heading skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;