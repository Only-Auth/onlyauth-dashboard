import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  getApplicationDetails,
  updateApplication,
} from '@/services/AppServices'
import { Application, UpdatedAppDetails } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfigureConsentSkeleton from './components/ConfigureConsentSkeleton'
import ConfigureConsentForm from './components/ConfigureConsentForm'
import { toast } from '@/hooks/use-toast'

function ConfigureConsent() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data, isFetching } = useQuery<Application>({
    queryKey: ['application', id],
    queryFn: ({ queryKey }) => getApplicationDetails(queryKey[1]),
  })

  if (!isFetching && !data) {
    navigate('/consent', { replace: true })
    toast({
      title: 'Something went wrong !',
      description: "The app ID doesn't exist",
      variant: 'destructive',
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      data,
      appName,
      file,
    }: {
      data: UpdatedAppDetails
      appName: string
      file: File | undefined
    }) => updateApplication({ data, appName, file }, id!),
    onSuccess: () => {
      console.log('Consent screen updated')
      queryClient.invalidateQueries({
        queryKey: ['application', id],
      })
      toast({
        description: 'Consent screen updated successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong !',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  function handleSave({
    data,
    appName,
    file,
  }: {
    data: UpdatedAppDetails
    appName: string
    file: File | undefined
  }) {
    mutate({ data, appName, file })
  }

  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'} className="cursor-pointer">
          <IoArrowBack size={20} />
        </Link>

        <p className="text-2xl font-semibold">Configure Consent Screen</p>
      </div>
      {isFetching ? (
        <ConfigureConsentSkeleton />
      ) : (
        <ConfigureConsentForm
          appData={data?.consentScreen}
          loading={isPending}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default ConfigureConsent
