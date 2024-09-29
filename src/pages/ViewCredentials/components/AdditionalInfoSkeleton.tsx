import { Skeleton } from '@/components/ui/skeleton'

function AdditionalInfoSkeleton() {
  return (
    <div className="my-4 bg-gray-100 rounded-xl p-6 w-full max-w-[500px] h-max">
      <h1 className="text-lg font-semibold">Additional Info :</h1>
      <div className="mt-4">
        <p className="font-medium text-sm text-gray-500">Client ID</p>
        <Skeleton className="h-4" />
      </div>
      <div className="mt-4">
        <p className="font-medium text-sm text-gray-500">Client Secret</p>
        <Skeleton className="h-4" />
      </div>
      <div className="mt-4">
        <p className="font-medium text-sm text-gray-500">Created At</p>
        <Skeleton className="h-4" />
      </div>
    </div>
  )
}

export default AdditionalInfoSkeleton
