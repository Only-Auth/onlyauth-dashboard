import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import AppDetailsForm from './components/AppDetailsForm'
import ConsentDetails from './components/ConsentDetailsForm'
import { NewAppInfo } from '@/types/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApplication } from '@/services/AppServices'
import { useToast } from '@/hooks/use-toast'

function FormAccordionItem({
  title,
  children,
  isOpen,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
}) {
  return (
    <>
      <div className="w-[400px]">
        <div className="text-2xl flex items-center justify-between">
          <span>{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isOpen && <div className="pl-4 pt-4 ">{children}</div>}
      </div>
    </>
  )
}

function CreateCredentials() {
  const [openFormIndex, setOpenFormIndex] = useState(0)
  const [appInfo, setAppInfo] = useState<NewAppInfo>({
    name: '',
    redirectUri: [],
    origins: [],
    title: '',
    logo: null,
    developerEmail: '',
    appAddress: '',
    message: null,
  })

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { toast } = useToast()

  const createAppMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications'],
      })
      navigate('/credentials', { replace: true })
      toast({
        description: 'Application created successfully',
      })
    },
    onError: (error) => {
      console.log(error)
      toast({
        description: "Something went wrong. Couldn't create application",
      })
    },
  })

  function onAppDetailsSave(data: any) {
    setAppInfo({
      ...appInfo,
      name: data.name,
      redirectUri: data.redirectUri.split(','),
      origins: data.origins.map(
        (origin: {
          origin: {
            origin: string
          }
        }) => origin.origin
      ),
    })
    setOpenFormIndex(1)
  }

  function onSubmitConsentDetails(data: any) {
    const appData = {
      ...appInfo,
      title: data.title,
      logo: '',
      developerEmail: data.email,
      appAddress: data.address,
      message: data.message,
    }
    setAppInfo(appData)
    createAppMutation.mutate(appData)
  }

  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'}>
          <IoArrowBack size={20} />
        </Link>
        <p className="text-2xl font-semibold">Create Client</p>
      </div>
      <div className="sm:p-10 p-4 flex flex-col gap-5">
        <FormAccordionItem title="App Details" isOpen={openFormIndex === 0}>
          <AppDetailsForm
            defaultAppDetails={appInfo}
            onSave={onAppDetailsSave}
          />
        </FormAccordionItem>
        <FormAccordionItem
          title="Consent Screen Details"
          isOpen={openFormIndex === 1}
        >
          <ConsentDetails
            loading={createAppMutation.isPending}
            onSubmit={onSubmitConsentDetails}
            handleBack={() => {
              setOpenFormIndex(0)
            }}
          />
        </FormAccordionItem>
      </div>
    </>
  )
}

export default CreateCredentials
