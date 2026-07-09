// Skeleton loaders using Tailwind's build-in pulse animation
export function HostelCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-56 bg-gray-200"></div>

      {/* Details Placeholder */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-250 rounded-md w-3/4"></div>

        {/* Location */}
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        </div>

        {/* Rent */}
        <div className="h-7 bg-gray-250 rounded-md w-1/3 mt-2"></div>

        {/* Amenities Row */}
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-200 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-center gap-5 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-gray-200 shrink-0"></div>
      <div className="space-y-2 w-full">
        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        <div className="h-8 bg-gray-250 rounded-md w-1/3"></div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-gray-50">
      <td className="py-5 px-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0"></div>
          <div className="space-y-2 w-32">
            <div className="h-4 bg-gray-250 rounded-md w-full"></div>
            <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
          </div>
        </div>
      </td>
      <td className="py-5 px-6">
        <div className="h-4 bg-gray-200 rounded-md w-24"></div>
      </td>
      <td className="py-5 px-6">
        <div className="h-5 bg-gray-250 rounded-md w-16"></div>
      </td>
      <td className="py-5 px-6">
        <div className="h-4 bg-gray-200 rounded-md w-16"></div>
      </td>
      <td className="py-5 px-6">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </td>
      <td className="py-5 px-6">
        <div className="flex gap-2 justify-center">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Back button */}
      <div className="h-6 bg-gray-200 rounded-md w-32"></div>

      {/* Gallery */}
      <div className="grid grid-cols-4 gap-4 h-[450px]">
        <div className="col-span-2 row-span-2 bg-gray-250 rounded-3xl"></div>
        <div className="bg-gray-200 rounded-3xl"></div>
        <div className="bg-gray-200 rounded-3xl"></div>
        <div className="bg-gray-200 rounded-3xl"></div>
        <div className="bg-gray-200 rounded-3xl"></div>
      </div>

      {/* Title block */}
      <div className="space-y-4">
        <div className="h-10 bg-gray-250 rounded-md w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-8 bg-gray-250 rounded-md w-32"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-28"></div>
          <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>

      {/* Owner Info & Details Row split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-6 bg-gray-250 rounded-md w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded-2xl w-full"></div>
          <div className="h-6 bg-gray-250 rounded-md w-1/4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <div className="h-[280px] bg-gray-250 rounded-3xl"></div>
      </div>
    </div>
  );
}
