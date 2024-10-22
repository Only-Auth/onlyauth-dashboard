import { useQuery } from '@tanstack/react-query'
import ApplicationTile from './components/ApplicationTile'
import { getApplicationList } from '@/services/AppServices'
import { Application } from '@/types/types'
import Loader from '@/components/Loader'

function ConsentScreen() {
  const { data: Applications, isFetching } = useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: getApplicationList,
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Consent Screen</h1>
      <p className="text-gray-600">
        The consent screen is the first thing that your users will see when they
        log in to your app.
      </p>
      <div className=" flex flex-col mt-10 gap-y-4">
        {isFetching && <Loader />}
        {!isFetching && Applications?.length === 0 && (
          <div className="w-full h-[400px] flex items-center justify-center">
            No apps found!
          </div>
        )}
        {!isFetching &&
          Applications?.map((app) => (
            <ApplicationTile key={app.id} id={app.id} title={app.name} />
          ))}
      </div>
    </div>
  )
}

export default ConsentScreen
