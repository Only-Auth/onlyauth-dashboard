import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@radix-ui/react-label'

function ViewCredentialsFormSkeleton() {
  return (
    <div>
      <form>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label className="font-semibold" htmlFor="appname">
            App name
          </Label>
          <Skeleton className="h-4" />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 pb-4">
          <Label className="font-semibold">Authorized JavaScript origins</Label>
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label className="font-semibold" htmlFor="appname">
            Authorized Redirect Url
          </Label>
          <Skeleton className="h-4" />
        </div>
      </form>
    </div>
  )
}

export default ViewCredentialsFormSkeleton
