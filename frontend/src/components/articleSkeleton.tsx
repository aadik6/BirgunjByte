import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Back button skeleton */}
      <div className="mb-3">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Category and Date skeleton */}
      <div className="flex flex-wrap items-center text-sm mb-4 space-x-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Article Title skeleton */}
      <Skeleton className="h-8 w-full md:w-3/4 mb-3" />

      {/* Author info skeleton */}
      <div className="flex items-center mb-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="ml-3 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Featured Image skeleton */}
      <div className="mb-8">
        <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
      </div>

      {/* Article content skeleton */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>

      {/* Engagement buttons skeleton */}
      <div className="flex items-center justify-between border-t border-b py-4 my-8">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;