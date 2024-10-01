import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import { getApplicationDetails } from '@/services/AppServices'
import { Application } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import ConfigureConsentSkeleton from './components/ConfigureConsentSkeleton'
import ConfigureConsentForm from './components/ConfigureConsentForm'

function ConfigureConsent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isFetching } = useQuery<Application>({
    queryKey: ['application', id],
    queryFn: ({ queryKey }) => getApplicationDetails(queryKey[1]),
  })

  const [isFormDirty, setIsFormDirty] = useState(false)

  function handleBackAction() {
    if (!isFormDirty) {
      navigate(-1)
      return
    }
  }

  return (
    <>
      <div className="flex items-center gap-x-4">
        <div className="cursor-pointer">
          <IoArrowBack onClick={handleBackAction} size={20} />
        </div>

        <p className="text-2xl font-semibold">Configure Consent</p>
      </div>
      {isFetching ? (
        <ConfigureConsentSkeleton />
      ) : (
        <ConfigureConsentForm
          appData={data?.consentScreen!}
          formStateHandler={(value: boolean) => {
            setIsFormDirty(value)
          }}
        />
      )}
    </>
  )
}

export default ConfigureConsent
