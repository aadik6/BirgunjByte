import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main featured news skeleton - left column */}
        <div className="bg-background/50 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <Skeleton className="w-full h-80" />
            <div className="absolute top-4 left-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <div className="p-6">
            <Skeleton className="h-8 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-6 w-24 mt-2" />
          </div>
        </div>

        {/* Secondary news skeletons - right column */}
        <div className="flex flex-col space-y-4">
          {/* First secondary news item skeleton */}
          <div className="bg-background/50 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Skeleton className="w-full h-40" />
              <div className="absolute top-3 left-3">
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-3" />
              <Skeleton className="h-5 w-20 mt-2" />
            </div>
          </div>

          {/* Second secondary news item skeleton */}
          <div className="bg-background/50 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <Skeleton className="w-full h-40" />
              <div className="absolute top-3 left-3">
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2 " />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-3" />
              <Skeleton className="h-5 w-20 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
