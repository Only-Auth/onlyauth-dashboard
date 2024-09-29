import { Link, useParams } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'

import CopyCTA from '@/components/CopyCTA'
import ViewCredentialsForm from './components/ViewCredentialsForm'
import { useQuery } from '@tanstack/react-query'
import { getApplicationDetails } from '@/services/AppServices'
import AdditionalInfoSkeleton from './components/AdditionalInfoSkeleton'
import ViewCredentialsFormSkeleton from './components/ViewCredentialsFormSkeleton'

function ViewCredentials() {
  const { id } = useParams()
  const { data, isFetching } = useQuery({
    queryKey: ['application', id],
    queryFn: ({ queryKey }) => getApplicationDetails(queryKey[1]),
  })

  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'}>
          <IoArrowBack size={20} />
        </Link>
        <p className="text-2xl font-semibold">Client details</p>
      </div>
      <div className="sm:p-10 p-4 flex sm:flex-row flex-col sm:gap-20">
        {isFetching ? (
          <ViewCredentialsFormSkeleton />
        ) : (
          <ViewCredentialsForm appData={data} />
        )}
        {isFetching ? (
          <AdditionalInfoSkeleton />
        ) : (
          <div className="my-4 bg-gray-100 rounded-xl p-6 w-full max-w-[500px] h-max">
            <h1 className="text-lg font-semibold">Additional Info :</h1>
            <div className="mt-4">
              <p className="font-medium text-sm text-gray-500">Client ID</p>
              <div className="flex gap-2">
                <p className="text-ellipsis overflow-hidden">{data.clientId}</p>
                <CopyCTA text={data.clientId} />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium text-sm text-gray-500">Client Secret</p>
              <div className="flex">
                <div className="w-[90%]">
                  <p className="text-ellipsis overflow-hidden">{data.secret}</p>
                </div>
                <CopyCTA text={data.secret} />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium text-sm text-gray-500">Created At</p>
              <p className="text-ellipsis overflow-hidden">
                {new Date(data.createdAt * 1000).toString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ViewCredentials
