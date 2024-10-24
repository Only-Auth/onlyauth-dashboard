import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@radix-ui/react-label'

function ConfigureConsentSkeleton() {
  return (
    <div className="flex flex-col mt-10 gap-y-4">
      <h1 className="text-xl">App Info :</h1>
      <div className="pl-2 mb-2">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="appname">Title</Label>
          <Skeleton className="h-4" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="appicon">Icon</Label>
          <Skeleton className="h-4" />
        </div>
      </div>
      <h1 className="text-xl">Developer Info :</h1>
      <div className="pl-2">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="email">Email</Label>
          <Skeleton className="h-4" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="address">App Address</Label>
          <Skeleton className="h-4" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="message">Message</Label>
          <Skeleton className="h-4" />
        </div>
      </div>
    </div>
  )
}

export default ConfigureConsentSkeleton
