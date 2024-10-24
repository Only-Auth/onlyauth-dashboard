import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { ConsentScreen, UpdatedAppDetails } from '@/types/types'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import ImageUploader from './ImageUploader'

type FormValues = {
  name: string
  title: string
  description: string
  logo: string | null
  email: string
  address: string
  message: string
}

function ConfigureConsentForm({
  appData,
  loading,
  onSave,
}: {
  appData: ConsentScreen | undefined
  loading: boolean
  onSave: ({
    data,
    appName,
    file,
  }: {
    data: UpdatedAppDetails
    appName: string
    file: File | undefined
  }) => void
}) {
  const {
    register,
    formState: { isDirty, errors, dirtyFields },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: appData!.name,
      title: appData!.title,
      description: appData!.description || '',
      email: appData!.developerEmail,
      address: appData!.appAddress,
      message: appData!.message || '',
      logo: appData!.logo || '',
    },
  })

  const [img, setImg] = useState<{
    src: string | null
    file: File | undefined
  }>({
    src: appData!.logo,
    file: undefined,
  })

  function isImageFieldDirty() {
    return img.src !== appData!.logo
  }

  function submitHandler(data: FormValues) {
    if (!isFormDirty()) {
      console.log('No changes made')
      return
    }
    const updatedData: UpdatedAppDetails = {
      consentScreen: {},
    }
    if (dirtyFields.title) {
      updatedData.consentScreen!.title = data.title
    }
    if (dirtyFields.description) {
      updatedData.consentScreen!.description = data.description
    }
    if (dirtyFields.logo) {
      updatedData.consentScreen!.logo = data.logo
    }
    if (dirtyFields.email) {
      updatedData.consentScreen!.developerEmail = data.email
    }
    if (dirtyFields.address) {
      updatedData.consentScreen!.appAddress = data.address
    }
    if (dirtyFields.message) {
      updatedData.consentScreen!.message = data.message
    }
    if (isImageFieldDirty()) {
      updatedData.consentScreen!.logo = img.src!
    }
    onSave({ data: updatedData, appName: data.name, file: img.file })
  }

  function isFormDirty() {
    return isDirty || isImageFieldDirty()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col mt-10 gap-y-4">
        <h1 className="text-xl">General Info :</h1>
        <div className="pl-2 mb-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="title">
              Title<span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Dummy"
              {...register('title', { required: 'Title cannot be empty' })}
            />
            <p>{errors.title?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="description">
              Description
            </Label>
            <Input
              type="text"
              id="description"
              placeholder="Dummy description"
              {...register('description')}
            />
            <p>{errors.description?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="appicon">Icon</Label>
            <ImageUploader
              src={img.src}
              selectLogo={setImg}
              loading={loading}
            />
          </div>
        </div>
        <h1 className="text-xl">Developer Info :</h1>
        <div className="pl-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="email">
              Email<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="example@email.com"
              {...register('email', {
                required: 'Email cannot be empty',
                pattern: {
                  value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="address">
              App Address<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="awesomedummy.com"
              {...register('address', {
                required: 'Address cannot be empty',
                pattern: {
                  value: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/,
                  message: 'Invalid app address.',
                },
              })}
            />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="message">
              Message
            </Label>
            <Input
              type="text"
              id="message"
              placeholder="Display message here"
              {...register('message')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center justify-end gap-1.5 my-4">
            <Button
              className="bg-blue-600 w-max"
              disabled={!isFormDirty() || loading}
            >
              {loading ? <Loader /> : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ConfigureConsentForm
