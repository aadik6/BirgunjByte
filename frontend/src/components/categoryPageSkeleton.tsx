import { Skeleton } from "@/components/ui/skeleton";

const CategoryPageSkeleton = () => (
  <div className="container mx-auto px-4 py-6">
    {/* Category Title */}
    <div className="mb-5 text-center">
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-1 w-24 mx-auto" />
    </div>

    {/* Main Content Layout */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Featured News - 3/4 width */}
      <div className="w-full md:w-2/3">
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="bg-background/50 rounded shadow-md overflow-hidden">
          <Skeleton className="w-full md:h-72 h-48" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-4" />
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent News - 1/4 width */}
      <div className="w-full md:w-1/3">
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex border-b pb-2 overflow-hidden items-center">
              <Skeleton className="w-1/3 h-16" />
              <div className="w-2/3 p-3">
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Remaining News */}
    <div className="mt-8">
      <Skeleton className="h-7 w-40 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-background/50 rounded shadow-md overflow-hidden">
            <Skeleton className="w-full h-40" />
            <div className="p-4">
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-3" />
              <div className="flex justify-between items-center text-xs">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CategoryPageSkeleton;