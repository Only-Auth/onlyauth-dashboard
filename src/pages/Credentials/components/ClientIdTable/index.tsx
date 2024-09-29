import { DataTable } from './DataTable'
import { columns } from './Columns'

import { getApplicationList } from '@/services/AppServices'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { Application } from '@/types/types'

export default function ClientIdTable() {
  const { data, isFetching } = useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: getApplicationList,
  })

  return (
    <div className="container mx-auto py-4">
      {isFetching ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={data!.map((app: Application) => {
            return {
              id: app.id,
              name: app.name,
              clientId: app.clientId,
              createdAt: app.createdAt,
            }
          })}
        />
      )}
    </div>
  )
}
